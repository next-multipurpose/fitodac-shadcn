"use client"

import type { ComponentProps } from "react"
import AuthSignupForm from "@/registry/blocks/auth/auth-signup-form"

export function AuthSignupFormDemo() {
	const exampleProps = (() => {
		return {
			onSubmit: (data: {
				name: string
				email: string
				password: string
				confirmPassword: string
				acceptTerms: boolean
			}) => {
				/* signup logic */
			},
			onSocialLogin: (provider: string) => {
				/* signup with provider */
			},
			showSocialLogin: true,
		}
	})()

	return (
		<AuthSignupForm
			{...(exampleProps as unknown as ComponentProps<typeof AuthSignupForm>)}
		/>
	)
}
