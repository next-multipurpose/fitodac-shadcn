import type { DemoEntry } from "@/demos/types"

import { AuthAccountDeleteDemo } from "./auth/auth-account-delete-demo"
import { AuthChangePasswordDemo } from "./auth/auth-change-password-demo"
import { AuthEmailChangeDemo } from "./auth/auth-email-change-demo"
import { AuthForgotPasswordDemo } from "./auth/auth-forgot-password-demo"
import { AuthLoginFormDemo } from "./auth/auth-login-form-demo"
import { AuthMagicLinkDemo } from "./auth/auth-magic-link-demo"
import { AuthOtpVerifyDemo } from "./auth/auth-otp-verify-demo"
import { AuthPhoneVerifyDemo } from "./auth/auth-phone-verify-demo"
import { AuthRecoveryCodesDemo } from "./auth/auth-recovery-codes-demo"
import { AuthResetPasswordDemo } from "./auth/auth-reset-password-demo"
import { AuthSessionManagerDemo } from "./auth/auth-session-manager-demo"
import { AuthSignupFormDemo } from "./auth/auth-signup-form-demo"
import { AuthSocialAccountsDemo } from "./auth/auth-social-accounts-demo"
import { AuthTwoFactorSetupDemo } from "./auth/auth-two-factor-setup-demo"
import { AuthTwoFactorVerifyDemo } from "./auth/auth-two-factor-verify-demo"
import { AuthVerifyEmailDemo } from "./auth/auth-verify-email-demo"

import { BillingBillingHistoryDemo } from "./billing/billing-billing-history-demo"
import { BillingCouponCodeDemo } from "./billing/billing-coupon-code-demo"
import { BillingInvoiceDetailsDemo } from "./billing/billing-invoice-details-demo"
import { BillingInvoiceListDemo } from "./billing/billing-invoice-list-demo"
import { BillingPaymentFailedDemo } from "./billing/billing-payment-failed-demo"
import { BillingPaymentFormDemo } from "./billing/billing-payment-form-demo"
import { BillingPaymentMethodDemo } from "./billing/billing-payment-method-demo"
import { BillingPaymentScheduleDemo } from "./billing/billing-payment-schedule-demo"
import { BillingPlanSelectorDemo } from "./billing/billing-plan-selector-demo"
import { BillingPricingTableDemo } from "./billing/billing-pricing-table-demo"
import { BillingSubscriptionCardDemo } from "./billing/billing-subscription-card-demo"
import { BillingSubscriptionSettingsDemo } from "./billing/billing-subscription-settings-demo"
import { BillingUpgradePromptDemo } from "./billing/billing-upgrade-prompt-demo"
import { BillingUsageAlertsDemo } from "./billing/billing-usage-alerts-demo"
import { BillingUsageBillingDemo } from "./billing/billing-usage-billing-demo"

import { SettingsAccountDemo } from "./settings/settings-account-demo"
import { SettingsActivityLogDemo } from "./settings/settings-activity-log-demo"
import { SettingsAdvancedDemo } from "./settings/settings-advanced-demo"
import { SettingsApiKeysDemo } from "./settings/settings-api-keys-demo"
import { SettingsBackupDemo } from "./settings/settings-backup-demo"
import { SettingsDomainsDemo } from "./settings/settings-domains-demo"
import { SettingsExportDataDemo } from "./settings/settings-export-data-demo"
import { SettingsImportDataDemo } from "./settings/settings-import-data-demo"
import { SettingsIntegrationsDemo } from "./settings/settings-integrations-demo"
import { SettingsNotificationsDemo } from "./settings/settings-notifications-demo"
import { SettingsPreferencesDemo } from "./settings/settings-preferences-demo"
import { SettingsPrivacyDemo } from "./settings/settings-privacy-demo"
import { SettingsProfileDemo } from "./settings/settings-profile-demo"
import { SettingsSecurityDemo } from "./settings/settings-security-demo"
import { SettingsSsoDemo } from "./settings/settings-sso-demo"
import { SettingsStorageDemo } from "./settings/settings-storage-demo"
import { SettingsTeamMembersDemo } from "./settings/settings-team-members-demo"
import { SettingsWebhooksDemo } from "./settings/settings-webhooks-demo"

