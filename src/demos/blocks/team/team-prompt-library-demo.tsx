"use client"

import type { ComponentProps } from "react"
import TeamPromptLibrary from "@/registry/blocks/team/team-prompt-library"

export function TeamPromptLibraryDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			prompts: [
				{
					id: "prompt-1",
					title: "Code Review Assistant",
					prompt:
						"Review this code and provide suggestions for improvement. Focus on performance, readability, and best practices.",
					description: "Helps with code reviews and improvements",
					category: "Code",
					author: {
						id: "user-1",
						name: "Sarah Johnson",
						avatar: "https://i.pravatar.cc/150?img=11",
					},
					rating: 4.5,
					usageCount: 45,
					bestModel: "gpt-4",
					tags: ["code", "review", "best-practices"],
					createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(now - 7 * 24 * 60 * 60 * 1000),
				},
				{
					id: "prompt-2",
					title: "Blog Post Writer",
					prompt:
						"Write a comprehensive blog post about {topic}. Include an introduction, main points, and conclusion.",
					description: "Generate well-structured blog posts",
					category: "Writing",
					author: {
						id: "user-2",
						name: "Mike Chen",
						avatar: "https://i.pravatar.cc/150?img=12",
					},
					rating: 4.8,
					usageCount: 32,
					bestModel: "claude-3-opus",
					tags: ["writing", "blog", "content"],
					tone: "professional",
					createdAt: new Date(now - 5 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(now - 5 * 24 * 60 * 60 * 1000),
				},
			],
			currentUserId: "user-1",
			onCreate: async (data: {
				title: string
				prompt: string
				description?: string
				category?: string
				tags?: string[]
				bestModel?: string
				tone?: string
			}) => {
				/* create prompt */
				return {
					id: `prompt-${now}`,
					title: data.title,
					prompt: data.prompt,
					description: data.description,
					category: data.category,
					tags: data.tags,
					author: { id: "user-1", name: "Sarah Johnson" },
					bestModel: data.bestModel,
					tone: data.tone,
					createdAt: new Date(),
					updatedAt: new Date(),
				}
			},
			onUpdate: async (promptId: string, data: unknown) => {
				/* update prompt */
			},
			onDelete: async (promptId: string) => {
				/* delete prompt */
			},
			onFavorite: async (promptId: string, isFavorite: boolean) => {
				/* toggle favorite */
			},
			onUse: (prompt: unknown) => {
				/* use prompt */
			},
		}
	})()

	return (
		<TeamPromptLibrary
			{...(exampleProps as unknown as ComponentProps<typeof TeamPromptLibrary>)}
			className="max-w-screen-md"
		/>
	)
}
