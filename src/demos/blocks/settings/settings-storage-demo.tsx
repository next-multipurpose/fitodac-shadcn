"use client"

import type { ComponentProps } from "react"
import { Database, FileText, Image, Video } from "lucide-react"
import SettingsStorage from "@/registry/blocks/settings/settings-storage"

export function SettingsStorageDemo() {
	const exampleProps = (() => {
		return {
			totalUsed: 7 * 1024 * 1024 * 1024, // 7 GB
			totalLimit: 100 * 1024 * 1024 * 1024, // 100 GB
			categories: [
				{
					id: "files",
					name: "Files",
					icon: FileText,
					used: 5 * 1024 * 1024 * 1024, // 5 GB
					total: 10 * 1024 * 1024 * 1024, // 10 GB
					color: "bg-blue-500/10",
				},
				{
					id: "images",
					name: "Images",
					icon: Image,
					used: 2 * 1024 * 1024 * 1024, // 2 GB
					total: 5 * 1024 * 1024 * 1024, // 5 GB
					color: "bg-green-500/10",
				},
				{
					id: "backups",
					name: "Backups",
					icon: Database,
					used: 2_500_000_000, // 2.5 GB
					total: 20 * 1024 * 1024 * 1024, // 20 GB
					color: "bg-purple-500/10",
				},
				{
					id: "videos",
					name: "Videos",
					icon: Video,
					used: 1_500_000_000, // 1.5 GB
					total: 10 * 1024 * 1024 * 1024, // 10 GB
					color: "bg-red-500/10",
				},
			],
			onCleanup: async (categoryId?: string) => {
				/* start cleanup */
			},
		}
	})()

	return (
		<SettingsStorage
			{...(exampleProps as unknown as ComponentProps<typeof SettingsStorage>)}
		/>
	)
}
