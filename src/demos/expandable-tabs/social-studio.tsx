"use client"

import { type ReactNode } from "react"
import {
	BarChart3,
	Bell,
	FileText,
	Heart,
	Image as ImageIcon,
	Send,
	User,
	Users,
} from "lucide-react"
import { ExpandableTabs } from "@/registry/components/expandable-tabs"
import { cn } from "@/lib/utils"

function StatCard({
	icon,
	label,
	value,
	trend,
	positive = true,
}: {
	icon: ReactNode
	label: string
	value: string
	trend?: string
	positive?: boolean
}) {
	return (
		<div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 px-3 py-2.5">
			<span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
				{icon}
			</span>
			<div className="flex flex-col">
				<span className="text-xs text-muted-foreground">{label}</span>
				<span className="text-lg font-semibold text-foreground">{value}</span>
			</div>
			{trend ? (
				<span
					className={cn(
						"ml-auto text-xs font-medium",
						positive ? "text-green-500" : "text-muted-foreground",
					)}
				>
					{trend}
				</span>
			) : null}
		</div>
	)
}

function MiniBar({ values }: { values: number[] }) {
	const max = Math.max(...values, 1)
	return (
		<div className="flex h-10 items-end gap-0.5">
			{values.map((v, i) => (
				<span
					key={i}
					className="w-2.5 origin-bottom rounded-sm bg-primary/60"
					style={{ height: `${(v / max) * 100}%` }}
				/>
			))}
		</div>
	)
}

const overviewContent = (
	<div className="flex w-[20rem] flex-col gap-3">
		<div className="grid grid-cols-2 gap-3">
			<StatCard
				icon={<Users className="h-4 w-4" />}
				label="Followers"
				value="12.4K"
				trend="+8.2%"
			/>
			<StatCard
				icon={<Heart className="h-4 w-4 text-pink-500" />}
				label="Likes"
				value="8.9K"
				trend="+12.4%"
			/>
			<StatCard
				icon={<Send className="h-4 w-4" />}
				label="Shares"
				value="2.1K"
				trend="+3.1%"
			/>
			<StatCard
				icon={<ImageIcon className="h-4 w-4 text-blue-500" />}
				label="Impressions"
				value="45.2K"
				trend="-2.1%"
				positive={false}
			/>
		</div>
		<div className="rounded-lg border border-border/50 bg-muted/20 px-3 py-2.5">
			<span className="text-xs text-muted-foreground">Weekly reach</span>
			<MiniBar values={[24, 38, 32, 48, 41, 52, 45]} />
		</div>
		<StatCard
			icon={<User className="h-4 w-4" />}
			label="Top post"
			value="@sarah.design"
		/>
	</div>
)

const composerContent = (
	<div className="flex w-[20rem] flex-col gap-3">
		<textarea
			placeholder="What's happening?"
			rows={3}
			className="resize-none rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm placeholder:text-muted-foreground/60 outline-none"
		/>
		<div className="flex items-center justify-between">
			<div className="flex gap-1.5">
				<span className="text-xs text-muted-foreground">Platforms:</span>
				<div className="flex gap-1">
					{["ig", "tw", "ln"].map((p) => (
						<span
							key={p}
							className="grid h-5 w-5 place-items-center rounded bg-primary/10 text-xs font-medium text-primary"
						>
							{p}
						</span>
					))}
				</div>
			</div>
			<span className="text-xs text-muted-foreground">3 of 5 posts left</span>
		</div>
		<div className="flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-2">
			<ImageIcon className="h-4 w-4 text-muted-foreground" />
			<span className="text-xs text-muted-foreground">Add photo or video</span>
		</div>
		<button
			type="button"
			className="flex h-8 items-center justify-center gap-1.5 rounded-lg bg-primary text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
		>
			<Send className="h-3.5 w-3.5" />
			Post
		</button>
	</div>
)

const activityContent = (
	<div className="flex w-[20rem] flex-col gap-2.5">
		{[
			{ name: "maya", text: "Love this shot! 🔥", time: "2m ago" },
			{ name: "alex", text: "Where can I get one?", time: "15m ago" },
			{ name: "jordan", text: "RT @sarah.design", time: "32m ago" },
			{ name: "taylor", text: "Added to bookmarks", time: "1h ago" },
		].map((item) => (
			<div
				key={item.name}
				className="flex items-start gap-2.5 rounded-lg border border-border/50 bg-muted/20 px-3 py-2"
			>
				<span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10">
					<User className="h-3 w-3 text-primary" />
				</span>
				<div className="flex flex-col">
					<span className="text-xs font-medium text-foreground">
						@{item.name}
					</span>
					<span className="text-xs text-muted-foreground">{item.text}</span>
				</div>
				<span className="ml-auto text-xs text-muted-foreground">{item.time}</span>
			</div>
		))}
	</div>
)

const reportsContent = (
	<div className="flex w-[20rem] flex-col gap-2.5">
		<StatCard
			icon={<FileText className="h-4 w-4" />}
			label="This month"
			value="$24.8K earned"
		/>
		{[
			{ name: "Weekly Performance", period: "Week 29 — Jul 21", status: "Ready" },
			{ name: "Monthly Report", period: "July 2025", status: "Ready" },
			{ name: "Quarterly Report", period: "Q2 2025", status: "Processing" },
		].map((r) => (
			<div
				key={r.name}
				className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 px-3 py-2"
			>
				<div className="flex flex-col">
					<span className="text-xs font-medium text-foreground">{r.name}</span>
					<span className="text-xs text-muted-foreground">{r.period}</span>
				</div>
				<button
					type="button"
					className="text-xs font-medium text-primary hover:underline"
				>
					{r.status === "Ready" ? "Download" : r.status}
				</button>
			</div>
		))}
	</div>
)

export function ExpandableTabsSocialDemo() {
	return (
		<div className="flex min-h-88 w-full items-end justify-center">
			<ExpandableTabs
				items={[
					{
						id: "overview",
						label: "Overview",
						icon: <BarChart3 className="h-4 w-4" />,
						content: overviewContent,
					},
					{
						id: "composer",
						label: "Composer",
						icon: <Send className="h-4 w-4" />,
						content: composerContent,
					},
					{
						id: "activity",
						label: "Activity",
						icon: <Bell className="h-4 w-4" />,
						content: activityContent,
					},
					{
						id: "reports",
						label: "Reports",
						icon: <FileText className="h-4 w-4" />,
						content: reportsContent,
					},
				]}
			/>
		</div>
	)
}
