"use client"

import type { ComponentProps } from "react"
import AuthEmailChange from "@/registry/blocks/auth/auth-email-change"

export function AuthEmailChangeDemo() {
	const exampleProps = (() => {
		return {
			currentEmail: "user@example.com",
			onSubmit: (data: { newEmail: string; password: string }) => {
				/* change email */
			},
		}
	})()

	return (
		<AuthEmailChange
			{...(exampleProps as unknown as ComponentProps<typeof AuthEmailChange>)}
		/>
	)
}
