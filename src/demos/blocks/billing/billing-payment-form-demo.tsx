"use client"

import type { ComponentProps } from "react"
import BillingPaymentForm from "@/registry/blocks/billing/billing-payment-form"

export function BillingPaymentFormDemo() {
	const exampleProps = (() => {
		return {
			onSubmit: ({
				cardNumber,
				exp,
				cvc,
			}: {
				cardNumber: string
				exp: string
				cvc: string
			}) => {
				/* submit payment */
			},
			onCancel: () => {
				/* cancel payment form */
			},
			supportedBrands: ["visa", "mastercard", "amex"],
		}
	})()

	return (
		<BillingPaymentForm
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingPaymentForm
			>)}
		/>
	)
}
