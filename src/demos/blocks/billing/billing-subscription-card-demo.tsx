"use client"

import type { ComponentProps } from "react"
import BillingSubscriptionCard from "@/registry/blocks/billing/billing-subscription-card"

export function BillingSubscriptionCardDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			plan: {
				id: "pro",
				name: "Pro",
				price: 29,
				currency: "USD",
				billingPeriod: "monthly" as const,
			},
			usage: [
				{
					label: "API Requests",
					used: 85_000,
					limit: 100_000,
					unit: "requests",
					warningThreshold: 80,
				},
				{
					label: "Storage",
					used: 75_000_000_000,
					limit: 100_000_000_000,
					unit: "bytes",
					warningThreshold: 80,
				},
			],
			nextBillingDate: new Date(now + 15 * 24 * 60 * 60 * 1000),
			autoRenew: true,
			status: "active" as const,
			onUpgrade: () => {
				/* upgrade plan */
			},
			onDowngrade: () => {
				/* downgrade plan */
			},
			onCancel: () => {
				/* cancel subscription */
			},
			onManage: () => {
				/* manage subscription */
			},
			showUsageDetails: true,
		}
	})()

	return (
		<BillingSubscriptionCard
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingSubscriptionCard
			>)}
		/>
	)
}
