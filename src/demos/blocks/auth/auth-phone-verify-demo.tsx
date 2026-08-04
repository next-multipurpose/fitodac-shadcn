"use client"

import type { ComponentProps } from "react"
import AuthPhoneVerify from "@/registry/blocks/auth/auth-phone-verify"

export function AuthPhoneVerifyDemo() {
	const exampleProps = (() => {
		return {
			phoneNumber: "+1234567890",
			countryCode: "US",
			onPhoneSubmit: (phoneNumber: string, countryCode: string) => {
				/* submit phone number */
			},
			onOTPSubmit: (code: string) => {
				/* verify sms */
			},
			onResend: () => {
				/* resend sms */
			},
			status: "pending" as const,
		}
	})()

	return (
		<AuthPhoneVerify
			{...(exampleProps as unknown as ComponentProps<typeof AuthPhoneVerify>)}
		/>
	)
}
