"use client"

import type { ComponentProps } from "react"
import AuthLoginForm from "@/registry/blocks/auth/auth-login-form"

export function AuthLoginFormDemo() {
	const exampleProps = (() => {
		return {
			onSubmit: (data: {
				email: string
				password: string
				rememberMe: boolean
			}) => {
				/* demo login */
			},
			onSocialLogin: (provider: string) => {
				/* social login */
			},
			showRememberMe: true,
			showSocialLogin: true,
		}
	})()

	return (
		<AuthLoginForm
			{...(exampleProps as unknown as ComponentProps<typeof AuthLoginForm>)}
		/>
	)
}
