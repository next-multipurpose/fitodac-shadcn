"use client"

import type { ComponentProps } from "react"
import SettingsNotifications from "@/registry/blocks/settings/settings-notifications"

export function SettingsNotificationsDemo() {
	const exampleProps = (() => {
		return {
			preferences: {
				categories: [
					{
						id: "mentions",
						name: "Mentions",
						description: "When someone mentions you",
						channels: { email: true, push: true, inApp: true, sms: false },
						frequency: "realtime" as const,
					},
					{
						id: "replies",
						name: "Replies",
						description: "When someone replies to your messages",
						channels: { email: true, push: true, inApp: true, sms: false },
						frequency: "realtime" as const,
					},
					{
						id: "system",
						name: "System Alerts",
						description: "Important system notifications",
						channels: { email: true, push: true, inApp: true, sms: true },
						frequency: "realtime" as const,
					},
					{
						id: "marketing",
						name: "Marketing",
						description: "Promotional emails and updates",
						channels: { email: true, push: false, inApp: false, sms: false },
						frequency: "digest-weekly" as const,
					},
					{
						id: "security",
						name: "Security",
						description: "Security alerts and login notifications",
						channels: { email: true, push: true, inApp: true, sms: true },
						frequency: "realtime" as const,
					},
					{
						id: "product-updates",
						name: "Product Updates",
						description: "New features and product announcements",
						channels: { email: true, push: false, inApp: true, sms: false },
						frequency: "digest-daily" as const,
					},
				],
				quietHoursEnabled: true,
				quietHoursStart: "22:00",
				quietHoursEnd: "08:00",
			},
			onSave: async (data: {
				categories: Array<{
					id: string
					name: string
					description: string
					channels: {
						email: boolean
						push: boolean
						inApp: boolean
						sms: boolean
					}
					frequency?: "realtime" | "digest-daily" | "digest-weekly" | "off"
				}>
				quietHoursEnabled: boolean
				quietHoursStart?: string
				quietHoursEnd?: string
			}) => {
				/* save notification preferences */
			},
		}
	})()

	return (
		<SettingsNotifications
			{...(exampleProps as unknown as ComponentProps<
				typeof SettingsNotifications
			>)}
		/>
	)
}
