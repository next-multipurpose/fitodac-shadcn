"use client"

import type { ComponentProps } from "react"
import { useState } from "react"
import { Button } from "@/registry/primitives/button"
import type { InvoiceDetails } from "@/registry/blocks/billing/billing-invoice-details"
import BillingInvoiceDetails from "@/registry/blocks/billing/billing-invoice-details"

export function BillingInvoiceDetailsDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			invoice: {
				id: "inv-1",
				invoiceNumber: "INV-2024-001",
				date: new Date(now - 5 * 24 * 60 * 60 * 1000),
				dueDate: new Date(now),
				amount: 29,
				currency: "USD",
				status: "paid" as const,
				description: "Pro Plan - January 2024",
				lineItems: [
					{
						description: "Pro Plan Subscription",
						quantity: 1,
						unitPrice: 29,
						subtotal: 29,
					},
				],
				subtotal: 29,
				tax: {
					amount: 0,
					rate: 0,
					label: "No tax",
				},
				total: 29,
				paymentMethod: {
					type: "card",
					last4: "4242",
					brand: "visa",
				},
				billingAddress: {
					name: "John Doe",
					line1: "123 Main Street",
					city: "San Francisco",
					state: "CA",
					zip: "94102",
					country: "United States",
				},
			} as InvoiceDetails,
			open: true,
			onOpenChange: () => {
				/* handle open/close */
			},
			onDownload: () => {
				/* download invoice */
			},
			onPrint: () => {
				/* print invoice */
			},
			currency: "USD",
		}
	})()
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col gap-4">
			<Button onClick={() => setOpen(true)}>View Invoice Details</Button>
			<BillingInvoiceDetails
				{...(exampleProps as unknown as ComponentProps<
					typeof BillingInvoiceDetails
				>)}
				open={open}
				onOpenChange={() => {
					setOpen(false)
					exampleProps.onOpenChange?.()
				}}
			/>
		</div>
	)
}
