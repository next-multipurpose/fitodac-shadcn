"use client"

import type { ComponentProps } from "react"
import SettingsSecurity from "@/registry/blocks/settings/settings-security"

export function SettingsSecurityDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			sessions: [
				{
					id: "sec-session-1",
					ip: "192.168.1.1",
					device: "MacBook Pro",
					browser: "Chrome",
					active: true,
					lastActive: new Date(now),
				},
			],
			events: [
				{
					id: "event-1",
					type: "login",
					timestamp: new Date(now - 7_200_000),
					ip: "192.168.1.1",
				},
			],
			onRevokeSession: (id: string) => {
				/* revoke session */
			},
			onRevokeAllSessions: () => {
				/* revoke all */
			},
		}
	})()

	return (
		<SettingsSecurity
			{...(exampleProps as unknown as ComponentProps<typeof SettingsSecurity>)}
		/>
	)
}
