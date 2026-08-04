"use client"

import type { ComponentProps } from "react"
import type { Session } from "@/registry/blocks/auth/auth-session-manager"
import AuthSessionManager from "@/registry/blocks/auth/auth-session-manager"

export function AuthSessionManagerDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			sessions: [
				{
					id: "session-1",
					deviceType: "desktop" as const,
					deviceName: "MacBook Pro",
					browser: "Chrome",
					location: "San Francisco, CA",
					lastActive: new Date(now),
					isCurrent: true,
				},
				{
					id: "session-2",
					deviceType: "mobile" as const,
					deviceName: "iPhone 15",
					browser: "Safari",
					location: "New York, NY",
					lastActive: new Date(now - 2 * 60 * 60 * 1000),
					isCurrent: false,
				},
			] as Session[],
			onRevoke: (id: string) => {
				/* revoke single session */
			},
			onRevokeAll: () => {
				/* revoke all sessions */
			},
		}
	})()

	return (
		<AuthSessionManager
			{...(exampleProps as unknown as ComponentProps<
				typeof AuthSessionManager
			>)}
		/>
	)
}
