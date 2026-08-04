"use client"

import type { ComponentProps } from "react"
import TeamMemberList from "@/registry/blocks/team/team-member-list"

export function TeamMemberListDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			members: [
				{
					id: "member-1",
					name: "Sarah Johnson",
					email: "sarah@example.com",
					avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
					role: "owner" as const,
					status: "active" as const,
					lastActive: new Date(now - 5 * 60 * 1000),
					joinedAt: new Date(now - 30 * 24 * 60 * 60 * 1000),
					aiUsage: {
						tokens: 125_000,
						sessions: 45,
					},
				},
				{
					id: "member-2",
					name: "Mike Chen",
					email: "mike@example.com",
					avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
					role: "admin" as const,
					status: "active" as const,
					lastActive: new Date(now - 15 * 60 * 1000),
					joinedAt: new Date(now - 20 * 24 * 60 * 60 * 1000),
					aiUsage: {
						tokens: 89_000,
						sessions: 32,
					},
				},
				{
					id: "member-3",
					name: "Emily Davis",
					email: "emily@example.com",
					avatar: "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
					role: "member" as const,
					status: "active" as const,
					lastActive: new Date(now - 2 * 60 * 60 * 1000),
					joinedAt: new Date(now - 10 * 24 * 60 * 60 * 1000),
					aiUsage: {
						tokens: 45_000,
						sessions: 18,
					},
				},
			],
			currentUserId: "member-1",
			onPromote: async (memberId: string) => {
				/* promote member */
			},
			onDemote: async (memberId: string) => {
				/* demote member */
			},
			onRemove: async (memberId: string) => {
				/* remove member */
			},
			onResendInvite: async (memberId: string) => {
				/* resend invite */
			},
			showUsage: true,
		}
	})()

	return (
		<TeamMemberList
			{...(exampleProps as unknown as ComponentProps<typeof TeamMemberList>)}
		/>
	)
}
