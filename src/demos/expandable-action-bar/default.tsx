"use client"

import { Archive, Bell, Copy, Download, Send, Settings } from "lucide-react"
import { useMemo, useState } from "react"
import {
	type ExpandableActionBarItem,
	ExpandableActionBar,
} from "@/registry/components/expandable-action-bar"

const ACTIONS: ExpandableActionBarItem[] = [
	{
		id: "send",
		label: "Send",
		icon: <Send className="h-4 w-4" />,
		shortcut: "S",
	},
	{
		id: "copy",
		label: "Copy",
		icon: <Copy className="h-4 w-4" />,
		shortcut: "C",
	},
	{
		id: "download",
		label: "Export",
		icon: <Download className="h-4 w-4" />,
		shortcut: "E",
	},
	{
		id: "archive",
		label: "Archive",
		icon: <Archive className="h-4 w-4" />,
	},
	{
		id: "alerts",
		label: "Alerts",
		icon: <Bell className="h-4 w-4" />,
		badge: "3",
	},
	{
		id: "settings",
		label: "Settings",
		icon: <Settings className="h-4 w-4" />,
	},
]

export function ExpandableActionBarDefaultDemo() {
	const [expanded, setExpanded] = useState(false)
	const [activeId, setActiveId] = useState("send")

	const items = useMemo(
		() =>
			ACTIONS.map((item) => ({
				...item,
				active: item.id === activeId,
			})),
		[activeId]
	)

	return (
		<div className="flex min-h-72 w-full flex-col items-center justify-center gap-6">
			<div className="flex min-h-24 items-center justify-center">
				<ExpandableActionBar
					items={items}
					expanded={expanded}
					onExpandedChange={setExpanded}
					activeId={activeId}
					onAction={(item) => setActiveId(item.id)}
				/>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-2">
				<button
					type="button"
					onClick={() => setExpanded((current) => !current)}
					className="relative flex h-9 w-[110px] items-center justify-center overflow-hidden rounded-full border border-border bg-card text-xs font-medium text-foreground transition-colors hover:border-(--color-border-strong)"
				>
					<span className="flex items-center gap-1.5">
						<span className="h-3.5 w-3.5 shrink-0" />
						{expanded ? "Collapse" : "Expand"}
					</span>
				</button>
			</div>
		</div>
	)
}
