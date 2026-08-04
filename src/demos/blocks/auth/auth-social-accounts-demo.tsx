"use client"

import type { ComponentProps } from "react"
import AuthSocialAccounts from "@/registry/blocks/auth/auth-social-accounts"

export function AuthSocialAccountsDemo() {
	const exampleProps = (() => {
		return {
			accounts: [
				{
					provider: "google",
					isConnected: true,
					email: "john.doe@gmail.com",
					isPrimary: true,
				},
				{
					provider: "github",
					isConnected: false,
				},
			],
			onConnect: (provider: "google" | "github" | "apple" | "microsoft") => {
				/* connect social provider */
			},
			onDisconnect: (provider: "google" | "github" | "apple" | "microsoft") => {
				/* disconnect provider */
			},
			onSetPrimary: (provider: "google" | "github" | "apple" | "microsoft") => {
				/* set primary provider */
			},
		}
	})()

	return (
		<AuthSocialAccounts
			{...(exampleProps as unknown as ComponentProps<
				typeof AuthSocialAccounts
			>)}
		/>
	)
}
