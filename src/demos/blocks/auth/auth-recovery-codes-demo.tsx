"use client"

import type { ComponentProps } from "react"
import AuthRecoveryCodes from "@/registry/blocks/auth/auth-recovery-codes"

export function AuthRecoveryCodesDemo() {
	const exampleProps = (() => {
		return {
			codes: [
				"173839",
				"572048",
				"208453",
				"983242",
				"567890",
				"450281",
				"143892",
			],
			onGenerate: () => {
				/* generate codes */
			},
			onRegenerate: () => {
				/* regenerate codes */
			},
		}
	})()

	return (
		<AuthRecoveryCodes
			{...(exampleProps as unknown as ComponentProps<typeof AuthRecoveryCodes>)}
		/>
	)
}
