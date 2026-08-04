"use client"

import type { ComponentProps } from "react"
import AuthTwoFactorSetup from "@/registry/blocks/auth/auth-two-factor-setup"

export function AuthTwoFactorSetupDemo() {
	const exampleProps = (() => {
		return {
			isEnabled: false,
			qrCodeUrl: "/static/2fa-qr.png",
			secretKey: "JFVHK324HKJS",
			backupCodes: ["173839", "572048", "208453", "983242"],
			onEnable: () => {
				/* enable 2FA */
			},
			onDisable: (password: string) => {
				/* disable 2FA */
			},
			onGenerateBackupCodes: () => {
				/* generate backup codes */
			},
			onRegenerateSecret: () => {
				/* regenerate secret */
			},
		}
	})()

	return (
		<AuthTwoFactorSetup
			{...(exampleProps as unknown as ComponentProps<
				typeof AuthTwoFactorSetup
			>)}
		/>
	)
}
