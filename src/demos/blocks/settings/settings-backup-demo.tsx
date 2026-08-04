"use client"

import type { ComponentProps } from "react"
import SettingsBackup from "@/registry/blocks/settings/settings-backup"

export function SettingsBackupDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			backups: [
				{
					id: "backup-1",
					name: "Automatic Backup - Daily",
					type: "automatic" as const,
					status: "completed" as const,
					size: 500 * 1024 * 1024, // 500 MB
					createdAt: new Date(now - 24 * 60 * 60 * 1000), // 1 day ago
					completedAt: new Date(now - 24 * 60 * 60 * 1000 + 30_000),
					location: "cloud",
					retentionDays: 30,
				},
				{
					id: "backup-2",
					name: "Manual Backup",
					type: "manual" as const,
					status: "completed" as const,
					size: 450 * 1024 * 1024, // 450 MB
					createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
					completedAt: new Date(now - 7 * 24 * 60 * 60 * 1000 + 25_000),
					location: "cloud",
				},
				{
					id: "backup-3",
					name: "Automatic Backup - Daily",
					type: "automatic" as const,
					status: "in_progress" as const,
					size: 0,
					createdAt: new Date(now - 5 * 60 * 1000), // 5 minutes ago
					location: "cloud",
				},
				{
					id: "backup-4",
					name: "Weekly Backup",
					type: "automatic" as const,
					status: "completed" as const,
					size: 520 * 1024 * 1024, // 520 MB
					createdAt: new Date(now - 14 * 24 * 60 * 60 * 1000), // 14 days ago
					completedAt: new Date(now - 14 * 24 * 60 * 60 * 1000 + 35_000),
					location: "cloud",
					retentionDays: 30,
				},
				{
					id: "backup-5",
					name: "Failed Backup",
					type: "automatic" as const,
					status: "failed" as const,
					size: 0,
					createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
					location: "cloud",
				},
			],
			autoBackupEnabled: true,
			autoBackupSchedule: "daily" as const,
			retentionDays: 30,
			storageLocation: "cloud",
			onCreateBackup: async () => {
				/* create backup */
				return {
					id: `backup-${now}`,
					name: "Manual Backup",
					type: "manual" as const,
					status: "completed" as const,
					size: 500 * 1024 * 1024,
					createdAt: new Date(),
					completedAt: new Date(),
					location: "cloud",
				}
			},
			onRestore: async (backupId: string) => {
				/* restore backup */
			},
			onDelete: async (backupId: string) => {
				/* delete backup */
			},
			onUpdateSettings: async (settings: {
				enabled: boolean
				schedule?: "daily" | "weekly" | "monthly"
				retentionDays?: number
				storageLocation?: string
			}) => {
				/* update backup settings */
			},
		}
	})()

	return (
		<SettingsBackup
			{...(exampleProps as unknown as ComponentProps<typeof SettingsBackup>)}
		/>
	)
}
