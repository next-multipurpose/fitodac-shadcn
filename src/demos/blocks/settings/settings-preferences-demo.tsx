"use client"

import type { ComponentProps } from "react"
import SettingsPreferences from "@/registry/blocks/settings/settings-preferences"

export function SettingsPreferencesDemo() {
	const exampleProps = (() => {
		return {
			preferences: {
				theme: "dark" as const,
				language: "en",
				timezone: "America/Los_Angeles",
				codeFontSize: 16,
			},
			onSave: async (prefs: unknown) => {
				/* save preferences */
			},
		}
	})()

	return (
		<SettingsPreferences
			{...(exampleProps as unknown as ComponentProps<
				typeof SettingsPreferences
			>)}
		/>
	)
}
