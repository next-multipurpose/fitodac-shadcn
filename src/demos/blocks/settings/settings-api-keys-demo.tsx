"use client"

import type { ComponentProps } from "react"
import SettingsAPIKeys from "@/registry/blocks/settings/settings-api-keys"

export function SettingsApiKeysDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			apiKeys: [
				{
					id: "key-1",
					name: "Production API Key",
					key: "sk_live_1234567890abcdef",
					createdAt: new Date(now - 30 * 24 * 60 * 60 * 1000),
					lastUsed: new Date(now - 2 * 60 * 60 * 1000),
					scopes: ["read", "write"],
					usageCount: 15_420,
					rateLimit: {
						limit: 10_000,
						remaining: 8560,
						resetAt: new Date(now + 24 * 60 * 60 * 1000),
					},
				},
				{
					id: "key-2",
					name: "Development Key",
					key: "sk_test_abcdef1234567890",
					createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000),
					scopes: ["read"],
					usageCount: 234,
				},
				{
					id: "key-3",
					name: "Read-only Key",
					key: "sk_readonly_xyz789abc123",
					createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000),
					lastUsed: new Date(now - 5 * 60 * 60 * 1000),
					scopes: ["read"],
					expiresAt: new Date(now + 90 * 24 * 60 * 60 * 1000),
					usageCount: 1250,
				},
			],
			onCreate: async (data: {
				name: string
				expiresAt?: Date
				scopes: string[]
			}) => {
				/* create new key */
				return {
					id: `key-${now}`,
					name: data.name,
					key: `sk_${Math.random().toString(36).substring(7)}`,
					createdAt: new Date(),
					scopes: data.scopes,
				}
			},
			onRevoke: async (keyId: string) => {
				/* revoke key */
			},
			onRegenerate: async (keyId: string) => {
				/* regenerate key */
				return {
					id: keyId,
					name: "Regenerated Key",
					key: `sk_${Math.random().toString(36).substring(7)}`,
					createdAt: new Date(),
					scopes: ["read", "write"],
				}
			},
		}
	})()

	return (
		<SettingsAPIKeys
			{...(exampleProps as unknown as ComponentProps<typeof SettingsAPIKeys>)}
		/>
	)
}
