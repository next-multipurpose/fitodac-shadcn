"use client"

import type { ComponentProps } from "react"
import AuthMagicLink from "@/registry/blocks/auth/auth-magic-link"

export function AuthMagicLinkDemo() {
	const exampleProps = (() => {
		return {
			onSubmit: (email: string) => {
				/* send magic link */
			},
			onResend: (email: string) => {
				/* resend magic link */
			},
			status: "pending" as const,
		}
	})()

	return (
		<AuthMagicLink
			{...(exampleProps as unknown as ComponentProps<typeof AuthMagicLink>)}
		/>
	)
}
