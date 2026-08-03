export type BlockCategoryKey = "auth"

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
]

export const blockEntries: Record<BlockCategoryKey, readonly BlockEntry[]> = {
	auth: [
		{
			slug: "auth-account-delete",
			name: "Account Delete",
			description:
				"A confirmation flow to permanently delete an account with a typed confirmation step.",
		},
		{
			slug: "auth-change-password",
			name: "Change Password",
			description:
				"A form to update an existing password with current-password verification and a strength indicator.",
		},
		{
			slug: "auth-email-change",
			name: "Email Change",
			description:
				"A form to change the account email with a verification step sent to the new address.",
		},
		{
			slug: "auth-forgot-password",
			name: "Forgot Password",
			description:
				"A form to request a password-reset link, with a success state and back-to-sign-in action.",
		},
		{
			slug: "auth-login-form",
			name: "Login Form",
			description:
				"A sign-in form with social providers, remember-me, show-password, and validation.",
		},
		{
			slug: "auth-magic-link",
			name: "Magic Link",
			description:
				"A passwordless sign-in form that emails a magic link with resend cooldown and status states.",
		},
		{
			slug: "auth-otp-verify",
			name: "OTP Verify",
			description:
				"A verification form that accepts a one-time code with delivery-method selection and resend.",
		},
		{
			slug: "auth-phone-verify",
			name: "Phone Verify",
			description:
				"A multi-step phone verification flow with country selector and SMS OTP entry.",
		},
		{
			slug: "auth-recovery-codes",
			name: "Recovery Codes",
			description:
				"A list of backup recovery codes with reveal, copy, download, and regeneration actions.",
		},
		{
			slug: "auth-reset-password",
			name: "Reset Password",
			description:
				"A form to set a new password with a strength meter and token validation states.",
		},
		{
			slug: "auth-session-manager",
			name: "Session Manager",
			description:
				"A list of active sessions with device icons, current-session badge, and revocation flow.",
		},
		{
			slug: "auth-signup-form",
			name: "Signup Form",
			description:
				"A registration form with name, email, password confirmation, terms, and social providers.",
		},
		{
			slug: "auth-social-accounts",
			name: "Social Accounts",
			description:
				"A management view for connected social providers with connect/disconnect actions.",
		},
		{
			slug: "auth-two-factor-setup",
			name: "Two-Factor Setup",
			description:
				"A setup flow for two-factor auth with QR code, secret key, and backup codes.",
		},
		{
			slug: "auth-two-factor-verify",
			name: "Two-Factor Verify",
			description:
				"A verification entry point for 2FA codes with recovery-code fallback.",
		},
		{
			slug: "auth-verify-email",
			name: "Verify Email",
			description:
				"A status-driven email verification view with resend and verification states.",
		},
	],
}

export function getBlockCategory(slug: string): BlockCategory | undefined {
	return blockCategories.find((category) => category.slug === slug)
}
