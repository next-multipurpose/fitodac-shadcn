"use client"

import type { ComponentProps } from "react"
import TeamDashboard from "@/registry/blocks/team/team-dashboard"

export function TeamDashboardDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			teamName: "Acme Inc.",
			plan: "pro" as const,
			members: [
				{
					id: "user-1",
					name: "Sarah Johnson",
					avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
					role: "owner" as const,
					status: "active" as const,
				},
				{
					id: "user-2",
					name: "Mike Chen",
					avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
					role: "admin" as const,
					status: "active" as const,
				},
				{
					id: "user-3",
					name: "Emily Davis",
					avatar: "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
					role: "member" as const,
					status: "active" as const,
				},
			],
			recentActivities: [
				{
					id: "activity-1",
					type: "member_joined" as const,
					user: {
						name: "Alex Rodriguez",
						avatar:
							"https://api.dicebear.com/9.x/glass/svg?seed=alex-rodriguez",
					},
					description: "joined the team",
					timestamp: new Date(now - 2 * 60 * 60 * 1000),
				},
				{
					id: "activity-2",
					type: "ai_session" as const,
					user: {
						name: "Mike Chen",
						avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
					},
					description: "created a new AI session",
					timestamp: new Date(now - 3 * 60 * 60 * 1000),
				},
			],
			usage: {
				aiTokens: { used: 250_000, limit: 1_000_000 },
				storage: {
					used: 15 * 1024 * 1024 * 1024,
					limit: 100 * 1024 * 1024 * 1024,
				},
				members: { current: 12, limit: 50 },
			},
			onInviteMember: () => {
				/* invite member */
			},
			onManageSettings: () => {
				/* manage settings */
			},
		}
	})()

	return (
		<TeamDashboard
			{...(exampleProps as unknown as ComponentProps<typeof TeamDashboard>)}
		/>
	)
}
