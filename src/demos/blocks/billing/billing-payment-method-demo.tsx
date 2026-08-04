"use client"

import type { ComponentProps } from "react"
import type { PaymentMethod } from "@/registry/blocks/billing/billing-payment-method"
import BillingPaymentMethod from "@/registry/blocks/billing/billing-payment-method"

export function BillingPaymentMethodDemo() {
	const exampleProps = (() => {
		return {
			paymentMethods: [
				{
					id: "pm-1",
					type: "card" as const,
					brand: "visa" as const,
					last4: "4242",
					expiryMonth: 12,
					expiryYear: 2025,
					isDefault: true,
				},
				{
					id: "pm-2",
					type: "card" as const,
					brand: "amex" as const,
					last4: "3005",
					expiryMonth: 6,
					expiryYear: 2026,
					isDefault: false,
				},
			] as PaymentMethod[],
			onAdd: () => {
				/* add payment method */
			},
			onSetDefault: (pmId: string) => {
				/* set default method */
			},
			onRemove: (pmId: string) => {
				/* remove method */
			},
		}
	})()

	return (
		<BillingPaymentMethod
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingPaymentMethod
			>)}
		/>
	)
}
