"use client"

import type { ComponentProps } from "react"
import AuthForgotPassword from "@/registry/blocks/auth/auth-forgot-password"

export function AuthForgotPasswordDemo() {
	const exampleProps = (() => {
		return {
			onSubmit: (email: string) => {
				/* send reset link */
			},
			onBack: () => {
				/* nav back to login */
			},
		}
	})()

	return (
		<AuthForgotPassword
			{...(exampleProps as unknown as ComponentProps<
				typeof AuthForgotPassword
			>)}
		/>
	)
}
