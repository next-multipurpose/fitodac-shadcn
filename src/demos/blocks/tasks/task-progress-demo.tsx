"use client"

import type { ComponentProps } from "react"
import TaskProgress from "@/registry/blocks/tasks/task-progress"

export function TaskProgressDemo() {
	const exampleProps = (() => {
		const baseDate = new Date("2025-11-18T09:00:00Z")
		return {
			goal: 12,
			tasks: [
				{
					id: "task-1",
					title: "Redesign homepage hero section",
					status: "done" as const,
					priority: "high" as const,
					assignees: [],
					tags: [],
					createdAt: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
				},
				{
					id: "task-2",
					title: "Implement OAuth 2.0 authentication flow",
					status: "done" as const,
					priority: "urgent" as const,
					assignees: [],
					tags: [],
					createdAt: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
				},
				{
					id: "task-3",
					title: "Complete API documentation for v2.0",
					status: "done" as const,
					priority: "medium" as const,
					assignees: [],
					tags: [],
					createdAt: new Date(baseDate.getTime() - 25 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000),
				},
				{
					id: "task-4",
					title: "Fix iOS Safari layout bugs",
					status: "in_progress" as const,
					priority: "high" as const,
					assignees: [],
					tags: [],
					createdAt: new Date(baseDate.getTime() - 4 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
				},
				{
					id: "task-5",
					title: "Configure GitHub Actions for automated deployments",
					status: "in_progress" as const,
					priority: "medium" as const,
					assignees: [],
					tags: [],
					createdAt: new Date(baseDate.getTime() - 15 * 24 * 60 * 60 * 1000),
					updatedAt: new Date(baseDate.getTime() - 6 * 24 * 60 * 60 * 1000),
				},
			],
		}
	})()

	return (
		<TaskProgress
			{...(exampleProps as unknown as ComponentProps<typeof TaskProgress>)}
		/>
	)
}
