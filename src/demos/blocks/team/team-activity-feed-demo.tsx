"use client"

import type { ComponentProps } from "react"
import TeamActivityFeed from "@/registry/blocks/team/team-activity-feed"

export function TeamActivityFeedDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			activities: [
				{
					id: "activity-1",
					type: "member_joined" as const,
					user: {
						id: "user-1",
						name: "Alex Rodriguez",
						avatar:
							"https://api.dicebear.com/9.x/glass/svg?seed=alex-rodriguez",
					},
					description: "joined the team",
					timestamp: new Date(now - 2 * 60 * 60 * 1000),
				},
				{
					id: "activity-2",
					type: "ai_session_created" as const,
					user: {
						id: "user-2",
						name: "Mike Chen",
						avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
					},
					description: "created a new AI session",
					projectId: "project-1",
					projectName: "Website Redesign",
					timestamp: new Date(now - 3 * 60 * 60 * 1000),
				},
				{
					id: "activity-3",
					type: "file_uploaded" as const,
					user: {
						id: "user-3",
						name: "Emily Davis",
						avatar: "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
					},
					description: "uploaded project-plan.pdf",
					projectId: "project-1",
					projectName: "Website Redesign",
					timestamp: new Date(now - 5 * 60 * 60 * 1000),
				},
			],
			onFilterChange: (filters: unknown) => {
				/* filter activities */
			},
			showFilters: true,
		}
	})()

	return (
		<TeamActivityFeed
			{...(exampleProps as unknown as ComponentProps<typeof TeamActivityFeed>)}
		/>
	)
}
