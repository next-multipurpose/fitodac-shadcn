"use client"

import type { ComponentProps } from "react"
import SettingsDomains from "@/registry/blocks/settings/settings-domains"

export function SettingsDomainsDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			domains: [
				{
					id: "domain-1",
					domain: "example.com",
					status: "verified" as const,
					sslEnabled: true,
					verifiedAt: new Date(now - 30 * 24 * 60 * 60 * 1000), // 30 days ago
				},
				{
					id: "domain-2",
					domain: "app.example.com",
					status: "pending" as const,
					sslEnabled: false,
					dnsRecords: [
						{
							type: "CNAME",
							name: "app",
							value: "example.vercel.app",
						},
					],
				},
				{
					id: "domain-3",
					domain: "api.example.com",
					status: "verified" as const,
					sslEnabled: true,
					verifiedAt: new Date(now - 15 * 24 * 60 * 60 * 1000), // 15 days ago
				},
				{
					id: "domain-4",
					domain: "staging.example.com",
					status: "failed" as const,
					sslEnabled: false,
					dnsRecords: [
						{
							type: "CNAME",
							name: "staging",
							value: "staging.vercel.app",
						},
					],
				},
				{
					id: "domain-5",
					domain: "www.example.com",
					status: "pending" as const,
					sslEnabled: false,
					dnsRecords: [
						{
							type: "CNAME",
							name: "www",
							value: "example.vercel.app",
						},
						{
							type: "A",
							name: "@",
							value: "192.0.2.1",
						},
					],
				},
			],
			onCreate: async (domain: string) => {
				/* create domain */
				return {
					id: `domain-${now}`,
					domain,
					status: "pending" as const,
					sslEnabled: false,
					dnsRecords: [
						{
							type: "CNAME",
							name: domain.split(".")[0] || "@",
							value: "example.vercel.app",
						},
					],
				}
			},
			onDelete: async (id: string) => {
				/* delete domain */
			},
			onVerify: async (id: string) => {
				/* verify domain */
			},
			onToggleSSL: async (id: string) => {
				/* toggle SSL */
			},
		}
	})()

	return (
		<SettingsDomains
			{...(exampleProps as unknown as ComponentProps<typeof SettingsDomains>)}
		/>
	)
}
