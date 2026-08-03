import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import * as React from "react"

import { blockCategories, blockEntries } from "@/lib/blocks-catalog"
import { BlocksDetail } from "@/components/blocks-detail"

import AuthAccountDelete from "@/registry/blocks/auth/auth-account-delete"
import AuthChangePassword from "@/registry/blocks/auth/auth-change-password"
import AuthEmailChange from "@/registry/blocks/auth/auth-email-change"
import AuthForgotPassword from "@/registry/blocks/auth/auth-forgot-password"
import AuthLoginForm from "@/registry/blocks/auth/auth-login-form"
import AuthMagicLink from "@/registry/blocks/auth/auth-magic-link"
import AuthOtpVerify from "@/registry/blocks/auth/auth-otp-verify"
import AuthPhoneVerify from "@/registry/blocks/auth/auth-phone-verify"
import AuthRecoveryCodes from "@/registry/blocks/auth/auth-recovery-codes"
import AuthResetPassword from "@/registry/blocks/auth/auth-reset-password"
import AuthSessionManager from "@/registry/blocks/auth/auth-session-manager"
import AuthSignupForm from "@/registry/blocks/auth/auth-signup-form"
import AuthSocialAccounts from "@/registry/blocks/auth/auth-social-accounts"
import AuthTwoFactorSetup from "@/registry/blocks/auth/auth-two-factor-setup"
import AuthTwoFactorVerify from "@/registry/blocks/auth/auth-two-factor-verify"
import AuthVerifyEmail from "@/registry/blocks/auth/auth-verify-email"

import BillingBillingHistory from "@/registry/blocks/billing/billing-billing-history"
import BillingCouponCode from "@/registry/blocks/billing/billing-coupon-code"
import BillingInvoiceDetails from "@/registry/blocks/billing/billing-invoice-details"
import BillingInvoiceList from "@/registry/blocks/billing/billing-invoice-list"
import BillingPaymentFailed from "@/registry/blocks/billing/billing-payment-failed"
import BillingPaymentForm from "@/registry/blocks/billing/billing-payment-form"
import BillingPaymentMethod from "@/registry/blocks/billing/billing-payment-method"
import BillingPaymentSchedule from "@/registry/blocks/billing/billing-payment-schedule"
import BillingPlanSelector from "@/registry/blocks/billing/billing-plan-selector"
import BillingPricingTable from "@/registry/blocks/billing/billing-pricing-table"
import BillingSubscriptionCard from "@/registry/blocks/billing/billing-subscription-card"
import BillingSubscriptionSettings from "@/registry/blocks/billing/billing-subscription-settings"
import BillingUpgradePrompt from "@/registry/blocks/billing/billing-upgrade-prompt"
import BillingUsageAlerts from "@/registry/blocks/billing/billing-usage-alerts"
import BillingUsageBilling from "@/registry/blocks/billing/billing-usage-billing"

import SettingsAccount from "@/registry/blocks/settings/settings-account"
import SettingsActivityLog from "@/registry/blocks/settings/settings-activity-log"
import SettingsAdvanced from "@/registry/blocks/settings/settings-advanced"
import SettingsApiKeys from "@/registry/blocks/settings/settings-api-keys"
import SettingsBackup from "@/registry/blocks/settings/settings-backup"
import SettingsDomains from "@/registry/blocks/settings/settings-domains"
import SettingsExportData from "@/registry/blocks/settings/settings-export-data"
import SettingsImportData from "@/registry/blocks/settings/settings-import-data"
import SettingsIntegrations from "@/registry/blocks/settings/settings-integrations"
import SettingsNotifications from "@/registry/blocks/settings/settings-notifications"
import SettingsPreferences from "@/registry/blocks/settings/settings-preferences"
import SettingsPrivacy from "@/registry/blocks/settings/settings-privacy"
import SettingsProfile from "@/registry/blocks/settings/settings-profile"
import SettingsSecurity from "@/registry/blocks/settings/settings-security"
import SettingsSso from "@/registry/blocks/settings/settings-sso"
import SettingsStorage from "@/registry/blocks/settings/settings-storage"
import SettingsTeamMembers from "@/registry/blocks/settings/settings-team-members"
import SettingsWebhooks from "@/registry/blocks/settings/settings-webhooks"

import ProjectList from "@/registry/blocks/tasks/project-list"
import TaskBoard from "@/registry/blocks/tasks/task-board"
import TaskCreate from "@/registry/blocks/tasks/task-create"
import TaskDetail from "@/registry/blocks/tasks/task-detail"
import TaskFilters from "@/registry/blocks/tasks/task-filters"
import TaskList from "@/registry/blocks/tasks/task-list"
import TaskProgress from "@/registry/blocks/tasks/task-progress"

import TeamActivityFeed from "@/registry/blocks/team/team-activity-feed"
import TeamAnalytics from "@/registry/blocks/team/team-analytics"
import TeamChat from "@/registry/blocks/team/team-chat"
import TeamDashboard from "@/registry/blocks/team/team-dashboard"
import TeamFiles from "@/registry/blocks/team/team-files"
import TeamInvitations from "@/registry/blocks/team/team-invitations"
import TeamMemberList from "@/registry/blocks/team/team-member-list"
import TeamNotes from "@/registry/blocks/team/team-notes"
import TeamNotifications from "@/registry/blocks/team/team-notifications"
import TeamPermissionsMatrix from "@/registry/blocks/team/team-permissions-matrix"
import TeamProjects from "@/registry/blocks/team/team-projects"
import TeamPromptLibrary from "@/registry/blocks/team/team-prompt-library"
import TeamSettings from "@/registry/blocks/team/team-settings"
import TeamSwitcher from "@/registry/blocks/team/team-switcher"

