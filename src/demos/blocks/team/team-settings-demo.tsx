"use client"

import type { ComponentProps } from "react"
import TeamSettings from "@/registry/blocks/team/team-settings"

export function TeamSettingsDemo() {
	const exampleProps = (() => {
		return {
			plan: "pro" as const,
			settings: {
				name: "Acme Inc.",
				description: "A modern software company",
				slug: "acme-inc",
				color: "#3b82f6",
				defaultModel: "gpt-4",
			},
			onSave: async (settings: {
				name: string
				description?: string
				avatar?: string
				slug?: string
				color?: string
				defaultModel?: string
				defaultAccessScope?: string[]
				metadata?: Record<string, string>
			}) => {
				/* save team settings */
			},
			onAvatarUpload: async (file: File) => {
				/* upload avatar */
				return "https://api.dicebear.com/9.x/glass/svg?seed=team-avatar"
			},
			onAvatarRemove: async () => {
				/* remove avatar */
			},
		}
	})()

	return (
		<TeamSettings
			{...(exampleProps as unknown as ComponentProps<typeof TeamSettings>)}
		/>
	)
}