import { ProjectListDemo } from "./tasks/project-list-demo"
import { TaskBoardDemo } from "./tasks/task-board-demo"
import { TaskCreateDemo } from "./tasks/task-create-demo"
import { TaskDetailDemo } from "./tasks/task-detail-demo"
import { TaskFiltersDemo } from "./tasks/task-filters-demo"
import { TaskListDemo } from "./tasks/task-list-demo"
import { TaskProgressDemo } from "./tasks/task-progress-demo"

import { TeamActivityFeedDemo } from "./team/team-activity-feed-demo"
import { TeamAnalyticsDemo } from "./team/team-analytics-demo"
import { TeamChatDemo } from "./team/team-chat-demo"
import { TeamDashboardDemo } from "./team/team-dashboard-demo"
import { TeamFilesDemo } from "./team/team-files-demo"
import { TeamInvitationsDemo } from "./team/team-invitations-demo"
import { TeamMemberListDemo } from "./team/team-member-list-demo"
import { TeamNotesDemo } from "./team/team-notes-demo"
import { TeamNotificationsDemo } from "./team/team-notifications-demo"
import { TeamPermissionsMatrixDemo } from "./team/team-permissions-matrix-demo"
import { TeamProjectsDemo } from "./team/team-projects-demo"
import { TeamPromptLibraryDemo } from "./team/team-prompt-library-demo"
import { TeamSettingsDemo } from "./team/team-settings-demo"
import { TeamSwitcherDemo } from "./team/team-switcher-demo"

