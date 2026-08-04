"use client"

import type { ComponentProps } from "react"
import SettingsPrivacy from "@/registry/blocks/settings/settings-privacy"

export function SettingsPrivacyDemo() {
	const exampleProps = (() => {
		return {
			privacySettings: {
				profileVisibility: "private" as const,
				dataSharing: false,
				require2FA: true,
			},
			onSave: async (settings: unknown) => {
				/* save privacy */
			},
		}
	})()

	return (
		<SettingsPrivacy
			{...(exampleProps as unknown as ComponentProps<typeof SettingsPrivacy>)}
		/>
	)
}
