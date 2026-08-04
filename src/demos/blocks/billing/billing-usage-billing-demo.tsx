"use client"

import type { ComponentProps } from "react"
import BillingUsageBilling from "@/registry/blocks/billing/billing-usage-billing"

export function BillingUsageBillingDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			currentPeriod: {
				start: new Date(now - 30 * 24 * 60 * 60 * 1000),
				end: new Date(now),
				usage: 8_500_000,
				limit: 10_000_000,
			},
			previousPeriod: {
				usage: 7_200_000,
				limit: 10_000_000,
			},
			dataPoints: [
				{
					date: new Date(now - 29 * 24 * 60 * 60 * 1000),
					value: 250_000,
					category: "API Requests",
				},
				{
					date: new Date(now - 25 * 24 * 60 * 60 * 1000),
					value: 320_000,
					category: "API Requests",
				},
				{
					date: new Date(now - 20 * 24 * 60 * 60 * 1000),
					value: 410_000,
					category: "API Requests",
				},
				{
					date: new Date(now - 15 * 24 * 60 * 60 * 1000),
					value: 380_000,
					category: "API Requests",
				},
				{
					date: new Date(now - 10 * 24 * 60 * 60 * 1000),
					value: 450_000,
					category: "API Requests",
				},
				{
					date: new Date(now - 5 * 24 * 60 * 60 * 1000),
					value: 520_000,
					category: "API Requests",
				},
				{ date: new Date(now), value: 580_000, category: "API Requests" },
			],
			categories: [
				{
					name: "API Requests",
					value: 5_800_000,
					limit: 8_000_000,
					color: "#3b82f6",
				},
				{
					name: "Storage",
					value: 2_700_000,
					limit: 5_000_000,
					color: "#10b981",
				},
			],
			unit: "requests",
			onDateRangeChange: (start: Date, end: Date) => {
				/* change date range */
			},
			onExport: () => {
				/* export usage data */
			},
			showChart: true,
			showBreakdown: true,
			warningThreshold: 80,
		}
	})()

	return (
		<BillingUsageBilling
			{...(exampleProps as unknown as ComponentProps<
				typeof BillingUsageBilling
			>)}
		/>
	)
}
