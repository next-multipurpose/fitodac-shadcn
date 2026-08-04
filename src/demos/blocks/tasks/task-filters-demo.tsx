"use client"

import type { ComponentProps } from "react"
import TaskFilters from "@/registry/blocks/tasks/task-filters"

export function TaskFiltersDemo() {
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
			availableTags: [
				"design",
				"frontend",
				"backend",
				"security",
				"documentation",
				"mobile",
				"devops",
				"review",
				"ui",
				"auth",
				"api",
				"bug",
				"ci-cd",
				"performance",
				"database",
				"email",
				"payments",
			],
			onFiltersChange: (filters: unknown) => {
				/* handle filter changes - update URL params, refetch tasks, etc. */
			},
		}
	})()

	return (
		<TaskFilters
			{...(exampleProps as unknown as ComponentProps<typeof TaskFilters>)}
		/>
	)
}
