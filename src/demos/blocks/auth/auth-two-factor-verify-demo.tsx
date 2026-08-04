"use client"

import type { ComponentProps } from "react"
import AuthTwoFactorVerify from "@/registry/blocks/auth/auth-two-factor-verify"

export function AuthTwoFactorVerifyDemo() {
	const exampleProps = (() => {
		return {
			onSubmit: (code: string) => {
				/* verify two-factor code */
			},
			onRecoveryCode: (code: string) => {
				/* verify recovery code */
			},
			onResend: () => {
				/* resend code */
			},
		}
	})()

	return (
		<AuthTwoFactorVerify
			{...(exampleProps as unknown as ComponentProps<
				typeof AuthTwoFactorVerify
			>)}
		/>
	)
}
