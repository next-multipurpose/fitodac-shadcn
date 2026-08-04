"use client"

import type { ComponentProps } from "react"
import AuthChangePassword from "@/registry/blocks/auth/auth-change-password"

export function AuthChangePasswordDemo() {
	const exampleProps = (() => {
		return {
			onSubmit: (data: { currentPassword: string; newPassword: string }) => {
				/* change password */
			},
		}
	})()

	return (
		<AuthChangePassword
			{...(exampleProps as unknown as ComponentProps<
				typeof AuthChangePassword
			>)}
		/>
	)
}
