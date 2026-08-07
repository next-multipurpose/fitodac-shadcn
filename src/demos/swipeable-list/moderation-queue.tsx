"use client"

import {
	Check,
	Flag,
	Megaphone,
	PauseCircle,
	Shield,
	Trash2,
	User,
	UserCheck,
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
		id: "approve",
		label: "Approve",
		icon: <Check className="h-4 w-4" />,
		tone: "success",
	},
	{
		id: "feature",
		label: "Feature",
		icon: <Megaphone className="h-4 w-4" />,
		tone: "primary",
	},
]

const rightActions: SwipeAction[] = [
	{
		id: "reject",
		label: "Reject",
		icon: <PauseCircle className="h-4 w-4" />,
		tone: "warning",
	},
	{
		id: "remove",
		label: "Remove",
		icon: <Trash2 className="h-4 w-4" />,
		tone: "danger",
	},
]

const platformConfig = {
	twitter: { label: "X", color: "bg-sky-500" },
	instagram: { label: "IG", color: "bg-pink-500" },
	tiktok: { label: "TT", color: "bg-black" },
	youtube: { label: "YT", color: "bg-red-500" },
}

type PlatformKey = keyof typeof platformConfig

function PlatformTag({ platform }: { platform: PlatformKey }) {
	const c = platformConfig[platform]
	return (
		<span className="inline-flex items-center gap-1 rounded px-1 py-0.5 text-[10px] font-medium leading-none">
			<span className={cn("h-1.5 w-1.5 rounded-full", c.color)} />
			{c.label}
		</span>
	)
}

function AvatarLead({ initial }: { initial: string }) {
	return (
		<div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-muted text-xs font-medium text-muted-foreground">
			{initial}
		</div>
	)
}

function GradientLead({
	initial,
	colors,
}: {
	initial: string
	colors: string
}) {
	return (
		<div
			className={cn(
				"grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-gradient-to-br text-xs font-medium text-transparent bg-clip-text",
				colors,
			)}
		>
			{initial}
		</div>
	)
}

const initialItems: SwipeableListItem[] = [
	{
		id: "post-1",
		title: "Maya Chen",
		description:
			"Just shipped the new landing page — finally feel good about the conversions! #ui #design",
		meta: (
			<div className="flex items-center gap-1.5">
				<PlatformTag platform="twitter" />
				<span>· 2h ago</span>
				<Flag className="h-3 w-3 text-amber-500" />
				<span>Spam report</span>
			</div>
		),
		leading: <AvatarLead initial="M" />,
		leftActions,
		rightActions,
	},
	{
		id: "post-2",
		title: "PixelForge Studios",
		description:
			"Behind the scenes of our motion design process. Every frame matters. 🎬",
		meta: (
			<div className="flex items-center gap-1.5">
				<PlatformTag platform="instagram" />
				<span>· 4h ago</span>
				<span>12.4K views</span>
			</div>
		),
		leading: (
			<GradientLead
				initial="P"
				colors="from-purple-500/15 to-fuchsia-500/15 from-purple-500 to-fuchsia-500"
			/>
		),
		leftActions,
		rightActions,
	},
	{
		id: "post-3",
		title: "DevTips with Alex",
		description:
			"Quick tip: use Spring magic numbers instead of arbitrary stiffness values 👇",
		meta: (
			<div className="flex items-center gap-1.5">
				<PlatformTag platform="tiktok" />
				<span>· 1d ago</span>
				<span>42.8K views</span>
			</div>
		),
		leading: <AvatarLead initial="D" />,
		leftActions,
		rightActions,
	},
	{
		id: "post-4",
		title: "CodeCraft Weekly",
		description: "Episode 42: The hidden cost of layout animations in React. Watch now.",
		meta: (
			<div className="flex items-center gap-1.5">
				<PlatformTag platform="youtube" />
				<span>· 3d ago</span>
				<span>8.1K views</span>
			</div>
		),
		leading: (
			<GradientLead
				initial="C"
				colors="from-amber-500/15 to-red-500/15 from-amber-500 to-red-500"
			/>
		),
		leftActions,
		rightActions,
	},
]

