"use client"

import type { ComponentProps } from "react"
import type { ProfileData } from "@/registry/blocks/settings/settings-profile"
import SettingsProfile from "@/registry/blocks/settings/settings-profile"

export function SettingsProfileDemo() {
	const exampleProps = (() => {
		return {
			profile: {
				name: "John Doe",
				email: "john.doe@example.com",
				bio: "Design Engineer. Open Source Advocate. Loves UI/UX.",
				location: "San Francisco, CA",
				website: "https://example.com",
				avatarUrl: "https://api.dicebear.com/9.x/glass/svg?seed=john-doe",
				social: {
					twitter: "johndoe",
					github: "johnnydoe",
				},
			} as ProfileData,
			onSave: async (data: unknown) => {
				/* save profile */
			},
		}
	})()

	return (
		<SettingsProfile
			{...(exampleProps as unknown as ComponentProps<typeof SettingsProfile>)}
		/>
	)
}
