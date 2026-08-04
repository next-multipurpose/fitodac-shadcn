"use client"

import type { ComponentProps } from "react"
import AuthVerifyEmail from "@/registry/blocks/auth/auth-verify-email"

export function AuthVerifyEmailDemo() {
	const exampleProps = (() => {
		return {
			email: "user@example.com",
			status: "pending" as const,
			onResend: () => {
				/* resend email */
			},
			onVerify: (token: string) => {
				/* verify email link */
			},
		}
	})()

	return (
		<AuthVerifyEmail
			{...(exampleProps as unknown as ComponentProps<typeof AuthVerifyEmail>)}
		/>
	)
}
