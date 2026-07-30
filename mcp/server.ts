#!/usr/bin/env node
import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

type ExportTarget = string | { import?: string; types?: string }

type PackageJson = {
  name: string
  version: string
  description?: string
  exports?: Record<string, ExportTarget>
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

type ComponentEntry = {
  name: string
  importPath: string
  exportKey: string
  sourcePath: string | null
  distPath: string | null
  typesPath: string | null
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(__dirname, "../..")
const packageJsonPath = path.join(packageRoot, "package.json")

async function readPackageJson(): Promise<PackageJson> {
  return JSON.parse(await readFile(packageJsonPath, "utf8")) as PackageJson
}

function sourcePathForExport(name: string): string {
  return name === "lib/utils"
    ? path.join(packageRoot, "src/lib/utils.ts")
    : path.join(packageRoot, `src/${name}.tsx`)
}

function publicExportEntries(packageJson: PackageJson): ComponentEntry[] {
  return Object.entries(packageJson.exports ?? {})
    .filter(([exportKey]) => exportKey !== "./styles.css")
    .map(([exportKey, target]) => {
      const importTarget = typeof target === "string" ? target : target.import
      const typesTarget = typeof target === "string" ? undefined : target.types
      const name = exportKey.replace(/^\.\//, "")

      return {
        name,
        importPath: `${packageJson.name}/${name}`,
        exportKey,
        sourcePath: sourcePathForExport(name),
        distPath: importTarget ? path.join(packageRoot, importTarget) : null,
        typesPath: typesTarget ? path.join(packageRoot, typesTarget) : null,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

async function readOptional(filePath: string | null): Promise<string | null> {
  if (!filePath) {
    return null
  }

  try {
    return await readFile(filePath, "utf8")
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null
    }

    throw error
  }
}

async function getComponents(): Promise<ComponentEntry[]> {
  return publicExportEntries(await readPackageJson())
}

async function findComponent(name: string): Promise<ComponentEntry | null> {
  const normalizedName = name
    .replace(/^@fitodac\/shadcn\//, "")
    .replace(/^\.\//, "")
  const components = await getComponents()

  return (
    components.find((component) => component.name === normalizedName) ?? null
  )
}

function jsonText(value: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(value, null, 2),
      },
    ],
  }
}

async function componentPayload(
  component: ComponentEntry,
  includeSource: boolean
) {
  const [source, dist, types] = await Promise.all([
    includeSource ? readOptional(component.sourcePath) : null,
    readOptional(component.distPath),
    readOptional(component.typesPath),
  ])

  return {
    ...component,
    sourcePath: source ? component.sourcePath : null,
    distPath: dist ? component.distPath : null,
    typesPath: types ? component.typesPath : null,
    source,
    dist,
    types,
  }
}

const server = new McpServer({
  name: "fitodac-shadcn",
  version: "0.1.0",
})

server.registerResource(
  "manifest",
  "fitodac-shadcn://manifest",
  {
    title: "@fitodac/shadcn manifest",
    description: "Package metadata and public export map for @fitodac/shadcn.",
    mimeType: "application/json",
  },
  async (uri) => {
    const packageJson = await readPackageJson()
    const payload = {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      peerDependencies: packageJson.peerDependencies ?? {},
      dependencies: packageJson.dependencies ?? {},
      components: publicExportEntries(packageJson),
      stylesImport: `${packageJson.name}/styles.css`,
    }

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(payload, null, 2),
        },
      ],
    }
  }
)

server.registerResource(
  "component",
  new ResourceTemplate("fitodac-shadcn://component/{name}", {
    list: async () => ({
      resources: (await getComponents()).map((component) => ({
        name: component.name,
        title: component.importPath,
        uri: `fitodac-shadcn://component/${component.name}`,
        mimeType: "application/json",
      })),
    }),
  }),
  {
    title: "@fitodac/shadcn component",
    description:
      "Source, build output, types, and import path for one public component export.",
    mimeType: "application/json",
  },
  async (uri, variables) => {
    const name = String(variables.name)
    const component = await findComponent(name)

    if (!component) {
      throw new Error(`Unknown @fitodac/shadcn component export: ${name}`)
    }

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(
            await componentPayload(component, true),
            null,
            2
          ),
        },
      ],
    }
  }
)

server.registerResource(
  "styles",
  "fitodac-shadcn://styles.css",
  {
    title: "@fitodac/shadcn styles",
    description: "Compiled stylesheet exported as @fitodac/shadcn/styles.css.",
    mimeType: "text/css",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "text/css",
        text:
          (await readOptional(path.join(packageRoot, "dist/styles.css"))) ?? "",
      },
    ],
  })
)

server.registerTool(
  "list_components",
  {
    title: "List @fitodac/shadcn components",
    description: "Lists all public subpath exports from package.json#exports.",
    outputSchema: z.object({
      components: z.array(
        z.object({
          name: z.string(),
          importPath: z.string(),
          exportKey: z.string(),
          sourcePath: z.string().nullable(),
          distPath: z.string().nullable(),
          typesPath: z.string().nullable(),
        })
      ),
      stylesImport: z.string(),
    }),
  },
  async () => {
    const packageJson = await readPackageJson()
    const payload = {
      components: publicExportEntries(packageJson),
      stylesImport: `${packageJson.name}/styles.css`,
    }

    return {
      structuredContent: payload,
      ...jsonText(payload),
    }
  }
)

server.registerTool(
  "get_component",
  {
    title: "Get an @fitodac/shadcn component",
    description:
      "Returns import path, TypeScript definitions, compiled output, and local source when available for a public component export.",
    inputSchema: {
      name: z
        .string()
        .describe(
          "Public export name, for example button, dialog, lib/utils, or @fitodac/shadcn/button."
        ),
      includeSource: z
        .boolean()
        .default(true)
        .describe("Include local src/** content when available."),
    },
  },
  async ({ name, includeSource }) => {
    const component = await findComponent(name)

    if (!component) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Unknown @fitodac/shadcn component export: ${name}`,
          },
        ],
      }
    }

    return jsonText(await componentPayload(component, includeSource))
  }
)

server.registerPrompt(
  "use_component",
  {
    title: "Use an @fitodac/shadcn component",
    description:
      "Guide a model to import and use one component from this package in another project.",
    argsSchema: {
      name: z
        .string()
        .describe("Component export name, for example button or dialog."),
    },
  },
  async ({ name }) => {
    const component = await findComponent(name)
    const importPath = component?.importPath ?? `@fitodac/shadcn/${name}`

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: [
              `Use ${importPath} from @fitodac/shadcn.`,
              "Read the component resource first, then import from the package subpath instead of copying source into the consuming project unless I explicitly ask for a local copy.",
              'Also ensure the consuming app imports "@fitodac/shadcn/styles.css" once at the app/root stylesheet level.',
            ].join("\n"),
          },
        },
      ],
    }
  }
)

await server.connect(new StdioServerTransport())
