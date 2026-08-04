"use client"

import type { ComponentProps } from "react"
import TaskCreate from "@/registry/blocks/tasks/task-create"

export function TaskCreateDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			availableAssignees: [
				{ id: "user-1", name: "Sarah Chen" },
				{ id: "user-2", name: "Marcus Rodriguez" },
				{ id: "user-3", name: "Emily Watson" },
				{ id: "user-4", name: "David Kim" },
				{ id: "user-5", name: "Priya Patel" },
			],
			availableProjects: [
				{ id: "project-1", name: "Q4 Website Redesign" },
				{ id: "project-2", name: "Mobile App v2.0" },
				{ id: "project-3", name: "Payment System Integration" },
				{ id: "project-4", name: "Performance Optimization" },
			],
			onCreate: async (data: {
				title: string
				description?: string
				status?: string
				priority?: string
				dueDate?: Date
				assigneeIds?: string[]
				tags?: string[]
			}) => {
				/* create task in database and return with generated ID */
				return {
					id: `task-${now}`,
					title: data.title,
					description: data.description,
					status: data.status,
					priority: data.priority,
					assignees: data.assigneeIds
						? data.assigneeIds.map((id: string) => ({
								id,
								name: "Assignee",
								avatar: `https://api.dicebear.com/9.x/glass/svg?seed=${id}`,
							}))
						: [],
					tags: data.tags || [],
					dueDate: data.dueDate,
					createdAt: new Date(),
					updatedAt: new Date(),
				}
			},
			onCancel: () => {
				/* cancel creation - close modal or navigate back */
			},
		}
	})()

	return (
		<TaskCreate
			{...(exampleProps as unknown as ComponentProps<typeof TaskCreate>)}
		/>
	)
}
