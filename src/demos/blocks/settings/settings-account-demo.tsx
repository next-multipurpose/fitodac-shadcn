"use client"

import type { ComponentProps } from "react"
import SettingsAccount from "@/registry/blocks/settings/settings-account"

export function SettingsAccountDemo() {
	const exampleProps = (() => {
		return {
			account: {
				type: "pro" as const,
				status: "active" as const,
				memberCount: 8,
				memberLimit: 10,
				storageUsed: 15 * 1024 * 1024 * 1024, // 15 GB
				storageLimit: 100 * 1024 * 1024 * 1024, // 100 GB
			},
			onUpgrade: async () => {
				/* upgrade account */
			},
			onDelete: async () => {
				/* delete account */
			},
			onTransfer: async () => {
				/* transfer account */
			},
		}
	})()

	return (
		<SettingsAccount
			{...(exampleProps as unknown as ComponentProps<typeof SettingsAccount>)}
		/>
	)
}
