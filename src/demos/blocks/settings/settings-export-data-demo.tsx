"use client"

import type { ComponentProps } from "react"
import SettingsExportData from "@/registry/blocks/settings/settings-export-data"

export function SettingsExportDataDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			exportHistory: [
				{
					id: "export-1",
					format: "json" as const,
					scope: ["profile", "activity"],
					status: "completed" as const,
					createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
					completedAt: new Date(now - 7 * 24 * 60 * 60 * 1000 + 30_000),
					downloadUrl: "#",
					expiresAt: new Date(now + 23 * 24 * 60 * 60 * 1000), // 23 days from now
				},
				{
					id: "export-2",
					format: "csv" as const,
					scope: ["messages"],
					status: "processing" as const,
					progress: 65,
					createdAt: new Date(now - 5 * 60 * 1000), // 5 minutes ago
				},
				{
					id: "export-3",
					format: "zip" as const,
					scope: ["profile", "activity", "messages", "files", "settings"],
					status: "completed" as const,
					createdAt: new Date(now - 14 * 24 * 60 * 60 * 1000), // 14 days ago
					completedAt: new Date(now - 14 * 24 * 60 * 60 * 1000 + 45_000),
					downloadUrl: "#",
					expiresAt: new Date(now + 16 * 24 * 60 * 60 * 1000), // 16 days from now
				},
				{
					id: "export-4",
					format: "pdf" as const,
					scope: ["billing"],
					status: "failed" as const,
					createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
					error: "Export timeout - please try again",
				},
			],
			onExport: async (data: {
				format: "json" | "csv" | "pdf" | "zip"
				scope: string[]
				dateRange?: { start: Date; end: Date }
			}) => {
				/* start export */
				return {
					id: `export-${now}`,
					format: data.format,
					scope: data.scope,
					status: "processing" as const,
					createdAt: new Date(),
				}
			},
			onDownload: async (jobId: string) => {
				/* download export */
			},
		}
	})()

	return (
		<SettingsExportData
			{...(exampleProps as unknown as ComponentProps<
				typeof SettingsExportData
			>)}
		/>
	)
}
