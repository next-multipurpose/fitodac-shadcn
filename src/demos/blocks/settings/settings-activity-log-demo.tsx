"use client"

import type { ComponentProps } from "react"
import SettingsActivityLog from "@/registry/blocks/settings/settings-activity-log"

export function SettingsActivityLogDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			entries: [
				{
					id: "log-1",
					action: "login",
					type: "login" as const,
					description: "User logged in",
					ipAddress: "192.168.1.1",
					location: "San Francisco, CA",
					device: "MacBook Pro",
					timestamp: new Date(now - 5 * 60 * 1000), // 5 minutes ago
					status: "success" as const,
				},
				{
					id: "log-2",
					action: "profile_update",
					type: "profile_update" as const,
					description: "Profile information updated",
					ipAddress: "192.168.1.1",
					location: "San Francisco, CA",
					device: "MacBook Pro",
					timestamp: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
					status: "success" as const,
				},
				{
					id: "log-3",
					action: "password_change",
					type: "password_change" as const,
					description: "Password changed",
					ipAddress: "192.168.1.1",
					location: "San Francisco, CA",
					device: "MacBook Pro",
					timestamp: new Date(now - 6 * 60 * 60 * 1000), // 6 hours ago
					status: "success" as const,
				},
				{
					id: "log-4",
					action: "settings_change",
					type: "settings_change" as const,
					description: "Notification preferences updated",
					ipAddress: "192.168.1.1",
					location: "San Francisco, CA",
					device: "MacBook Pro",
					timestamp: new Date(now - 12 * 60 * 60 * 1000), // 12 hours ago
					status: "success" as const,
				},
				{
					id: "log-5",
					action: "export",
					type: "export" as const,
					description: "Data exported",
					ipAddress: "192.168.1.1",
					location: "San Francisco, CA",
					device: "MacBook Pro",
					timestamp: new Date(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
					status: "success" as const,
				},
				{
					id: "log-6",
					action: "create",
					type: "create" as const,
					description: "API key created",
					ipAddress: "192.168.1.1",
					location: "San Francisco, CA",
					device: "MacBook Pro",
					timestamp: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
					status: "success" as const,
				},
				{
					id: "log-7",
					action: "login",
					type: "login" as const,
					description: "Failed login attempt",
					ipAddress: "203.0.113.45",
					location: "New York, NY",
					device: "iPhone 15",
					timestamp: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
					status: "failed" as const,
				},
				{
					id: "log-8",
					action: "logout",
					type: "logout" as const,
					description: "User logged out",
					ipAddress: "192.168.1.1",
					location: "San Francisco, CA",
					device: "MacBook Pro",
					timestamp: new Date(now - 4 * 24 * 60 * 60 * 1000), // 4 days ago
					status: "success" as const,
				},
				{
					id: "log-9",
					action: "update",
					type: "update" as const,
					description: "Billing information updated",
					ipAddress: "192.168.1.1",
					location: "San Francisco, CA",
					device: "MacBook Pro",
					timestamp: new Date(now - 5 * 24 * 60 * 60 * 1000), // 5 days ago
					status: "success" as const,
				},
				{
					id: "log-10",
					action: "delete",
					type: "delete" as const,
					description: "API key deleted",
					ipAddress: "192.168.1.1",
					location: "San Francisco, CA",
					device: "MacBook Pro",
					timestamp: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
					status: "success" as const,
				},
			],
			onExport: async (filters: {
				dateRange?: { start: Date; end: Date }
				type?: string
				search?: string
			}) => {
				/* export activity log */
			},
		}
	})()

	return (
		<SettingsActivityLog
			{...(exampleProps as unknown as ComponentProps<
				typeof SettingsActivityLog
			>)}
		/>
	)
}
