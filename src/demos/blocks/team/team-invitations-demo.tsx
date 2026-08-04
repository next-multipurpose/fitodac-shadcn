"use client"

import type { ComponentProps } from "react"
import TeamInvitations from "@/registry/blocks/team/team-invitations"

export function TeamInvitationsDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			invitations: [
				{
					id: "inv-1",
					email: "new@example.com",
					role: "member" as const,
					status: "pending" as const,
					invitedBy: { name: "Sarah Johnson", email: "sarah@example.com" },
					createdAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
					expiresAt: new Date(now + 7 * 24 * 60 * 60 * 1000),
				},
				{
					id: "inv-2",
					link: "https://app.example.com/join/abc123xyz",
					role: "admin" as const,
					status: "pending" as const,
					invitedBy: { name: "Mike Chen", email: "mike@example.com" },
					createdAt: new Date(now - 2 * 24 * 60 * 60 * 1000),
					expiresAt: new Date(now + 3 * 24 * 60 * 60 * 1000),
				},
			],
			onCreate: async (data: {
				email?: string
				role: "admin" | "member" | "viewer"
				expiresInDays?: number
				message?: string
			}) => {
				/* create invitation */
				return {
					id: `inv-${now}`,
					email: data.email,
					role: data.role,
					status: "pending" as const,
					invitedBy: { name: "Sarah Johnson", email: "sarah@example.com" },
					createdAt: new Date(),
					expiresAt: data.expiresInDays
						? new Date(now + data.expiresInDays * 24 * 60 * 60 * 1000)
						: undefined,
				}
			},
			onRevoke: async (invitationId: string) => {
				/* revoke invitation */
			},
			onResend: async (invitationId: string) => {
				/* resend invitation */
			},
			onCopyLink: async (link: string) => {
				/* copy invitation link */
			},
		}
	})()

	return (
		<TeamInvitations
			{...(exampleProps as unknown as ComponentProps<typeof TeamInvitations>)}
		/>
	)
}
