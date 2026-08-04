"use client"

import type { ComponentProps } from "react"
import BillingPaymentFailed from "@/registry/blocks/billing/billing-payment-failed"

export function BillingPaymentFailedDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			failure: {
				invoiceId: "inv-1",
				invoiceNumber: "INV-2024-001",
				amount: 29,
				currency: "USD",
				failedAt: new Date(now - 2 * 60 * 60 * 1000),
				reason: "insufficient_funds" as const,
				reasonMessage:
					"Your payment method was declined due to insufficient funds.",
				paymentMethod: {
					type: "card",
					last4: "4242",
					brand: "visa",
				},
				retryAttempts: 1,
				maxRetryAttempts: 3,
			},
			onRetry: async () => {
				/* retry payment */
			},
			onUpdatePaymentMethod: () => {
				/* update method */
			},
			onContactSupport: () => {
				/* contact support */
			},
			currency: "USD",
		}
	})()

	return (
		<BillingPaymentFailed
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingPaymentFailed
			>)}
		/>
	)
}
