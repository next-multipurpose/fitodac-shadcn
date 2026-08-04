"use client"

import type { ComponentProps } from "react"
import TeamProjects from "@/registry/blocks/team/team-projects"

export function TeamProjectsDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			projects: [
				{
					id: "project-1",
					name: "Website Redesign",
					description: "Complete redesign of company website",
					color: "#3b82f6",
					members: [
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
					defaultModel: "gpt-4",
					aiUsage: {
						tokens: 250_000,
						sessions: 89,
					},
					createdAt: new Date(now - 30 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
				},
				{
					id: "project-2",
					name: "Mobile App",
					description: "New mobile application development",
					color: "#10b981",
					members: [
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
					defaultModel: "claude-3-opus",
					aiUsage: {
						tokens: 180_000,
						sessions: 65,
					},
					createdAt: new Date(now - 20 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(now - 2 * 24 * 60 * 60 * 1000),
				},
			],
			currentUserId: "user-1",
			onCreate: async (data: {
				name: string
				description?: string
				color?: string
				defaultModel?: string
			}) => {
				/* create project */
				return {
					id: `project-${now}`,
					name: data.name,
					description: data.description,
					color: data.color || "#3b82f6",
					members: [],
					defaultModel: data.defaultModel,
					createdAt: new Date(),
					updatedAt: new Date(),
				}
			},
			onUpdate: async (projectId: string, data: unknown) => {
				/* update project */
			},
			onDelete: async (projectId: string) => {
				/* delete project */
			},
			onSelect: (projectId: string) => {
				/* select project */
			},
		}
	})()

	return (
		<TeamProjects
			{...(exampleProps as unknown as ComponentProps<typeof TeamProjects>)}
		/>
	)
}
