"use client"

import type { ComponentProps } from "react"
import type { SelectablePlan } from "@/registry/blocks/billing/billing-plan-selector"
import BillingPlanSelector from "@/registry/blocks/billing/billing-plan-selector"

export function BillingPlanSelectorDemo() {
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
						{ name: "1,000 API requests/month", included: true },
						{ name: "5 GB storage", included: true },
						{ name: "1 team member", included: true },
						{ name: "Community support", included: true },
					],
					isCurrent: true,
					ctaLabel: "Current plan",
				},
				{
					id: "pro",
					name: "Pro",
					description: "For growing teams",
					price: { monthly: 29, annual: 290 },
					currency: "USD",
					isPopular: true,
					isCurrent: false,
					features: [
						{ name: "100,000 API requests/month", included: true },
						{ name: "100 GB storage", included: true },
						{ name: "10 team members", included: true },
						{ name: "Email support", included: true },
						{ name: "Custom domains", included: true },
						{ name: "Advanced analytics", included: true },
					],
					ctaLabel: "Upgrade",
				},
				{
					id: "enterprise",
					name: "Enterprise",
					description: "For large organizations",
					price: { monthly: 99, annual: 990 },
					currency: "USD",
					isCurrent: false,
					features: [
						{ name: "Unlimited API requests", included: true },
						{ name: "1 TB storage", included: true },
						{ name: "Unlimited team members", included: true },
						{ name: "Priority support", included: true },
						{ name: "SSO integration", included: true },
						{ name: "Dedicated account manager", included: true },
					],
					ctaLabel: "Contact sales",
				},
			] as SelectablePlan[],
			selectedPlanId: "free",
			billingPeriod: "monthly" as const,
			onBillingPeriodChange: (period: "monthly" | "annual") => {
				/* change billing period */
			},
			onPlanSelect: (planId: string) => {
				/* select plan by id */
			},
			showAnnualSavings: true,
			currency: "USD",
		}
	})()

	return (
		<BillingPlanSelector
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingPlanSelector
			>)}
		/>
	)
}
