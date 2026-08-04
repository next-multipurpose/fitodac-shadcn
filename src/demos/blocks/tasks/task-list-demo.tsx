"use client"

import type { ComponentProps } from "react"
import TaskList from "@/registry/blocks/tasks/task-list"

export function TaskListDemo() {
	const exampleProps = (() => {
		const baseDate = new Date("2025-11-18T09:00:00Z")
		return {
			tasks: [
				{
					id: "task-1",
					title: "Redesign homepage hero section",
					description:
						"Update the hero section with new messaging, improved CTA placement, and better visual hierarchy. Need to align with brand guidelines and ensure accessibility standards.",
					status: "in_progress" as const,
					priority: "high" as const,
					assignees: [
						{
							id: "user-1",
							name: "Sarah Chen",
							avatar:
								"https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
						},
						{
							id: "user-2",
							name: "Marcus Rodriguez",
							avatar:
								"https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
						},
					],
					tags: ["design", "frontend", "ui"],
					dueDate: new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000),
					createdAt: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
				},
				{
					id: "task-2",
					title: "Implement OAuth 2.0 authentication flow",
					description:
						"Add Google and GitHub OAuth providers. Need to handle token refresh, session management, and secure storage. Include rate limiting and CSRF protection. Must pass security audit before production deployment.",
					status: "todo" as const,
					priority: "urgent" as const,
					assignees: [
						{
							id: "user-3",
							name: "Emily Watson",
							avatar:
								"https://api.dicebear.com/9.x/glass/svg?seed=EmilyWatson2024",
						},
					],
					tags: ["backend", "security", "auth"],
					dueDate: new Date(baseDate.getTime() + 10 * 24 * 60 * 60 * 1000),
					createdAt: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000),
				},
				{
					id: "task-3",
					title: "Complete API documentation for v2.0",
					description:
						"Document all REST endpoints with request/response examples, error codes, rate limits, and authentication requirements. Include Postman collection and OpenAPI spec. Update developer portal with interactive docs.",
					status: "done" as const,
					priority: "medium" as const,
					assignees: [
						{
							id: "user-4",
							name: "David Kim",
							avatar:
								"https://api.dicebear.com/9.x/glass/svg?seed=DavidKim2024",
						},
					],
					tags: ["documentation", "api"],
					createdAt: new Date(baseDate.getTime() - 25 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000),
				},
			],
			onTaskSelect: (taskId: string) => {
				/* select task - open detail view or navigate */
			},
			onTaskUpdate: async (taskId: string, updates: unknown) => {
				/* update task in database */
			},
			onTaskDelete: async (taskId: string) => {
				/* delete task after confirmation */
			},
		}
	})()

	return (
		<TaskList
			{...(exampleProps as unknown as ComponentProps<typeof TaskList>)}
		/>
	)
}
