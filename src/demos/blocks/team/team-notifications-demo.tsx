"use client"

import type { ComponentProps } from "react"
import type { Session } from "@/registry/blocks/auth/auth-session-manager"
import TeamNotifications from "@/registry/blocks/team/team-notifications"

export function TeamNotificationsDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			notifications: [
				{
					id: "notif-1",
					type: "mention" as const,
					title: "You were mentioned",
					message: "Mike Chen mentioned you in a chat message",
					user: {
						id: "user-2",
						name: "Mike Chen",
						avatar: "https://i.pravatar.cc/150?img=12",
					},
					read: false,
					timestamp: new Date(now - 10 * 60 * 1000),
					link: "#chat",
				},
				{
					id: "notif-2",
					type: "ai_event" as const,
					title: "AI Session Completed",
					message:
						"Your AI session in Website Redesign project has finished processing",
					read: false,
					timestamp: new Date(now - 30 * 60 * 1000),
					link: "#ai-room",
				},
				{
					id: "notif-3",
					type: "file_shared" as const,
					title: "File Shared",
					message: "Sarah Johnson shared project-plan.pdf with you",
					user: {
						id: "user-1",
						name: "Sarah Johnson",
						avatar: "https://i.pravatar.cc/150?img=11",
					},
					read: true,
					timestamp: new Date(now - 2 * 60 * 60 * 1000),
					link: "#files",
				},
			],
			unreadCount: 3,
			onMarkAsRead: async (notificationId: string) => {
				/* mark as read */
			},
			onMarkAllAsRead: async () => {
				/* mark all as read */
			},
			onDelete: async (notificationId: string) => {
				/* delete notification */
			},
		}
	})()

	return (
		<TeamNotifications
			{...(exampleProps as unknown as ComponentProps<typeof TeamNotifications>)}
			className="max-w-2xl"
		/>
	)
}
