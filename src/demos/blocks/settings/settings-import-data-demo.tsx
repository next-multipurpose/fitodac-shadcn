"use client"

import type { ComponentProps } from "react"
import SettingsImportData from "@/registry/blocks/settings/settings-import-data"

export function SettingsImportDataDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			importHistory: [
				{
					id: "import-1",
					filename: "user-data-backup.json",
					format: "json" as const,
					status: "completed" as const,
					createdAt: new Date(now - 14 * 24 * 60 * 60 * 1000), // 14 days ago
					completedAt: new Date(now - 14 * 24 * 60 * 60 * 1000 + 45_000),
					recordsImported: 1250,
					recordsSkipped: 12,
					recordsFailed: 3,
					conflictResolution: "merge" as const,
				},
				{
					id: "import-2",
					filename: "activity-logs.csv",
					format: "csv" as const,
					status: "completed" as const,
					createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
					completedAt: new Date(now - 7 * 24 * 60 * 60 * 1000 + 30_000),
					recordsImported: 5420,
					recordsSkipped: 0,
					recordsFailed: 0,
					conflictResolution: "overwrite" as const,
				},
				{
					id: "import-3",
					filename: "messages-export.json",
					format: "json" as const,
					status: "importing" as const,
					progress: 65,
					createdAt: new Date(now - 2 * 60 * 1000), // 2 minutes ago
					conflictResolution: "skip" as const,
				},
				{
					id: "import-4",
					filename: "settings-backup.json",
					format: "json" as const,
					status: "failed" as const,
					createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
					error: "Invalid file format: missing required fields",
					conflictResolution: "skip" as const,
				},
				{
					id: "import-5",
					filename: "contacts.csv",
					format: "csv" as const,
					status: "completed" as const,
					createdAt: new Date(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
					completedAt: new Date(now - 1 * 24 * 60 * 60 * 1000 + 20_000),
					recordsImported: 234,
					recordsSkipped: 5,
					recordsFailed: 1,
					conflictResolution: "merge" as const,
				},
			],
			onUpload: async (file: File) => {
				/* upload and preview file */
				return {
					totalRecords: 150,
					categories: {
						profile: 1,
						activity: 50,
						messages: 99,
					},
					conflicts: 5,
					fields: ["id", "name", "email", "createdAt"],
				}
			},
			onImport: async (data: {
				file: File
				conflictResolution: "skip" | "overwrite" | "merge"
				dryRun?: boolean
			}) => {
				/* import data */
				return {
					id: `import-${now}`,
					filename: data.file.name,
					format: data.file.name.endsWith(".json")
						? ("json" as const)
						: ("csv" as const),
					status: data.dryRun ? ("dry-run" as const) : ("importing" as const),
					createdAt: new Date(),
					conflictResolution: data.conflictResolution,
				}
			},
		}
	})()

	return (
		<SettingsImportData
			{...(exampleProps as unknown as ComponentProps<
				typeof SettingsImportData
			>)}
		/>
	)
}
