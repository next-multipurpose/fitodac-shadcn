"use client"

import type { ComponentProps } from "react"
import BillingUsageAlerts from "@/registry/blocks/billing/billing-usage-alerts"

export function BillingUsageAlertsDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			alerts: [
				{
					id: "alert-1",
					name: "API Usage Alert",
					category: "API Requests",
					threshold: 80,
					thresholdType: "percentage" as const,
					enabled: true,
					channels: ["email", "in_app"] as const,
					lastTriggered: new Date(now - 2 * 24 * 60 * 60 * 1000),
					triggerCount: 3,
				},
				{
					id: "alert-2",
					name: "Storage Limit Alert",
					category: "Storage",
					threshold: 5_000_000_000,
					thresholdType: "absolute" as const,
					enabled: true,
					channels: ["email", "sms", "in_app"] as const,
					triggerCount: 1,
				},
			],
			onToggle: async (alertId: string, enabled: boolean) => {
				/* toggle alert */
			},
			onEdit: (alertId: string) => {
				/* edit alert */
			},
			onDelete: async (alertId: string) => {
				/* delete alert */
			},
			onCreate: () => {
				/* create new alert */
			},
		}
	})()

	return (
		<BillingUsageAlerts
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingUsageAlerts
			>)}
		/>
	)
}
