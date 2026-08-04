"use client"

import type { ComponentProps } from "react"
import SettingsWebhooks from "@/registry/blocks/settings/settings-webhooks"

export function SettingsWebhooksDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			webhooks: [
				{
					id: "webhook-1",
					name: "Payment Notifications",
					url: "https://api.example.com/webhooks/payment",
					secret: "whsec_1234567890abcdef",
					events: ["payment.succeeded", "payment.failed"],
					status: "active" as const,
					createdAt: new Date(now - 30 * 24 * 60 * 60 * 1000), // 30 days ago
					lastTriggered: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
					successCount: 245,
					failureCount: 3,
				},
				{
					id: "webhook-2",
					name: "User Events",
					url: "https://api.example.com/webhooks/users",
					secret: "whsec_abcdef1234567890",
					events: ["user.created", "user.updated", "user.deleted"],
					status: "paused" as const,
					createdAt: new Date(now - 14 * 24 * 60 * 60 * 1000), // 14 days ago
					lastTriggered: new Date(now - 5 * 24 * 60 * 60 * 1000), // 5 days ago
					successCount: 120,
					failureCount: 0,
				},
				{
					id: "webhook-3",
					name: "Subscription Updates",
					url: "https://api.example.com/webhooks/subscriptions",
					secret: "whsec_xyz789abc123def",
					events: [
						"subscription.created",
						"subscription.updated",
						"subscription.cancelled",
					],
					status: "active" as const,
					createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
					lastTriggered: new Date(now - 1 * 60 * 60 * 1000), // 1 hour ago
					successCount: 89,
					failureCount: 2,
				},
				{
					id: "webhook-4",
					name: "Failed Webhook",
					url: "https://api.example.com/webhooks/failed",
					secret: "whsec_failed123456",
					events: ["payment.failed"],
					status: "failed" as const,
					createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
					lastTriggered: new Date(now - 12 * 60 * 60 * 1000), // 12 hours ago
					successCount: 15,
					failureCount: 8,
				},
			],
			deliveries: {
				"webhook-1": [
					{
						id: "delivery-1",
						webhookId: "webhook-1",
						status: "success" as const,
						responseCode: 200,
						timestamp: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
						payload:
							'{"event": "payment.succeeded", "amount": 29.99, "currency": "USD"}',
						response: "OK",
					},
					{
						id: "delivery-2",
						webhookId: "webhook-1",
						status: "success" as const,
						responseCode: 200,
						timestamp: new Date(now - 4 * 60 * 60 * 1000), // 4 hours ago
						payload:
							'{"event": "payment.failed", "reason": "insufficient_funds"}',
						response: "OK",
					},
					{
						id: "delivery-3",
						webhookId: "webhook-1",
						status: "failed" as const,
						responseCode: 500,
						timestamp: new Date(now - 6 * 60 * 60 * 1000), // 6 hours ago
						payload: '{"event": "payment.succeeded", "amount": 49.99}',
						response: "Internal Server Error",
					},
				],
				"webhook-3": [
					{
						id: "delivery-4",
						webhookId: "webhook-3",
						status: "success" as const,
						responseCode: 200,
						timestamp: new Date(now - 1 * 60 * 60 * 1000), // 1 hour ago
						payload:
							'{"event": "subscription.created", "plan": "pro", "userId": "user-123"}',
						response: "OK",
					},
				],
			},
			onCreate: async (data: {
				name: string
				url: string
				events: string[]
			}) => {
				/* create webhook */
				return {
					id: `webhook-${now}`,
					name: data.name,
					url: data.url,
					events: data.events,
					status: "active" as const,
					createdAt: new Date(),
					successCount: 0,
					failureCount: 0,
				}
			},
			onUpdate: async (
				id: string,
				data: Partial<{
					name: string
					url: string
					events: string[]
					status: "active" | "paused" | "failed"
				}>
			) => {
				/* update webhook */
			},
			onDelete: async (id: string) => {
				/* delete webhook */
			},
			onTest: async (id: string) => {
				/* test webhook */
			},
			onToggleStatus: async (id: string) => {
				/* toggle webhook status */
			},
		}
	})()

	return (
		<SettingsWebhooks
			{...(exampleProps as unknown as ComponentProps<typeof SettingsWebhooks>)}
		/>
	)
}
