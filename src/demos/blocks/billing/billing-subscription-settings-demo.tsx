"use client"

import type { ComponentProps } from "react"
import BillingSubscriptionSettings from "@/registry/blocks/billing/billing-subscription-settings"

export function BillingSubscriptionSettingsDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			subscription: {
				id: "sub-1",
				planName: "Pro Plan",
				status: "active" as const,
				billingPeriod: "monthly" as const,
				currentBillingDate: new Date(now - 15 * 24 * 60 * 60 * 1000),
				nextBillingDate: new Date(now + 15 * 24 * 60 * 60 * 1000),
				autoRenew: true,
				prorationPreview: {
					newAmount: 99,
					creditAmount: 14.5,
					nextBillingDate: new Date(now + 15 * 24 * 60 * 60 * 1000),
				},
			},
			onPause: async (resumeDate?: Date) => {
				/* pause subscription */
			},
			onResume: async () => {
				/* resume subscription */
			},
			onChangeBillingPeriod: async (period: "monthly" | "annual") => {
				/* change billing period */
			},
			onUpdateBillingDate: async (date: Date) => {
				/* update billing date */
			},
			onCancel: async (feedback?: string) => {
				/* cancel subscription */
			},
			onReactivate: async () => {
				/* reactivate subscription */
			},
			onToggleAutoRenew: async (enabled: boolean) => {
				/* toggle auto-renew */
			},
			currency: "USD",
		}
	})()

	return (
		<BillingSubscriptionSettings
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingSubscriptionSettings
			>)}
		/>
	)
}