export const blockDemos: Record<string, DemoEntry> = {
	"auth-account-delete": {
		name: "auth-account-delete",
		title: "Account Delete",
		component: AuthAccountDeleteDemo,
		componentSlug: "auth-account-delete",
		sourcePath: "src/demos/blocks/auth/auth-account-delete-demo.tsx",
	},
	"auth-change-password": {
		name: "auth-change-password",
		title: "Change Password",
		component: AuthChangePasswordDemo,
		componentSlug: "auth-change-password",
		sourcePath: "src/demos/blocks/auth/auth-change-password-demo.tsx",
	},
	"auth-email-change": {
		name: "auth-email-change",
		title: "Email Change",
		component: AuthEmailChangeDemo,
		componentSlug: "auth-email-change",
		sourcePath: "src/demos/blocks/auth/auth-email-change-demo.tsx",
	},
	"auth-forgot-password": {
		name: "auth-forgot-password",
		title: "Forgot Password",
		component: AuthForgotPasswordDemo,
		componentSlug: "auth-forgot-password",
		sourcePath: "src/demos/blocks/auth/auth-forgot-password-demo.tsx",
	},
	"auth-login-form": {
		name: "auth-login-form",
		title: "Login Form",
		component: AuthLoginFormDemo,
		componentSlug: "auth-login-form",
		sourcePath: "src/demos/blocks/auth/auth-login-form-demo.tsx",
	},
	"auth-magic-link": {
		name: "auth-magic-link",
		title: "Magic Link",
		component: AuthMagicLinkDemo,
		componentSlug: "auth-magic-link",
		sourcePath: "src/demos/blocks/auth/auth-magic-link-demo.tsx",
	},
	"auth-otp-verify": {
		name: "auth-otp-verify",
		title: "OTP Verify",
		component: AuthOtpVerifyDemo,
		componentSlug: "auth-otp-verify",
		sourcePath: "src/demos/blocks/auth/auth-otp-verify-demo.tsx",
	},
	"auth-phone-verify": {
		name: "auth-phone-verify",
		title: "Phone Verify",
		component: AuthPhoneVerifyDemo,
		componentSlug: "auth-phone-verify",
		sourcePath: "src/demos/blocks/auth/auth-phone-verify-demo.tsx",
	},
	"auth-recovery-codes": {
		name: "auth-recovery-codes",
		title: "Recovery Codes",
		component: AuthRecoveryCodesDemo,
		componentSlug: "auth-recovery-codes",
		sourcePath: "src/demos/blocks/auth/auth-recovery-codes-demo.tsx",
	},
	"auth-reset-password": {
		name: "auth-reset-password",
		title: "Reset Password",
		component: AuthResetPasswordDemo,
		componentSlug: "auth-reset-password",
		sourcePath: "src/demos/blocks/auth/auth-reset-password-demo.tsx",
	},
	"auth-session-manager": {
		name: "auth-session-manager",
		title: "Session Manager",
		component: AuthSessionManagerDemo,
		componentSlug: "auth-session-manager",
		sourcePath: "src/demos/blocks/auth/auth-session-manager-demo.tsx",
	},
	"auth-signup-form": {
		name: "auth-signup-form",
		title: "Signup Form",
		component: AuthSignupFormDemo,
		componentSlug: "auth-signup-form",
		sourcePath: "src/demos/blocks/auth/auth-signup-form-demo.tsx",
	},
	"auth-social-accounts": {
		name: "auth-social-accounts",
		title: "Social Accounts",
		component: AuthSocialAccountsDemo,
		componentSlug: "auth-social-accounts",
		sourcePath: "src/demos/blocks/auth/auth-social-accounts-demo.tsx",
	},
	"auth-two-factor-setup": {
		name: "auth-two-factor-setup",
		title: "Two-Factor Setup",
		component: AuthTwoFactorSetupDemo,
		componentSlug: "auth-two-factor-setup",
		sourcePath: "src/demos/blocks/auth/auth-two-factor-setup-demo.tsx",
	},
	"auth-two-factor-verify": {
		name: "auth-two-factor-verify",
		title: "Two-Factor Verify",
		component: AuthTwoFactorVerifyDemo,
		componentSlug: "auth-two-factor-verify",
		sourcePath: "src/demos/blocks/auth/auth-two-factor-verify-demo.tsx",
	},
	"auth-verify-email": {
		name: "auth-verify-email",
		title: "Verify Email",
		component: AuthVerifyEmailDemo,
		componentSlug: "auth-verify-email",
		sourcePath: "src/demos/blocks/auth/auth-verify-email-demo.tsx",
	},

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

	"settings-account": {
		name: "settings-account",
		title: "Account",
		component: SettingsAccountDemo,
		componentSlug: "settings-account",
		sourcePath: "src/demos/blocks/settings/settings-account-demo.tsx",
	},
	"settings-activity-log": {
		name: "settings-activity-log",
		title: "Activity Log",
		component: SettingsActivityLogDemo,
		componentSlug: "settings-activity-log",
		sourcePath: "src/demos/blocks/settings/settings-activity-log-demo.tsx",
	},
	"settings-advanced": {
		name: "settings-advanced",
		title: "Advanced",
		component: SettingsAdvancedDemo,
		componentSlug: "settings-advanced",
		sourcePath: "src/demos/blocks/settings/settings-advanced-demo.tsx",
	},
	"settings-api-keys": {
		name: "settings-api-keys",
		title: "Api Keys",
		component: SettingsApiKeysDemo,
		componentSlug: "settings-api-keys",
		sourcePath: "src/demos/blocks/settings/settings-api-keys-demo.tsx",
	},
	"settings-backup": {
		name: "settings-backup",
		title: "Backup",
		component: SettingsBackupDemo,
		componentSlug: "settings-backup",
		sourcePath: "src/demos/blocks/settings/settings-backup-demo.tsx",
	},
	"settings-domains": {
		name: "settings-domains",
		title: "Domains",
		component: SettingsDomainsDemo,
		componentSlug: "settings-domains",
		sourcePath: "src/demos/blocks/settings/settings-domains-demo.tsx",
	},
	"settings-export-data": {
		name: "settings-export-data",
		title: "Export Data",
		component: SettingsExportDataDemo,
		componentSlug: "settings-export-data",
		sourcePath: "src/demos/blocks/settings/settings-export-data-demo.tsx",
	},
	"settings-import-data": {
		name: "settings-import-data",
		title: "Import Data",
		component: SettingsImportDataDemo,
		componentSlug: "settings-import-data",
		sourcePath: "src/demos/blocks/settings/settings-import-data-demo.tsx",
	},
	"settings-integrations": {
		name: "settings-integrations",
		title: "Integrations",
		component: SettingsIntegrationsDemo,
		componentSlug: "settings-integrations",
		sourcePath: "src/demos/blocks/settings/settings-integrations-demo.tsx",
	},
	"settings-notifications": {
		name: "settings-notifications",
		title: "Notifications",
		component: SettingsNotificationsDemo,
		componentSlug: "settings-notifications",
		sourcePath: "src/demos/blocks/settings/settings-notifications-demo.tsx",
	},
	"settings-preferences": {
		name: "settings-preferences",
		title: "Preferences",
		component: SettingsPreferencesDemo,
		componentSlug: "settings-preferences",
		sourcePath: "src/demos/blocks/settings/settings-preferences-demo.tsx",
	},
	"settings-privacy": {
		name: "settings-privacy",
		title: "Privacy",
		component: SettingsPrivacyDemo,
		componentSlug: "settings-privacy",
		sourcePath: "src/demos/blocks/settings/settings-privacy-demo.tsx",
	},
	"settings-profile": {
		name: "settings-profile",
		title: "Profile",
		component: SettingsProfileDemo,
		componentSlug: "settings-profile",
		sourcePath: "src/demos/blocks/settings/settings-profile-demo.tsx",
	},
	"settings-security": {
		name: "settings-security",
		title: "Security",
		component: SettingsSecurityDemo,
		componentSlug: "settings-security",
		sourcePath: "src/demos/blocks/settings/settings-security-demo.tsx",
	},
	"settings-sso": {
		name: "settings-sso",
		title: "Sso",
		component: SettingsSsoDemo,
		componentSlug: "settings-sso",
		sourcePath: "src/demos/blocks/settings/settings-sso-demo.tsx",
	},
	"settings-storage": {
		name: "settings-storage",
		title: "Storage",
		component: SettingsStorageDemo,
		componentSlug: "settings-storage",
		sourcePath: "src/demos/blocks/settings/settings-storage-demo.tsx",
	},
	"settings-team-members": {
		name: "settings-team-members",
		title: "Team Members",
		component: SettingsTeamMembersDemo,
		componentSlug: "settings-team-members",
		sourcePath: "src/demos/blocks/settings/settings-team-members-demo.tsx",
	},
	"settings-webhooks": {
		name: "settings-webhooks",
		title: "Webhooks",
		component: SettingsWebhooksDemo,
		componentSlug: "settings-webhooks",
		sourcePath: "src/demos/blocks/settings/settings-webhooks-demo.tsx",
	},

	"project-list": {
		name: "project-list",
		title: "Project List",
		component: ProjectListDemo,
		componentSlug: "project-list",
		sourcePath: "src/demos/blocks/tasks/project-list-demo.tsx",
	},
	"task-board": {
		name: "task-board",
		title: "Task Board",
		component: TaskBoardDemo,
		componentSlug: "task-board",
		sourcePath: "src/demos/blocks/tasks/task-board-demo.tsx",
	},
	"task-create": {
		name: "task-create",
		title: "Task Create",
		component: TaskCreateDemo,
		componentSlug: "task-create",
		sourcePath: "src/demos/blocks/tasks/task-create-demo.tsx",
	},
	"task-detail": {
		name: "task-detail",
		title: "Task Detail",
		component: TaskDetailDemo,
		componentSlug: "task-detail",
		sourcePath: "src/demos/blocks/tasks/task-detail-demo.tsx",
	},
	"task-filters": {
		name: "task-filters",
		title: "Task Filters",
		component: TaskFiltersDemo,
		componentSlug: "task-filters",
		sourcePath: "src/demos/blocks/tasks/task-filters-demo.tsx",
	},
	"task-list": {
		name: "task-list",
		title: "Task List",
		component: TaskListDemo,
		componentSlug: "task-list",
		sourcePath: "src/demos/blocks/tasks/task-list-demo.tsx",
	},
	"task-progress": {
		name: "task-progress",
		title: "Task Progress",
		component: TaskProgressDemo,
		componentSlug: "task-progress",
		sourcePath: "src/demos/blocks/tasks/task-progress-demo.tsx",
	},

	"team-activity-feed": {
		name: "team-activity-feed",
		title: "Activity Feed",
		component: TeamActivityFeedDemo,
		componentSlug: "team-activity-feed",
		sourcePath: "src/demos/blocks/team/team-activity-feed-demo.tsx",
	},
	"team-analytics": {
		name: "team-analytics",
		title: "Analytics",
		component: TeamAnalyticsDemo,
		componentSlug: "team-analytics",
		sourcePath: "src/demos/blocks/team/team-analytics-demo.tsx",
	},
	"team-chat": {
		name: "team-chat",
		title: "Chat",
		component: TeamChatDemo,
		componentSlug: "team-chat",
		sourcePath: "src/demos/blocks/team/team-chat-demo.tsx",
	},
	"team-dashboard": {
		name: "team-dashboard",
		title: "Dashboard",
		component: TeamDashboardDemo,
		componentSlug: "team-dashboard",
		sourcePath: "src/demos/blocks/team/team-dashboard-demo.tsx",
	},
	"team-files": {
		name: "team-files",
		title: "Files",
		component: TeamFilesDemo,
		componentSlug: "team-files",
		sourcePath: "src/demos/blocks/team/team-files-demo.tsx",
	},
	"team-invitations": {
		name: "team-invitations",
		title: "Invitations",
		component: TeamInvitationsDemo,
		componentSlug: "team-invitations",
		sourcePath: "src/demos/blocks/team/team-invitations-demo.tsx",
	},
	"team-member-list": {
		name: "team-member-list",
		title: "Member List",
		component: TeamMemberListDemo,
		componentSlug: "team-member-list",
		sourcePath: "src/demos/blocks/team/team-member-list-demo.tsx",
	},
	"team-notes": {
		name: "team-notes",
		title: "Notes",
		component: TeamNotesDemo,
		componentSlug: "team-notes",
		sourcePath: "src/demos/blocks/team/team-notes-demo.tsx",
	},
	"team-notifications": {
		name: "team-notifications",
		title: "Notifications",
		component: TeamNotificationsDemo,
		componentSlug: "team-notifications",
		sourcePath: "src/demos/blocks/team/team-notifications-demo.tsx",
	},
	"team-permissions-matrix": {
		name: "team-permissions-matrix",
		title: "Permissions Matrix",
		component: TeamPermissionsMatrixDemo,
		componentSlug: "team-permissions-matrix",
		sourcePath: "src/demos/blocks/team/team-permissions-matrix-demo.tsx",
	},
	"team-projects": {
		name: "team-projects",
		title: "Projects",
		component: TeamProjectsDemo,
		componentSlug: "team-projects",
		sourcePath: "src/demos/blocks/team/team-projects-demo.tsx",
	},
	"team-prompt-library": {
		name: "team-prompt-library",
		title: "Prompt Library",
		component: TeamPromptLibraryDemo,
		componentSlug: "team-prompt-library",
		sourcePath: "src/demos/blocks/team/team-prompt-library-demo.tsx",
	},
	"team-settings": {
		name: "team-settings",
		title: "Settings",
		component: TeamSettingsDemo,
		componentSlug: "team-settings",
		sourcePath: "src/demos/blocks/team/team-settings-demo.tsx",
	},
	"team-switcher": {
		name: "team-switcher",
		title: "Switcher",
		component: TeamSwitcherDemo,
		componentSlug: "team-switcher",
		sourcePath: "src/demos/blocks/team/team-switcher-demo.tsx",
	},
}

export function getBlockDemo(slug: string): DemoEntry | undefined {
	return blockDemos[slug]
}
