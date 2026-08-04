"use client"

import type { ComponentProps } from "react"
import BillingPaymentSchedule from "@/registry/blocks/billing/billing-payment-schedule"

export function BillingPaymentScheduleDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			payments: [
				{
					id: "sch-1",
					date: new Date(now + 15 * 24 * 60 * 60 * 1000),
					amount: 29,
					currency: "USD",
					status: "upcoming" as const,
					description: "Pro Plan - February 2024",
					paymentMethod: {
						type: "card",
						last4: "4242",
						brand: "visa",
					},
					invoiceId: "inv-2",
					invoiceNumber: "INV-2024-002",
				},
				{
					id: "sch-2",
					date: new Date(now + 45 * 24 * 60 * 60 * 1000),
					amount: 29,
					currency: "USD",
					status: "upcoming" as const,
					description: "Pro Plan - March 2024",
					paymentMethod: {
						type: "card",
						last4: "4242",
						brand: "visa",
					},
				},
			],
			onViewInvoice: (invoiceId: string) => {
				/* view invoice */
			},
			onRetry: async (paymentId: string) => {
				/* retry payment */
			},
			onCancel: async (paymentId: string) => {
				/* cancel scheduled payment */
			},
			currency: "USD",
			showUpcomingOnly: false,
		}
	})()
	const payments = Array.isArray(exampleProps.payments)
		? exampleProps.payments
		: exampleProps.payments
			? [exampleProps.payments]
			: []

	return (
		<BillingPaymentSchedule
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingPaymentSchedule
			>)}
			payments={payments}
		/>
	)
}
