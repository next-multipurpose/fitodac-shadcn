"use client"

import type { ComponentProps } from "react"
import TeamChat from "@/registry/blocks/team/team-chat"

export function TeamChatDemo() {
	const now = 1_763_460_000_000
	const exampleProps = (() => {
		return {
			messages: [
				{
					id: "msg-1",
					content: "Hey team! Let's discuss the new feature",
					author: {
						id: "user-1",
						name: "Sarah Johnson",
						avatar: "https://i.pravatar.cc/150?img=11",
					},
					timestamp: new Date(now - 30 * 60 * 1000),
				},
				{
					id: "msg-2",
					content: "I think we should use @ai to help us brainstorm",
					author: {
						id: "user-2",
						name: "Mike Chen",
						avatar: "https://i.pravatar.cc/150?img=12",
					},
					timestamp: new Date(now - 25 * 60 * 1000),
					isAIMention: true,
				},
			],
			currentUserId: "user-1",
			onSendMessage: async (content: string) => {
				/* send message */
			},
		}
	})()

	return (
		<TeamChat
			{...(exampleProps as unknown as ComponentProps<typeof TeamChat>)}
		/>
	)
}