type PageProps = {
	params: Promise<{ slug: string }>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: Record<string, React.ComponentType<any>> = {
	"auth-account-delete": AuthAccountDelete,
	"auth-change-password": AuthChangePassword,
	"auth-email-change": AuthEmailChange,
	"auth-forgot-password": AuthForgotPassword,
	"auth-login-form": AuthLoginForm,
	"auth-magic-link": AuthMagicLink,
	"auth-otp-verify": AuthOtpVerify,
	"auth-phone-verify": AuthPhoneVerify,
	"auth-recovery-codes": AuthRecoveryCodes,
	"auth-reset-password": AuthResetPassword,
	"auth-session-manager": AuthSessionManager,
	"auth-signup-form": AuthSignupForm,
	"auth-social-accounts": AuthSocialAccounts,
	"auth-two-factor-setup": AuthTwoFactorSetup,
	"auth-two-factor-verify": AuthTwoFactorVerify,
	"auth-verify-email": AuthVerifyEmail,
	"billing-billing-history": BillingBillingHistory,
	"billing-coupon-code": BillingCouponCode,
	"billing-invoice-details": BillingInvoiceDetails,
	"billing-invoice-list": BillingInvoiceList,
	"billing-payment-failed": BillingPaymentFailed,
	"billing-payment-form": BillingPaymentForm,
	"billing-payment-method": BillingPaymentMethod,
	"billing-payment-schedule": BillingPaymentSchedule,
	"billing-plan-selector": BillingPlanSelector,
	"billing-pricing-table": BillingPricingTable,
	"billing-subscription-card": BillingSubscriptionCard,
	"billing-subscription-settings": BillingSubscriptionSettings,
	"billing-upgrade-prompt": BillingUpgradePrompt,
	"billing-usage-alerts": BillingUsageAlerts,
	"billing-usage-billing": BillingUsageBilling,
	"settings-account": SettingsAccount,
	"settings-activity-log": SettingsActivityLog,
	"settings-advanced": SettingsAdvanced,
	"settings-api-keys": SettingsApiKeys,
	"settings-backup": SettingsBackup,
	"settings-domains": SettingsDomains,
	"settings-export-data": SettingsExportData,
	"settings-import-data": SettingsImportData,
	"settings-integrations": SettingsIntegrations,
	"settings-notifications": SettingsNotifications,
	"settings-preferences": SettingsPreferences,
	"settings-privacy": SettingsPrivacy,
	"settings-profile": SettingsProfile,
	"settings-security": SettingsSecurity,
	"settings-sso": SettingsSso,
	"settings-storage": SettingsStorage,
	"settings-team-members": SettingsTeamMembers,
	"settings-webhooks": SettingsWebhooks,
	"project-list": ProjectList,
	"task-board": TaskBoard,
	"task-create": TaskCreate,
	"task-detail": TaskDetail,
	"task-filters": TaskFilters,
	"task-list": TaskList,
	"task-progress": TaskProgress,
	"team-activity-feed": TeamActivityFeed,
	"team-analytics": TeamAnalytics,
	"team-chat": TeamChat,
	"team-dashboard": TeamDashboard,
	"team-files": TeamFiles,
	"team-invitations": TeamInvitations,
	"team-member-list": TeamMemberList,
	"team-notes": TeamNotes,
	"team-notifications": TeamNotifications,
	"team-permissions-matrix": TeamPermissionsMatrix,
	"team-projects": TeamProjects,
	"team-prompt-library": TeamPromptLibrary,
	"team-settings": TeamSettings,
	"team-switcher": TeamSwitcher,
}

export function generateStaticParams() {
	return blockCategories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params
	const t = await getTranslations("Metadata")
	const category = blockCategories.find((c) => c.slug === slug)
	return {
		title: category ? `${category.slug} blocks` : t("blocksTitle"),
	}
}

export default async function BlocksCategoryPage({ params }: PageProps) {
	const { slug } = await params
	const category = blockCategories.find((c) => c.slug === slug)

	if (!category) {
		notFound()
	}

	const blocks = blockEntries[category.slug] ?? []
	const t = await getTranslations("Blocks")

	return (
		<main className="mx-auto w-full max-w-6xl px-6 py-14">
			<Link
				className="text-sm text-muted-foreground transition-colors hover:text-foreground"
				href="/blocks"
			>
				&larr; {t("backToCategories")}
			</Link>

			<div className="mt-8 flex flex-col gap-3">
				<h1 className="text-4xl font-semibold tracking-tight">
					{t(`categories.${category.slug}`)}
				</h1>
				<p className="max-w-2xl text-muted-foreground">
					{t(`categoryDescriptions.${category.slug}`)}
				</p>
			</div>

			<div className="mt-10">
				<BlocksDetail
					blocks={blocks}
					components={blockComponents}
				/>
			</div>
		</main>
	)
}
