"use client"

import type { ComponentProps } from "react"
import TaskDetail from "@/registry/blocks/tasks/task-detail"

export function TaskDetailDemo() {
	const exampleProps = (() => {
		const baseDate = new Date("2025-11-18T09:00:00Z")
		return {
			task: {
				id: "1",
				title: "Redesign homepage hero section",
				description:
					"Update the hero section with new messaging, improved CTA placement, and better visual hierarchy. Need to align with brand guidelines.",
				status: "in_progress" as const,
				priority: "high" as const,
				assignees: [
					{
						id: "1",
						name: "Sarah Chen",
						avatar: "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
					},
					{
						id: "2",
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
			subtasks: [
				{ id: "1", title: "Create wireframes", completed: true },
				{ id: "2", title: "Design mockups", completed: true },
				{ id: "3", title: "Get stakeholder approval", completed: false },
				{ id: "4", title: "Implement design", completed: false },
			],
			comments: [
				{
					id: "1",
					content:
						"I've reviewed the design mockups and they look good! One suggestion: we should increase the CTA button size on mobile.",
					author: {
						id: "2",
						name: "Marcus Rodriguez",
						avatar:
							"https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
					},
					createdAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000),
				},
			],
			attachments: [
				{
					id: "1",
					name: "hero-section-mockup-v3.fig",
					url: "#",
					size: 3_456_000,
					type: "application/octet-stream",
					uploadedBy: {
						id: "1",
						name: "Sarah Chen",
						avatar: "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
					},
					uploadedAt: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000),
				},
			],
			activities: [
				{
					id: "1",
					type: "created" as const,
					user: {
						id: "2",
						name: "Marcus Rodriguez",
						avatar:
							"https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
					},
					description: "created this task",
					timestamp: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
				},
				{
					id: "2",
					type: "assigned" as const,
					user: {
						id: "2",
						name: "Marcus Rodriguez",
						avatar:
							"https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
					},
					description: "assigned to Sarah Chen and Marcus Rodriguez",
					timestamp: new Date(baseDate.getTime() - 11 * 24 * 60 * 60 * 1000),
				},
			],
			onUpdate: async (updates: unknown) => {
				/* update task */
			},
			onDelete: async () => {
				/* delete task */
			},
		}
	})()

	return (
		<TaskDetail
			{...(exampleProps as unknown as ComponentProps<typeof TaskDetail>)}
		/>
	)
}
