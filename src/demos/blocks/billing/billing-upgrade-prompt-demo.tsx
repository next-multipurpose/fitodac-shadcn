"use client"

import type { ComponentProps } from "react"
import BillingUpgradePrompt from "@/registry/blocks/billing/billing-upgrade-prompt"

export function BillingUpgradePromptDemo() {
	const exampleProps = (() => {
		return {
			currentPlan: {
				id: "free",
				name: "Free",
			},
			recommendedPlan: {
				id: "pro",
				name: "Pro",
				price: 29,
				currency: "USD",
				billingPeriod: "monthly" as const,
			},
			features: [
				{ name: "Unlimited API requests" },
				{ name: "1 TB storage" },
				{ name: "Priority support" },
				{ name: "SSO integration" },
			],
			reason: "recommended" as const,
			onUpgrade: () => {
				/* upgrade to recommended plan */
			},
			onDismiss: () => {
				/* dismiss upgrade prompt */
			},
			onLearnMore: () => {
				/* learn more about plan */
			},
			variant: "card" as const,
			showSavings: true,
			savingsAmount: 58,
		}
	})()

	return (
		<BillingUpgradePrompt
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingUpgradePrompt
			>)}
		/>
	)
}
