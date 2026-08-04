"use client"

import type { ComponentProps } from "react"
import BillingCouponCode from "@/registry/blocks/billing/billing-coupon-code"

export function BillingCouponCodeDemo() {
	const exampleProps = (() => {
		return {
			onApply: async (code: string) => {
				/* apply coupon code */
			},
			placeholder: "Enter coupon code...",
			discountInfo: "Save 20% with WELCOME20",
		}
	})()

	return (
		<BillingCouponCode
			{...(exampleProps as unknown as ComponentProps<typeof BillingCouponCode>)}
		/>
	)
}
