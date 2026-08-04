"use client"

import type { ComponentProps } from "react"
import ProjectList from "@/registry/blocks/tasks/project-list"

export function ProjectListDemo() {
	const exampleProps = (() => {
		const baseDate = new Date("2025-11-18T09:00:00Z")
		return {
			projects: [
				{
					id: "1",
					name: "Q4 Website Redesign",
					description:
						"Complete redesign of company website with focus on conversion optimization.",
					status: "active" as const,
					progress: 68,
					color: "#3b82f6",
					members: [
						{
							id: "1",
							name: "Sarah Chen",
							avatar:
								"https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
						},
						{
							id: "2",
							name: "Marcus Rodriguez",
							avatar:
								"https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
						},
					],
					taskCount: 24,
					completedTaskCount: 16,
					createdAt: new Date(baseDate.getTime() - 45 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
				},
				{
					id: "2",
					name: "Mobile App v2.0",
					description: "Major update to mobile application with new features.",
					status: "active" as const,
					progress: 42,
					color: "#10b981",
					members: [
						{
							id: "1",
							name: "Sarah Chen",
							avatar:
								"https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
						},
					],
					taskCount: 18,
					completedTaskCount: 8,
					createdAt: new Date(baseDate.getTime() - 30 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
				},
			],
			onProjectSelect: (projectId: string) => {
				/* select project */
			},
		}
	})()

	return (
		<ProjectList
			{...(exampleProps as unknown as ComponentProps<typeof ProjectList>)}
		/>
	)
}
