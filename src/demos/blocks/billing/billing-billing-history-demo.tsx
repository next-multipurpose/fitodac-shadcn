"use client"

import type { ComponentProps } from "react"
import BillingBillingHistory from "@/registry/blocks/billing/billing-billing-history"

export function BillingBillingHistoryDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			transactions: [
				{
					id: "txn-1",
					date: new Date(now - 10 * 24 * 60 * 60 * 1000),
					amount: 29,
					type: "payment",
					status: "success",
					description: "Subscription - Pro Plan",
				},
				{
					id: "txn-2",
					date: new Date(now - 31 * 24 * 60 * 60 * 1000),
					amount: 29,
					type: "payment",
					status: "success",
					description: "Subscription - Pro Plan",
				},
			],
			onViewDetails: (txnId: string) => {
				/* view transaction */
			},
		}
	})()

	return (
		<BillingBillingHistory
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingBillingHistory
			>)}
		/>
	)
}
