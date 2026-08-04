"use client"

import type { ComponentProps } from "react"
import AuthResetPassword from "@/registry/blocks/auth/auth-reset-password"

export function AuthResetPasswordDemo() {
	const exampleProps = (() => {
		return {
			onSubmit: (data: { password: string; token: string }) => {
				/* reset password logic */
			},
			token: "example-token-sent-via-email",
			onTokenValidate: async (token: string) => {
				/* validate token */
				return true
			},
		}
	})()

	return (
		<AuthResetPassword
			{...(exampleProps as unknown as ComponentProps<typeof AuthResetPassword>)}
		/>
	)
}
