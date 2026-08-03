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
import AuthOTPVerify from "@/registry/blocks/auth/auth-otp-verify"
import AuthPhoneVerify from "@/registry/blocks/auth/auth-phone-verify"
import AuthRecoveryCodes from "@/registry/blocks/auth/auth-recovery-codes"
import AuthResetPassword from "@/registry/blocks/auth/auth-reset-password"
import AuthSessionManager from "@/registry/blocks/auth/auth-session-manager"
import AuthSignupForm from "@/registry/blocks/auth/auth-signup-form"
import AuthSocialAccounts from "@/registry/blocks/auth/auth-social-accounts"
import AuthTwoFactorSetup from "@/registry/blocks/auth/auth-two-factor-setup"
import AuthTwoFactorVerify from "@/registry/blocks/auth/auth-two-factor-verify"
import AuthVerifyEmail from "@/registry/blocks/auth/auth-verify-email"

type PageProps = {
	params: Promise<{ slug: string }>
}

const blockComponents: Record<string, React.ComponentType> = {
	"auth-account-delete": AuthAccountDelete,
	"auth-change-password": AuthChangePassword,
	"auth-email-change": AuthEmailChange,
	"auth-forgot-password": AuthForgotPassword,
	"auth-login-form": AuthLoginForm,
	"auth-magic-link": AuthMagicLink,
	"auth-otp-verify": AuthOTPVerify,
	"auth-phone-verify": AuthPhoneVerify,
	"auth-recovery-codes": AuthRecoveryCodes,
	"auth-reset-password": AuthResetPassword,
	"auth-session-manager": AuthSessionManager,
	"auth-signup-form": AuthSignupForm,
	"auth-social-accounts": AuthSocialAccounts,
	"auth-two-factor-setup": AuthTwoFactorSetup,
	"auth-two-factor-verify": AuthTwoFactorVerify,
	"auth-verify-email": AuthVerifyEmail,
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
