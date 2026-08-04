"use client"

import type { ComponentProps } from "react"
import TeamSwitcher from "@/registry/blocks/team/team-switcher"

export function TeamSwitcherDemo() {
	const exampleProps = (() => {
		return {
			teams: [
				{
					id: "team-1",
					name: "Acme Inc.",
					plan: "pro" as const,
					memberCount: 12,
				},
				{
					id: "team-2",
					name: "Design Team",
					plan: "free" as const,
					memberCount: 5,
				},
			],
			currentTeamId: "team-1",
			onTeamSelect: (teamId: string) => {
				/* select team */
			},
			onCreateTeam: () => {
				/* create new team */
			},
			showPlan: true,
		}
	})()

	return (
		<TeamSwitcher
			{...(exampleProps as unknown as ComponentProps<typeof TeamSwitcher>)}
		/>
	)
}
