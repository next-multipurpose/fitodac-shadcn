"use client"

import type { ComponentProps } from "react"
import TeamAnalytics from "@/registry/blocks/team/team-analytics"

export function TeamAnalyticsDemo() {
	const exampleProps = (() => {
		return {
			tokenUsage: {
				current: 250_000,
				previous: 200_000,
			},
			sessionCount: {
				current: 145,
				previous: 120,
			},
			memberUsage: [
				{
					id: "user-1",
					name: "Sarah Johnson",
					avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
					tokens: 125_000,
					sessions: 45,
					files: 12,
				},
				{
					id: "user-2",
					name: "Mike Chen",
					avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
					tokens: 89_000,
					sessions: 32,
					files: 8,
				},
				{
					id: "user-3",
					name: "Emily Davis",
					avatar: "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
					tokens: 45_000,
					sessions: 18,
					files: 5,
				},
			],
			topProjects: [
				{
					id: "project-1",
					name: "Website Redesign",
					usage: 250_000,
				},
				{
					id: "project-2",
					name: "Mobile App",
					usage: 180_000,
				},
			],
		}
	})()

	return (
		<TeamAnalytics
			{...(exampleProps as unknown as ComponentProps<typeof TeamAnalytics>)}
		/>
	)
}
