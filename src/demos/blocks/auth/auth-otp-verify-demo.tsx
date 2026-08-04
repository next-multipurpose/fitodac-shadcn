"use client"

import type { ComponentProps } from "react"
import AuthOTPVerify from "@/registry/blocks/auth/auth-otp-verify"

export function AuthOtpVerifyDemo() {
	const exampleProps = (() => {
		return {
			deliveryMethod: "email" as const,
			deliveryAddress: "user@example.com",
			onSubmit: (code: string) => {
				/* verify otp */
			},
			onResend: (method: "email" | "sms" | "whatsapp") => {
				/* resend code */
			},
		}
	})()

	return (
		<AuthOTPVerify
			{...(exampleProps as unknown as ComponentProps<typeof AuthOTPVerify>)}
		/>
	)
}
