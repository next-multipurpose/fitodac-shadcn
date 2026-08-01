import "server-only"

import { readFile } from "node:fs/promises"
import path from "node:path"

import type { DemoEntry } from "@/demos/types"
import registryJson from "../../../registry.json"

import type { DemoIntegrationBundle, IntegrationFile } from "./types"

type RegistryFile = {
	path: string
	type: string
	target?: string
}

type RegistryItem = {
	name: string
	slug: string
	type: string
	files?: RegistryFile[]
	dependencies?: string[]
	registryDependencies?: string[]
}

const registry = registryJson as { items: RegistryItem[] }
const repositoryRoot = process.cwd()
const trustedSourceRoot = path.join(repositoryRoot, "src")

function resolveTrustedSource(sourcePath: string) {
	const absolutePath = path.resolve(repositoryRoot, sourcePath)

	if (
		absolutePath !== trustedSourceRoot &&
		!absolutePath.startsWith(`${trustedSourceRoot}${path.sep}`)
	) {
		throw new Error(`Untrusted registry source path: ${sourcePath}`)
	}

	return absolutePath
}

async function readCanonicalRegistryFile(
	item: RegistryItem,
	file: RegistryFile
) {
	const filename = path.basename(file.path)
	const candidates = [
		file.path,
		`src/registry/primitives/${filename}`,
		`src/registry/components/${filename}`,
	]

	for (const sourcePath of [...new Set(candidates)]) {
		try {
			return {
				sourcePath,
				code: await readFile(resolveTrustedSource(sourcePath), "utf8"),
			}
		} catch (error) {
			const code =
				typeof error === "object" && error !== null && "code" in error
					? String(error.code)
					: null

			if (code !== "ENOENT") throw error
		}
	}

	throw new Error(
		`Registry source file not found for ${item.name}: ${file.path}`
	)
}

function suggestedTargetPath(file: RegistryFile) {
	if (file.target) {
		return file.target.replace(/^src\//, "")
	}

	const filename = path.basename(file.path)

	if (file.type === "registry:lib") {
		return `lib/${filename}`
	}

	if (file.type === "registry:hook") {
		return `hooks/${filename}`
	}

	return `components/ui/${filename}`
}

function toConsumerUsage(source: string) {
	return source
		.replaceAll("@/registry/primitives/", "@/components/ui/")
		.replaceAll("@/registry/components/", "@/components/ui/")
		.replaceAll("@/demos/", "@/components/")
}

export async function getIntegrationBundle(
	demo: DemoEntry
): Promise<DemoIntegrationBundle> {
	const rootItem = registry.items.find(
		(item) => item.slug === demo.componentSlug
	)

	if (!rootItem) {
		throw new Error(`Registry item not found: ${demo.componentSlug}`)
	}

	const resolvedNames: string[] = []
	const resolvedFiles: IntegrationFile[] = []
	const dependencies: string[] = []
	const seenItems = new Set<string>()
	const seenFiles = new Set<string>()
	const seenDependencies = new Set<string>()

	function addDependency(dependency: string) {
		if (!seenDependencies.has(dependency)) {
			seenDependencies.add(dependency)
			dependencies.push(dependency)
		}
	}

	async function visit(item: RegistryItem) {
		if (seenItems.has(item.slug)) return

		seenItems.add(item.slug)
		resolvedNames.push(item.slug)

		for (const dependency of item.dependencies ?? []) {
			addDependency(dependency)
		}

		for (const file of item.files ?? []) {
			const canonicalFile = await readCanonicalRegistryFile(item, file)

			if (seenFiles.has(canonicalFile.sourcePath)) continue

			seenFiles.add(canonicalFile.sourcePath)
			resolvedFiles.push({
				sourcePath: canonicalFile.sourcePath,
				suggestedTargetPath: suggestedTargetPath(file),
				code: canonicalFile.code,
			})
		}

		for (const dependencyName of item.registryDependencies ?? []) {
			const dependencyItem = registry.items.find(
				(candidate) => candidate.slug === dependencyName
			)

			if (!dependencyItem) {
				throw new Error(`Registry dependency not found: ${dependencyName}`)
			}

			await visit(dependencyItem)
		}
	}

	await visit(rootItem)

	for (const dependencyName of demo.registryDependencies ?? []) {
		const dependencyItem = registry.items.find(
			(candidate) => candidate.slug === dependencyName
		)

		if (!dependencyItem) {
			throw new Error(`Demo registry dependency not found: ${dependencyName}`)
		}

		await visit(dependencyItem)
	}

	for (const dependency of demo.dependencies ?? []) {
		addDependency(dependency)
	}

	const usageSource = await readFile(
		resolveTrustedSource(demo.sourcePath),
		"utf8"
	)

	return {
		component: demo.componentSlug,
		demo: demo.name,
		usageCode: toConsumerUsage(usageSource),
		files: resolvedFiles,
		dependencies,
		registryDependencies: resolvedNames.filter(
			(name) => name !== demo.componentSlug
		),
	}
}
