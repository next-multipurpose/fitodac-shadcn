import "server-only"

import { readFile } from "node:fs/promises"
import path from "node:path"

import type { DemoIntegrationBundle } from "@/demos/integration/types"
import type { DemoEntry } from "@/demos/types"
import { blockSourcePaths } from "@/lib/blocks-catalog"

const repositoryRoot = process.cwd()

const PACKAGE_DEPENDENCIES: Record<string, string> = {
	react: "react@^19.0.0",
	"react-dom": "react@^19.0.0",
	"lucide-react": "lucide-react@^0.577.0",
	"@tabler/icons-react": "@tabler/icons-react@^3.27.0",
	"next/image": "next@^15.0.0",
	"next/link": "next@^15.0.0",
	motion: "framer-motion@^12.0.0",
	clsx: "clsx@^2.1.1",
	"tailwind-merge": "tailwind-merge@^3.5.0",
}

const REGISTRY_DEPENDENCY_ORDER: Record<string, number> = {
	utils: 0,
	button: 1,
	"input-group": 2,
	input: 3,
	label: 4,
	badge: 5,
	card: 6,
	checkbox: 7,
	"radio-group": 8,
	select: 9,
	switch: 10,
	textarea: 11,
	"input-otp": 12,
	"input-numeric": 13,
	"input-phone": 14,
	"input-time": 15,
	"mini-calendar": 16,
	calendar: 17,
	"date-picker": 18,
	command: 19,
	"command-menu": 20,
	"dropdown-menu": 21,
	"navigation-menu": 22,
	breadcrumb: 23,
	pagination: 24,
	"button-group": 25,
	toggle: 26,
	"toggle-group": 27,
	"native-select": 28,
	autocomplete: 29,
	tooltip: 30,
	"hover-card": 31,
	popover: 32,
	sheet: 33,
	dialog: 34,
	"alert-dialog": 35,
	drawer: 36,
	accordion: 37,
	collapsible: 38,
	separator: 39,
	avatar: 40,
	"scroll-area": 41,
	progress: 42,
	"data-table": 43,
	table: 44,
	skeleton: 45,
	spinner: 46,
	sonner: 47,
	alert: 48,
	empty: 49,
	item: 50,
	kbd: 51,
	chart: 52,
	sidebar: 53,
	form: 54,
	field: 55,
	ripple: 56,
}

function extractPackageImports(source: string): Set<string> {
	const packages = new Set<string>()
	const importPattern = /from\s+"([^"]+)"/g
	let match

	while ((match = importPattern.exec(source)) !== null) {
		const from = match[1]

		if (from.startsWith("@/") || from.startsWith("./")) {
			continue
		}

		const pkgMatch = from.match(/^(@[^/]+\/[^/]+|[^/]+)/)
		if (pkgMatch) {
			const pkg = pkgMatch[1]
			if (PACKAGE_DEPENDENCIES[pkg]) {
				packages.add(pkg)
			}
		}
	}

	return packages
}

function extractRegistryDependencies(source: string): Set<string> {
	const deps = new Set<string>()
	const importPattern =
		/from\s+"@\/registry\/(primitives|components)\/([^"]+)"/g
	let match

	while ((match = importPattern.exec(source)) !== null) {
		const name = match[2]

		if (name.startsWith("tabs/")) {
			deps.add("tabs")
		} else if (name === "tabs.tsx") {
			deps.add("tabs")
		} else if (name.endsWith(".tsx")) {
			deps.add(name.replace(/\.tsx$/, ""))
		} else {
			deps.add(name)
		}
	}

	return deps
}

function toConsumerUsage(source: string): string {
	return source
		.replaceAll("@/registry/primitives/", "@/components/ui/")
		.replaceAll("@/registry/components/", "@/components/ui/")
		.replaceAll("@/demos/", "@/components/")
}

export async function getBlockBundle(
	blockSlug: string,
	demo: DemoEntry
): Promise<DemoIntegrationBundle> {
	const blockSourcePath = blockSourcePaths[blockSlug]

	if (!blockSourcePath) {
		throw new Error(`Block source path not found: ${blockSlug}`)
	}

	const absoluteBlockPath = path.join(repositoryRoot, blockSourcePath)
	const absoluteDemoPath = path.join(repositoryRoot, demo.sourcePath)

	const [blockSource, demoSource] = await Promise.all([
		readFile(absoluteBlockPath, "utf8"),
		readFile(absoluteDemoPath, "utf8"),
	])

	const packages = extractPackageImports(blockSource)
	const dependencies = [...packages].map((pkg) => PACKAGE_DEPENDENCIES[pkg])
	const registryDependencies = [
		...extractRegistryDependencies(blockSource),
	].sort(
		(a, b) =>
			(REGISTRY_DEPENDENCY_ORDER[a] ?? 999) -
			(REGISTRY_DEPENDENCY_ORDER[b] ?? 999)
	)

	return {
		component: blockSlug,
		demo: demo.name,
		usageCode: toConsumerUsage(demoSource),
		files: [
			{
				sourcePath: blockSourcePath,
				suggestedTargetPath: blockSourcePath.replace(/^src\//, ""),
				code: toConsumerUsage(blockSource),
			},
		],
		dependencies,
		registryDependencies,
	}
}
