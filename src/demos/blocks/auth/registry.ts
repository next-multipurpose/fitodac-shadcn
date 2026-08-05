import type { DemoEntry } from "@/demos/types"

import { AuthAccountDeleteDemo } from "./auth-account-delete-demo"
import { AuthChangePasswordDemo } from "./auth-change-password-demo"
import { AuthEmailChangeDemo } from "./auth-email-change-demo"
import { AuthForgotPasswordDemo } from "./auth-forgot-password-demo"
import { AuthLoginFormDemo } from "./auth-login-form-demo"
import { AuthMagicLinkDemo } from "./auth-magic-link-demo"
import { AuthOtpVerifyDemo } from "./auth-otp-verify-demo"
import { AuthPhoneVerifyDemo } from "./auth-phone-verify-demo"
import { AuthRecoveryCodesDemo } from "./auth-recovery-codes-demo"
import { AuthResetPasswordDemo } from "./auth-reset-password-demo"
import { AuthSessionManagerDemo } from "./auth-session-manager-demo"
import { AuthSignupFormDemo } from "./auth-signup-form-demo"
import { AuthSocialAccountsDemo } from "./auth-social-accounts-demo"
import { AuthTwoFactorSetupDemo } from "./auth-two-factor-setup-demo"
import { AuthTwoFactorVerifyDemo } from "./auth-two-factor-verify-demo"
import { AuthVerifyEmailDemo } from "./auth-verify-email-demo"

export const authDemos: Record<string, DemoEntry> = {
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
}
