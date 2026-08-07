"use client"

import {
	Calendar,
	Check,
	FileText,
	Settings2,
	UserPlus,
	Users,
	Video,
} from "lucide-react"
import { useState } from "react"
import { BloomMenu } from "@/registry/components/bloom-menu"
import { cn } from "@/lib/utils"

const teamItems = [
	{ label: "New Doc", icon: FileText },
	{ label: "Invite", icon: UserPlus },
	{ label: "Meeting", icon: Video },
	{ label: "Task", icon: Check },
	{ label: "Calendar", icon: Calendar },
	{ label: "Settings", icon: Settings2 },
]

type RecentAction = {
	id: number
	label: string
	timestamp: string
}

export function BloomMenuTeamHubDemo() {
	const [recentActions, setRecentActions] = useState<RecentAction[]>([])
	const [memberCount, setMemberCount] = useState(12)

	const handleSelect = (label: string) => {
		const now = new Date()
		const time = now.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		})
		setRecentActions((prev) => [
			{ id: Date.now(), label, timestamp: time },
			...prev.slice(0, 4),
		])

		if (label === "Invite") {
			setMemberCount((c) => c + 1)
		}
	}

	return (
		<div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-6 pt-8">
			<div className="flex w-full max-w-sm items-center justify-between">
				<div>
					<p className="text-sm font-semibold text-foreground">
						Team Collaboration Hub
					</p>
					<p className="text-xs text-muted-foreground">
						{memberCount} members active
					</p>
				</div>
				<div className={cn("flex items-center gap-2 text-[11px] font-medium")}>
					<Users className="h-3.5 w-3.5 text-muted-foreground" />
					<span className="text-muted-foreground">{memberCount}</span>
				</div>
			</div>

			<div className="w-full max-w-sm space-y-4">
				<BloomMenu items={teamItems} onSelect={handleSelect} />

				<div className="flex flex-col gap-1.5">
					{recentActions.length === 0 ? (
						<p className="text-xs text-muted-foreground">
							No recent actions — trigger one from the menu
						</p>
					) : (
						recentActions.map((action) => (
							<div
								key={action.id}
								className="flex items-center justify-between rounded-lg border border-border/30 px-3 py-1.5 text-xs"
							>
								<span className="text-muted-foreground">{action.label}</span>
								<span className="text-muted-foreground/60">
									{action.timestamp}
								</span>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}
