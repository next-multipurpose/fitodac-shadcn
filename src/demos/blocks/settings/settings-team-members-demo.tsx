"use client"

import type { ComponentProps } from "react"
import SettingsTeamMembers from "@/registry/blocks/settings/settings-team-members"

export function SettingsTeamMembersDemo() {
	const exampleProps = (() => {
		return {
			members: [
				{
					id: "user-1",
					name: "Alice Admin",
					email: "alice@company.com",
					role: "admin",
				},
				{
					id: "user-2",
					name: "Bob Writer",
					email: "bob@company.com",
					role: "editor",
				},
			],
			onInvite: async (email: string, role: string) => {
				/* invite member */
			},
			onRemove: async (id: string) => {
				/* remove member */
			},
			onUpdateRole: async (id: string, newRole: string) => {
				/* update role */
			},
		}
	})()

	return (
		<SettingsTeamMembers
			{...(exampleProps as unknown as ComponentProps<
				typeof SettingsTeamMembers
			>)}
		/>
	)
}
