export type BlockCategoryKey = "auth" | "billing" | "settings" | "tasks" | "team"

export type BlockCategory = {
	slug: BlockCategoryKey
	blockCount: number
}

export type BlockEntry = {
	slug: string
	name: string
	description: string
}

export const blockCategories: readonly BlockCategory[] = [
	{ slug: "auth", blockCount: 16 },
	{ slug: "billing", blockCount: 15 },
	{ slug: "settings", blockCount: 18 },
	{ slug: "tasks", blockCount: 7 },
	{ slug: "team", blockCount: 14 },
]

export const blockEntries: Record<BlockCategoryKey, readonly BlockEntry[]> = {
	auth: [
		{ slug: "auth-account-delete", name: "Account Delete", description: "A confirmation flow to permanently delete an account with a typed confirmation step." },
		{ slug: "auth-change-password", name: "Change Password", description: "A form to update an existing password with current-password verification and a strength indicator." },
		{ slug: "auth-email-change", name: "Email Change", description: "A form to change the account email with a verification step sent to the new address." },
		{ slug: "auth-forgot-password", name: "Forgot Password", description: "A form to request a password-reset link, with a success state and back-to-sign-in action." },
		{ slug: "auth-login-form", name: "Login Form", description: "A sign-in form with social providers, remember-me, show-password, and validation." },
		{ slug: "auth-magic-link", name: "Magic Link", description: "A passwordless sign-in form that emails a magic link with resend cooldown and status states." },
		{ slug: "auth-otp-verify", name: "OTP Verify", description: "A verification form that accepts a one-time code with delivery-method selection and resend." },
		{ slug: "auth-phone-verify", name: "Phone Verify", description: "A multi-step phone verification flow with country selector and SMS OTP entry." },
		{ slug: "auth-recovery-codes", name: "Recovery Codes", description: "A list of backup recovery codes with reveal, copy, download, and regeneration actions." },
		{ slug: "auth-reset-password", name: "Reset Password", description: "A form to set a new password with a strength meter and token validation states." },
		{ slug: "auth-session-manager", name: "Session Manager", description: "A list of active sessions with device icons, current-session badge, and revocation flow." },
		{ slug: "auth-signup-form", name: "Signup Form", description: "A registration form with name, email, password confirmation, terms, and social providers." },
		{ slug: "auth-social-accounts", name: "Social Accounts", description: "A management view for connected social providers with connect/disconnect actions." },
		{ slug: "auth-two-factor-setup", name: "Two-Factor Setup", description: "A setup flow for two-factor auth with QR code, secret key, and backup codes." },
		{ slug: "auth-two-factor-verify", name: "Two-Factor Verify", description: "A verification entry point for 2FA codes with recovery-code fallback." },
		{ slug: "auth-verify-email", name: "Verify Email", description: "A status-driven email verification view with resend and verification states." },
	],
	billing: [
		{ slug: "billing-billing-history", name: "History", description: "A transaction history list showing payments, dates, amounts, and statuses." },
		{ slug: "billing-coupon-code", name: "Coupon Code", description: "An input form to apply a coupon or discount code to a subscription." },
		{ slug: "billing-invoice-details", name: "Invoice Details", description: "An invoice summary with line items, totals, and download action." },
		{ slug: "billing-invoice-list", name: "Invoice List", description: "A table of past invoices with status, date, and amount columns." },
		{ slug: "billing-payment-failed", name: "Payment Failed", description: "A status view shown when a payment fails, with retry and update options." },
		{ slug: "billing-payment-form", name: "Payment Form", description: "A payment form with card details, billing address, and save toggle." },
		{ slug: "billing-payment-method", name: "Payment Method", description: "A list of saved payment methods with set-default and remove actions." },
		{ slug: "billing-payment-schedule", name: "Payment Schedule", description: "A schedule of upcoming payments with dates and expected charges." },
		{ slug: "billing-plan-selector", name: "Plan Selector", description: "A comparison of subscription plans with feature rows and select action." },
		{ slug: "billing-pricing-table", name: "Pricing Table", description: "A pricing table with feature comparison and plan selection." },
		{ slug: "billing-subscription-card", name: "Subscription Card", description: "A card summarizing an active subscription, renewal date, and actions." },
		{ slug: "billing-subscription-settings", name: "Subscription Settings", description: "Settings for managing subscription renewal, cancellation, and billing cycle." },
		{ slug: "billing-upgrade-prompt", name: "Upgrade Prompt", description: "A prompt encouraging the user to upgrade their plan with benefits and CTA." },
		{ slug: "billing-usage-alerts", name: "Usage Alerts", description: "Usage-based alert thresholds with set limits and notification toggles." },
		{ slug: "billing-usage-billing", name: "Usage Billing", description: "Current usage metrics with a progress bar and billing cycle overview." },
	],
	settings: [
		{ slug: "settings-account", name: "Account", description: "Account-level settings with profile, email, and account actions." },
		{ slug: "settings-activity-log", name: "Activity Log", description: "A log of recent account activity with timestamps and descriptions." },
		{ slug: "settings-advanced", name: "Advanced", description: "Advanced settings for developer or expert-level configuration." },
		{ slug: "settings-api-keys", name: "Api Keys", description: "A management view for API keys with create, revoke, and permission scopes." },
		{ slug: "settings-backup", name: "Backup", description: "Backup settings with schedule, storage, and last backup status." },
		{ slug: "settings-domains", name: "Domains", description: "A list of connected domains with verification status and DNS records." },
		{ slug: "settings-export-data", name: "Export Data", description: "An export tool for downloading user data in various formats." },
		{ slug: "settings-import-data", name: "Import Data", description: "An import tool for uploading data from external sources." },
		{ slug: "settings-integrations", name: "Integrations", description: "Connected third-party integrations with enable/disable toggles." },
		{ slug: "settings-notifications", name: "Notifications", description: "Notification preference toggles for email, push, and in-app alerts." },
		{ slug: "settings-preferences", name: "Preferences", description: "General preferences for language, timezone, and display density." },
		{ slug: "settings-privacy", name: "Privacy", description: "Privacy controls for data visibility, sharing, and account deletion." },
		{ slug: "settings-profile", name: "Profile", description: "Profile editor with avatar, name, bio, and social links." },
		{ slug: "settings-security", name: "Security", description: "Security settings with 2FA, session management, and password." },
		{ slug: "settings-sso", name: "Sso", description: "Single sign-on configuration with provider setup and mapping." },
		{ slug: "settings-storage", name: "Storage", description: "Storage usage overview with file breakdown and cleanup options." },
		{ slug: "settings-team-members", name: "Team Members", description: "Team member management with roles, invites, and permissions." },
		{ slug: "settings-webhooks", name: "Webhooks", description: "Outgoing webhook endpoints with event filters and delivery logs." },
	],
	tasks: [
		{ slug: "project-list", name: "Project List", description: "A list of projects with status, progress, and member avatars." },
		{ slug: "task-board", name: "Task Board", description: "A Kanban board with draggable columns and cards." },
		{ slug: "task-create", name: "Task Create", description: "A form to create a new task with title, description, and assignee." },
		{ slug: "task-detail", name: "Task Detail", description: "A detailed task view with tabs for comments, attachments, and activity." },
		{ slug: "task-filters", name: "Task Filters", description: "Filter controls for task status, priority, assignee, and search." },
		{ slug: "task-list", name: "Task List", description: "A filterable, paginated table of tasks with bulk actions." },
		{ slug: "task-progress", name: "Task Progress", description: "Progress indicators for project and task completion levels." },
	],
	team: [
		{ slug: "team-activity-feed", name: "Activity Feed", description: "An activity feed showing member actions and updates across the team." },
		{ slug: "team-analytics", name: "Analytics", description: "Analytics dashboard with charts for team performance and usage." },
		{ slug: "team-chat", name: "Chat", description: "A real-time chat interface with message threads and file sharing." },
		{ slug: "team-dashboard", name: "Dashboard", description: "A team dashboard with key metrics, recent activity, and quick actions." },
		{ slug: "team-files", name: "Files", description: "A file browser for team documents with sharing and permission controls." },
		{ slug: "team-invitations", name: "Invitations", description: "A list of pending invitations with accept/decline and resend actions." },
		{ slug: "team-member-list", name: "Member List", description: "A member directory with roles, status, and action menu per member." },
		{ slug: "team-notes", name: "Notes", description: "A shared notes editor with markdown support and member collaboration." },
		{ slug: "team-notifications", name: "Notifications", description: "Team notification settings with channel-specific toggles." },
		{ slug: "team-permissions-matrix", name: "Permissions Matrix", description: "A matrix view for configuring role-based permissions." },
		{ slug: "team-projects", name: "Projects", description: "A list of projects with owners, members, status, and action menu." },
		{ slug: "team-prompt-library", name: "Prompt Library", description: "A library of reusable prompts with categories and favorite toggles." },
		{ slug: "team-settings", name: "Settings", description: "Team settings for name, description, icon, and membership policies." },
		{ slug: "team-switcher", name: "Switcher", description: "A command menu to search and switch between teams." },
	],
}

export function getBlockCategory(slug: string): BlockCategory | undefined {
	return blockCategories.find((category) => category.slug === slug)
}
