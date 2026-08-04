"use client"

import type { ComponentProps } from "react"
import SettingsAdvanced from "@/registry/blocks/settings/settings-advanced"

export function SettingsAdvancedDemo() {
	const exampleProps = (() => {
		return {
			featureFlags: [
				{ id: "ff-1", name: "Experimental UI", enabled: true },
				{ id: "ff-2", name: "Debug Logging", enabled: false },
			],
			onToggleFlag: (flagId: string, enabled: boolean) => {
				/* enable flag */
			},
		}
	})()

	return (
		<SettingsAdvanced
			{...(exampleProps as unknown as ComponentProps<typeof SettingsAdvanced>)}
		/>
	)
}
