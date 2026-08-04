"use client"

import type { ComponentProps } from "react"
import type { PricingPlan } from "@/registry/blocks/billing/billing-pricing-table"
import BillingPricingTable from "@/registry/blocks/billing/billing-pricing-table"

export function BillingPricingTableDemo() {
	const exampleProps = (() => {
		return {
			plans: [
				{
					id: "free",
					name: "Free",
					description: "Perfect for getting started",
					price: { monthly: 0, annual: 0 },
					currency: "USD",
					features: [
						{
							name: "Community support",
							values: { free: true, pro: true, enterprise: true },
						},
						{
							name: "Essential features",
							values: { free: true, pro: true, enterprise: true },
						},
					],
					isPopular: false,
				},
				{
					id: "pro",
					name: "Pro",
					description: "Advanced usage & features",
					price: { monthly: 29, annual: 290 },
					currency: "USD",
					features: [
						{
							name: "Everything in Free",
							values: { free: false, pro: true, enterprise: true },
						},
						{
							name: "Priority support",
							values: { free: false, pro: true, enterprise: true },
						},
						{
							name: "Advanced analytics",
							values: { free: false, pro: true, enterprise: true },
						},
						{
							name: "API access",
							values: { free: false, pro: true, enterprise: true },
						},
					],
					isPopular: true,
				},
				{
					id: "enterprise",
					name: "Enterprise",
					description: "Custom solutions and SLAs",
					price: { monthly: 99, annual: 990 },
					currency: "USD",
					features: [
						{
							name: "All Pro features",
							values: { free: false, pro: false, enterprise: true },
						},
						{
							name: "Custom integrations",
							values: { free: false, pro: false, enterprise: true },
						},
						{
							name: "Dedicated manager",
							values: { free: false, pro: false, enterprise: true },
						},
					],
					isPopular: false,
				},
			] as PricingPlan[],
			billingPeriod: "monthly" as const,
			onBillingPeriodChange: (period: "monthly" | "annual") => {
				/* change billing period */
			},
			onSelectPlan: (planId: string) => {
				/* select plan */
			},
		}
	})()

	return (
		<BillingPricingTable
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingPricingTable
			>)}
		/>
	)
}