type QueueStatus = "pending" | "approved" | "rejected"
type Counts = Record<QueueStatus, number>
const emptyCounts: Counts = { pending: 0, approved: 0, rejected: 0 }

function CountBadge({
	label,
	count,
	tone,
}: { label: string; count: number; tone: "pending" | "approved" | "rejected" }) {
	const toneClass = {
		pending: "border-border bg-muted text-muted-foreground",
		approved:
			"border-emerald-600/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
		rejected:
			"border-amber-600/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
	}
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
				toneClass[tone],
			)}
		>
			{label}
			<span className="rounded-full bg-background px-1.5 py-0.5 text-[10px] font-semibold leading-none">
				{count}
			</span>
		</span>
	)
}

export function SwipeableListModerationQueueDemo() {
	const [items, setItems] = useState(initialItems)
	const [lastAction, setLastAction] = useState("Review queue ready")
	const [counts, setCounts] = useState<Counts>({ ...emptyCounts })
	const [activeFilter, setActiveFilter] = useState<QueueStatus>("pending")

	const handleAction = (payload: {
		item: SwipeableListItem
		action: SwipeAction
		side: "left" | "right"
	}) => {
		const { item, action } = payload

		if (action.id === "approve") {
			setCounts((c) => ({ ...c, approved: c.approved + 1 }))
			setLastAction(`Approved · ${item.title}`)
			setItems((current) => current.filter((entry) => entry.id !== item.id))
		} else if (action.id === "feature") {
			setCounts((c) => ({ ...c, approved: c.approved + 1 }))
			setLastAction(`Featured · ${item.title}`)
			setItems((current) => current.filter((entry) => entry.id !== item.id))
		} else if (action.id === "reject") {
			setCounts((c) => ({ ...c, rejected: c.rejected + 1 }))
			setLastAction(`Rejected · ${item.title}`)
			setItems((current) => current.filter((entry) => entry.id !== item.id))
		} else if (action.id === "remove") {
			setCounts((c) => ({ ...c, rejected: c.rejected + 1 }))
			setLastAction(`Removed · ${item.title}`)
			setItems((current) => current.filter((entry) => entry.id !== item.id))
		} else {
			setLastAction(`${action.label} · ${item.title}`)
		}
	}

	const filters: { key: QueueStatus; label: string; icon: ReactNode }[] = [
		{
			key: "pending",
			label: "Pending",
			icon: <Shield className="h-3 w-3" />,
		},
		{
			key: "approved",
			label: "Approved",
			icon: <UserCheck className="h-3 w-3" />,
		},
		{
			key: "rejected",
			label: "Rejected",
			icon: <User className="h-3 w-3" />,
		},
	]

	return (
		<div className="flex min-h-96 w-full items-center justify-center">
			<div className="w-full max-w-sm space-y-3">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-semibold text-foreground">
							Moderation queue
						</p>
						<p className="text-xs text-muted-foreground">{lastAction}</p>
					</div>
					<CountBadge
						label="Pending"
						count={items.length}
						tone="pending"
					/>
				</div>

				<div className="flex items-center gap-1">
					{filters.map((f) => (
						<button
							key={f.key}
							type="button"
							onClick={() => setActiveFilter(f.key)}
							className={cn(
								"inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
								activeFilter === f.key
									? "border-primary bg-primary/10 text-primary"
									: "border-border bg-background text-muted-foreground hover:text-foreground",
							)}
						>
							{f.icon}
							{f.label}
						</button>
					))}
				</div>

				<div className="flex gap-3">
					<CountBadge label="Approved" count={counts.approved} tone="approved" />
					<CountBadge label="Rejected" count={counts.rejected} tone="rejected" />
				</div>

				<SwipeableList items={items} onAction={handleAction} />

				<div className="px-1 text-[11px] font-medium text-muted-foreground">
					{items.length} items awaiting review
				</div>
			</div>
		</div>
	)
}
