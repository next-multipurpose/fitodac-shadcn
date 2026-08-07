"use client"

import {
	Calendar,
	Check,
	Globe,
	PlaneTakeoff,
	Share2,
	Trash2,
} from "lucide-react"
import { useState, type ReactNode } from "react"
import {
	type SwipeAction,
	SwipeableList,
	type SwipeableListItem,
} from "@/registry/components/swipeable-list"
import { cn } from "@/lib/utils"

const leftActions: SwipeAction[] = [
	{
		id: "checkin",
		label: "Check-in",
		icon: <PlaneTakeoff className="h-4 w-4" />,
		tone: "primary",
	},
	{
		id: "calendar",
		label: "Add to Calendar",
		icon: <Calendar className="h-4 w-4" />,
		tone: "success",
	},
]

const rightActions: SwipeAction[] = [
	{
		id: "share",
		label: "Share",
		icon: <Share2 className="h-4 w-4" />,
		tone: "neutral",
	},
	{
		id: "cancel",
		label: "Cancel",
		icon: <Trash2 className="h-4 w-4" />,
		tone: "danger",
	},
]

const initialItems: SwipeableListItem[] = [
	{
		id: "paris",
		title: "Paris Weekend",
		description: "Air France · AF 1204",
		meta: "Fri → Sun · 3d",
		leading: (
			<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500/15 to-indigo-500/15 text-2xl">
				🇫🇷
			</div>
		),
		leftActions,
		rightActions,
	},
	{
		id: "kyoto",
		title: "Kyoto Temple Tour",
		description: "ANA · NH 08",
		meta: "Mon → Thu · 5d",
		leading: (
			<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-500/15 to-pink-500/15 text-2xl">
				🇯🇵
			</div>
		),
		leftActions,
		rightActions,
	},
	{
		id: "reykjavik",
		title: "Iceland Ring Road",
		description: "Icelandair · FI 382",
		meta: "Jun 22 → Jun 30 · 9d",
		leading: (
			<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-2xl">
				🇮🇸
			</div>
		),
		leftActions,
		rightActions,
	},
	{
		id: "london",
		title: "London Design Summit",
		description: "British Airways · BA 286",
		meta: "Aug 5 → Aug 8 · 4d",
		leading: (
			<div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 text-2xl">
				🇬🇧
			</div>
		),
		leftActions,
		rightActions,
	},
]

function StatusChip({
	children,
	positive = true,
}: { children: ReactNode; positive?: boolean }) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
				positive
					? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
					: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
			)}
		>
			{children}
		</span>
	)
}

export function SwipeableListTripManagerDemo() {
	const [items, setItems] = useState(initialItems)
	const [lastAction, setLastAction] = useState("Ready to depart")
	const [checkedIn, setCheckedIn] = useState<Set<string>>(new Set())

	const handleAction = (payload: {
		item: SwipeableListItem
		action: SwipeAction
		side: "left" | "right"
	}) => {
		const { item, action } = payload

		if (action.id === "checkin") {
			setCheckedIn((prev) => {
				const next = new Set(prev)
				next.add(item.id)
				return next
			})
			setLastAction(`Checked in · ${item.title}`)
		} else if (action.id === "calendar") {
			setLastAction(`Added to calendar · ${item.title}`)
		} else if (action.id === "share") {
			setLastAction(`Shared itinerary · ${item.title}`)
		} else if (action.id === "cancel") {
			setItems((current) => current.filter((entry) => entry.id !== item.id))
			setLastAction(`Removed trip · ${item.title}`)
		} else {
			setLastAction(`${action.label} · ${item.title}`)
		}
	}

	return (
		<div className="flex min-h-96 w-full items-center justify-center">
			<div className="w-full max-w-sm space-y-3">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-semibold text-foreground">
							Upcoming trips
						</p>
						<p className="text-xs text-muted-foreground">{lastAction}</p>
					</div>
					<div className="flex items-center gap-1.5">
						<StatusChip positive>
							<Check className="h-3 w-3" />
							{checkedIn.size} checked in
						</StatusChip>
						<span className="text-xs font-medium text-muted-foreground">
							{items.length} trips
						</span>
					</div>
				</div>

				<SwipeableList items={items} onAction={handleAction} />

				<div className="flex items-center justify-between px-1 text-[11px] font-medium text-muted-foreground">
					<span>{items.length} upcoming</span>
					<span>
						<Globe className="inline h-3 w-3" /> Worldwide
					</span>
				</div>
			</div>
		</div>
	)
}
