"use client"

import type { ComponentProps } from "react"
import type { Invoice } from "@/registry/blocks/billing/billing-invoice-list"
import BillingInvoiceList from "@/registry/blocks/billing/billing-invoice-list"

export function BillingInvoiceListDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			invoices: [
				{
					id: "inv-1",
					invoiceNumber: "INV-2024-001",
					date: new Date(now - 5 * 24 * 60 * 60 * 1000),
					amount: 29,
					currency: "USD",
					status: "paid" as const,
				},
				{
					id: "inv-2",
					invoiceNumber: "INV-2024-002",
					date: new Date(now - 30 * 24 * 60 * 60 * 1000),
					amount: 29,
					currency: "USD",
					status: "due" as const,
				},
			] as Invoice[],
			onViewInvoice: (id: string) => {
				/* view invoice details */
			},
			onDownloadInvoice: (id: string) => {
				/* download invoice */
			},
		}
	})()

	return (
		<BillingInvoiceList
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingInvoiceList
			>)}
		/>
	)
}
