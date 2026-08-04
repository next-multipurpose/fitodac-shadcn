"use client"

import type { ComponentProps } from "react"
import AuthAccountDelete from "@/registry/blocks/auth/auth-account-delete"

export function AuthAccountDeleteDemo() {
	const exampleProps = (() => {
		return {
			onDelete: async () => {
				/* delete user account */
			},
			confirmText: "DELETE",
			info: "This action cannot be undone. All your data will be erased.",
		}
	})()

	return (
		<AuthAccountDelete
			{...(exampleProps as unknown as ComponentProps<typeof AuthAccountDelete>)}
		/>
	)
}
