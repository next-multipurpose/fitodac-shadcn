import type { DemoEntry } from "@/demos/types"

import { BillingBillingHistoryDemo } from "./billing-billing-history-demo"
import { BillingCouponCodeDemo } from "./billing-coupon-code-demo"
import { BillingInvoiceDetailsDemo } from "./billing-invoice-details-demo"
import { BillingInvoiceListDemo } from "./billing-invoice-list-demo"
import { BillingPaymentFailedDemo } from "./billing-payment-failed-demo"
import { BillingPaymentFormDemo } from "./billing-payment-form-demo"
import { BillingPaymentMethodDemo } from "./billing-payment-method-demo"
import { BillingPaymentScheduleDemo } from "./billing-payment-schedule-demo"
import { BillingPlanSelectorDemo } from "./billing-plan-selector-demo"
import { BillingPricingTableDemo } from "./billing-pricing-table-demo"
import { BillingSubscriptionCardDemo } from "./billing-subscription-card-demo"
import { BillingSubscriptionSettingsDemo } from "./billing-subscription-settings-demo"
import { BillingUpgradePromptDemo } from "./billing-upgrade-prompt-demo"
import { BillingUsageAlertsDemo } from "./billing-usage-alerts-demo"
import { BillingUsageBillingDemo } from "./billing-usage-billing-demo"

export const billingDemos: Record<string, DemoEntry> = {
	"billing-billing-history": {
		name: "billing-billing-history",
		title: "History",
		component: BillingBillingHistoryDemo,
		componentSlug: "billing-billing-history",
		sourcePath: "src/demos/blocks/billing/billing-billing-history-demo.tsx",
	},
	"billing-coupon-code": {
		name: "billing-coupon-code",
		title: "Coupon Code",
		component: BillingCouponCodeDemo,
		componentSlug: "billing-coupon-code",
		sourcePath: "src/demos/blocks/billing/billing-coupon-code-demo.tsx",
	},
	"billing-invoice-details": {
		name: "billing-invoice-details",
		title: "Invoice Details",
		component: BillingInvoiceDetailsDemo,
		componentSlug: "billing-invoice-details",
		sourcePath: "src/demos/blocks/billing/billing-invoice-details-demo.tsx",
	},
	"billing-invoice-list": {
		name: "billing-invoice-list",
		title: "Invoice List",
		component: BillingInvoiceListDemo,
		componentSlug: "billing-invoice-list",
		sourcePath: "src/demos/blocks/billing/billing-invoice-list-demo.tsx",
	},
	"billing-payment-failed": {
		name: "billing-payment-failed",
		title: "Payment Failed",
		component: BillingPaymentFailedDemo,
		componentSlug: "billing-payment-failed",
		sourcePath: "src/demos/blocks/billing/billing-payment-failed-demo.tsx",
	},
	"billing-payment-form": {
		name: "billing-payment-form",
		title: "Payment Form",
		component: BillingPaymentFormDemo,
		componentSlug: "billing-payment-form",
		sourcePath: "src/demos/blocks/billing/billing-payment-form-demo.tsx",
	},
	"billing-payment-method": {
		name: "billing-payment-method",
		title: "Payment Method",
		component: BillingPaymentMethodDemo,
		componentSlug: "billing-payment-method",
		sourcePath: "src/demos/blocks/billing/billing-payment-method-demo.tsx",
	},
	"billing-payment-schedule": {
		name: "billing-payment-schedule",
		title: "Payment Schedule",
		component: BillingPaymentScheduleDemo,
		componentSlug: "billing-payment-schedule",
		sourcePath: "src/demos/blocks/billing/billing-payment-schedule-demo.tsx",
	},
	"billing-plan-selector": {
		name: "billing-plan-selector",
		title: "Plan Selector",
		component: BillingPlanSelectorDemo,
		componentSlug: "billing-plan-selector",
		sourcePath: "src/demos/blocks/billing/billing-plan-selector-demo.tsx",
	},
	"billing-pricing-table": {
		name: "billing-pricing-table",
		title: "Pricing Table",
		component: BillingPricingTableDemo,
		componentSlug: "billing-pricing-table",
		sourcePath: "src/demos/blocks/billing/billing-pricing-table-demo.tsx",
	},
	"billing-subscription-card": {
		name: "billing-subscription-card",
		title: "Subscription Card",
		component: BillingSubscriptionCardDemo,
		componentSlug: "billing-subscription-card",
		sourcePath: "src/demos/blocks/billing/billing-subscription-card-demo.tsx",
	},
	"billing-subscription-settings": {
		name: "billing-subscription-settings",
		title: "Subscription Settings",
		component: BillingSubscriptionSettingsDemo,
		componentSlug: "billing-subscription-settings",
		sourcePath:
			"src/demos/blocks/billing/billing-subscription-settings-demo.tsx",
	},
	"billing-upgrade-prompt": {
		name: "billing-upgrade-prompt",
		title: "Upgrade Prompt",
		component: BillingUpgradePromptDemo,
		componentSlug: "billing-upgrade-prompt",
		sourcePath: "src/demos/blocks/billing/billing-upgrade-prompt-demo.tsx",
	},
	"billing-usage-alerts": {
		name: "billing-usage-alerts",
		title: "Usage Alerts",
		component: BillingUsageAlertsDemo,
		componentSlug: "billing-usage-alerts",
		sourcePath: "src/demos/blocks/billing/billing-usage-alerts-demo.tsx",
	},
	"billing-usage-billing": {
		name: "billing-usage-billing",
		title: "Usage Billing",
		component: BillingUsageBillingDemo,
		componentSlug: "billing-usage-billing",
		sourcePath: "src/demos/blocks/billing/billing-usage-billing-demo.tsx",
	},
}
