"use client"

import type { ComponentProps } from "react"
import SettingsIntegrations from "@/registry/blocks/settings/settings-integrations"

export function SettingsIntegrationsDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			integrations: [
				{
					id: "github",
					name: "GitHub",
					description: "Connect your GitHub account to sync repositories",
					status: "connected" as const,
					lastSynced: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
					scopes: ["repo", "read:user"],
				},
				{
					id: "slack",
					name: "Slack",
					description: "Send notifications to your Slack workspace",
					status: "disconnected" as const,
					scopes: ["chat:write", "channels:read"],
				},
				{
					id: "google",
					name: "Google Drive",
					description: "Access and sync files from Google Drive",
					status: "expired" as const,
					lastSynced: new Date(now - 30 * 24 * 60 * 60 * 1000), // 30 days ago
					needsReconnection: true,
					scopes: ["drive.readonly"],
				},
				{
					id: "stripe",
					name: "Stripe",
					description: "Manage payments and subscriptions",
					status: "error" as const,
					lastSynced: new Date(now - 5 * 60 * 60 * 1000), // 5 hours ago
					scopes: ["read"],
				},
			],
			onConnect: async (integrationId: string) => {
				/* connect integration */
			},
			onDisconnect: async (integrationId: string) => {
				/* disconnect integration */
			},
			onReauthorize: async (integrationId: string) => {
				/* reauthorize integration */
			},
		}
	})()

	return (
		<SettingsIntegrations
			{...(exampleProps as unknown as ComponentProps<
				typeof SettingsIntegrations
			>)}
		/>
	)
}
