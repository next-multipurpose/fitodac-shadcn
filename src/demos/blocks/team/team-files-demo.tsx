"use client"

import type { ComponentProps } from "react"
import TeamFiles from "@/registry/blocks/team/team-files"

export function TeamFilesDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			files: [
				{
					id: "file-1",
					name: "project-plan.pdf",
					type: "application/pdf",
					size: 2.5 * 1024 * 1024,
					uploadedBy: {
						id: "user-1",
						name: "Sarah Johnson",
						avatar: "https://i.pravatar.cc/150?img=11",
					},
					uploadedAt: new Date(now - 2 * 24 * 60 * 60 * 1000),
					tags: ["planning", "project"],
					aiAccessible: true,
				},
				{
					id: "file-2",
					name: "design-mockups.png",
					type: "image/png",
					size: 1.2 * 1024 * 1024,
					uploadedBy: {
						id: "user-2",
						name: "Mike Chen",
						avatar: "https://i.pravatar.cc/150?img=12",
					},
					uploadedAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
					tags: ["design"],
				},
			],
			onUpload: async (files: File[]) => {
				/* upload files */
			},
			onDelete: async (fileId: string) => {
				/* delete file */
			},
			onDownload: async (fileId: string) => {
				/* download file */
			},
			onToggleAIAccess: async (fileId: string, enabled: boolean) => {
				/* toggle AI access */
			},
		}
	})()

	return (
		<TeamFiles
			{...(exampleProps as unknown as ComponentProps<typeof TeamFiles>)}
		/>
	)
}
