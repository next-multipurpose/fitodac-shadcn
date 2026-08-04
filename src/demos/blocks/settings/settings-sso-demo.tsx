"use client"

import type { ComponentProps } from "react"
import SettingsSSO from "@/registry/blocks/settings/settings-sso"

export function SettingsSsoDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			enabled: true,
			providers: [
				{
					id: "sso-1",
					name: "Okta",
					type: "saml" as const,
					enabled: true,
					status: "active" as const,
					metadataUrl: "https://example.okta.com/saml/metadata",
					entityId: "https://example.okta.com/app/example",
					ssoUrl: "https://example.okta.com/app/example/sso/saml",
					lastTested: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
					userCount: 45,
				},
				{
					id: "sso-2",
					name: "Azure AD",
					type: "oidc" as const,
					enabled: false,
					status: "pending" as const,
					metadataUrl:
						"https://login.microsoftonline.com/tenant-id/v2.0/.well-known/openid-configuration",
					lastTested: new Date(now - 14 * 24 * 60 * 60 * 1000), // 14 days ago
				},
				{
					id: "sso-3",
					name: "Google Workspace",
					type: "saml" as const,
					enabled: true,
					status: "active" as const,
					metadataUrl: "https://accounts.google.com/.well-known/saml-metadata",
					entityId: "https://accounts.google.com/o/saml2?idpid=example",
					ssoUrl: "https://accounts.google.com/o/saml2/idp?idpid=example",
					lastTested: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
					userCount: 128,
				},
				{
					id: "sso-4",
					name: "Auth0",
					type: "oidc" as const,
					enabled: true,
					status: "error" as const,
					metadataUrl:
						"https://example.auth0.com/.well-known/openid-configuration",
					lastTested: new Date(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
					userCount: 23,
				},
				{
					id: "sso-5",
					name: "OneLogin",
					type: "saml" as const,
					enabled: false,
					status: "pending" as const,
					metadataUrl: "https://app.onelogin.com/saml/metadata/example",
					entityId: "https://app.onelogin.com/saml/metadata/example",
					ssoUrl: "https://app.onelogin.com/trust/saml2/http-post/sso/example",
				},
			],
			onCreate: async (data: {
				name: string
				type: "saml" | "oauth" | "oidc"
				metadataUrl?: string
				entityId?: string
				ssoUrl?: string
				certificate?: string
			}) => {
				/* create SSO provider */
				return {
					id: `sso-${now}`,
					name: data.name,
					type: data.type,
					enabled: false,
					status: "pending" as const,
					metadataUrl: data.metadataUrl,
					entityId: data.entityId,
					ssoUrl: data.ssoUrl,
					certificate: data.certificate,
				}
			},
			onUpdate: async (
				id: string,
				data: Partial<{
					name: string
					type: "saml" | "oauth" | "oidc"
					enabled: boolean
					status: "active" | "error" | "pending"
					metadataUrl?: string
					entityId?: string
					ssoUrl?: string
					certificate?: string
				}>
			) => {
				/* update SSO provider */
			},
			onDelete: async (id: string) => {
				/* delete SSO provider */
			},
			onTest: async (id: string) => {
				/* test SSO connection */
			},
			onToggle: async (enabled: boolean) => {
				/* toggle SSO globally */
			},
		}
	})()

	return (
		<SettingsSSO
			{...(exampleProps as unknown as ComponentProps<typeof SettingsSSO>)}
		/>
	)
}
