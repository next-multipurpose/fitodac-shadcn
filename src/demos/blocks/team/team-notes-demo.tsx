"use client"

import type { ComponentProps } from "react"
import TeamNotes from "@/registry/blocks/team/team-notes"

export function TeamNotesDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			notes: [
				{
					id: "note-1",
					title: "Sprint Planning Notes",
					content:
						"Key decisions from today's sprint planning meeting:\n\n1. Focus on user authentication flow\n2. Complete API integration by Friday\n3. Design review scheduled for next week",
					author: {
						id: "user-1",
						name: "Sarah Johnson",
						avatar: "https://i.pravatar.cc/150?img=11",
					},
					tags: ["sprint", "planning"],
					aiSummary:
						"Meeting notes covering sprint priorities including authentication work, API integration deadline, and upcoming design review.",
					createdAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
					participants: [
						{
							id: "user-1",
							name: "Sarah Johnson",
							avatar:
								"https://i.pravatar.cc/150?img=11",
						},
						{
							id: "user-2",
							name: "Mike Chen",
							avatar: "https://i.pravatar.cc/150?img=12",
						},
						{
							id: "user-3",
							name: "Emily Davis",
							avatar: "https://i.pravatar.cc/150?img=14",
						},
					],
				},
				{
					id: "note-2",
					title: "API Documentation",
					content: "Updated API endpoints and authentication methods...",
					author: {
						id: "user-2",
						name: "Mike Chen",
						avatar: "https://i.pravatar.cc/150?img=12",
					},
					tags: ["api", "documentation"],
					createdAt: new Date(now - 2 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
					lastEditedBy: {
						id: "user-1",
						name: "Sarah Johnson",
					},
				},
			],
			currentUserId: "user-1",
			onCreate: async (data: {
				title: string
				content: string
				tags?: string[]
			}) => {
				/* create note */
				return {
					id: `note-${now}`,
					title: data.title,
					content: data.content,
					author: { id: "user-1", name: "Sarah Johnson" },
					tags: data.tags,
					createdAt: new Date(),
					updatedAt: new Date(),
				}
			},
			onUpdate: async (
				noteId: string,
				data: { title?: string; content?: string; tags?: string[] }
			) => {
				/* update note */
			},
			onDelete: async (noteId: string) => {
				/* delete note */
			},
			onSummarize: async (noteId: string) => {
				/* generate AI summary */
				return "AI-generated summary of the note content."
			},
		}
	})()

	return (
		<TeamNotes
			{...(exampleProps as unknown as ComponentProps<typeof TeamNotes>)}
		/>
	)
}
