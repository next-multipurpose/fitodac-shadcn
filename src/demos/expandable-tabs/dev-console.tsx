"use client"

import { type ReactNode, useState } from "react"
import {
	Activity,
	Database,
	Lock,
	Server,
	ShoppingCart,
	ShieldCheck,
	Users,
} from "lucide-react"
import { ExpandableTabs } from "@/registry/components/expandable-tabs"
import { cn } from "@/lib/utils"

function MetricCard({
	icon,
	label,
	value,
	subtitle,
}: {
	icon: ReactNode
	label: string
	value: string
	subtitle?: string
}) {
	return (
		<div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 px-3 py-2.5">
			<span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
				{icon}
			</span>
			<div className="flex flex-col">
				<span className="text-xs text-muted-foreground">{label}</span>
				<span className="text-lg font-semibold text-foreground">{value}</span>
			{subtitle ? (
				<span className="text-[10px] text-muted-foreground">{subtitle}</span>
			) : null}
			</div>
		</div>
	)
}

type EndpointStatus = "ok" | "warn" | "err"

function EndpointRow({
	method,
	path,
	status,
}: {
	method: string
	path: string
	status: EndpointStatus
}) {
	const statusText = status === "ok" ? "200" : status === "warn" ? "429" : "500"
	const colorClass =
		status === "ok"
			? "text-green-500"
			: status === "warn"
				? "text-amber-500"
				: "text-destructive"
	return (
		<div className="flex items-center gap-3 rounded-md border border-border/50 bg-muted/10 px-3 py-1.5 font-mono text-xs">
			<span className={cn("w-11 shrink-0 text-center font-medium", colorClass)}>
				{method}
			</span>
			<span className="text-muted-foreground">{path}</span>
			<span className="ml-auto font-medium" style={{ color: `var(--color-${status === "ok" ? "success" : status === "warn" ? "warning" : "destructive"})` }}>
				{statusText}
			</span>
		</div>
	)
}

const usersContent = (
	<div className="flex w-[21rem] flex-col gap-3">
		<div className="grid grid-cols-2 gap-3">
			<MetricCard
				icon={<Users className="h-4 w-4" />}
				label="Active users"
				value="1.2K"
				subtitle="Online now"
			/>
			<MetricCard
				icon={<Server className="h-4 w-4" />}
				label="Requests/min"
				value="142"
			/>
			<MetricCard
				icon={<Activity className="h-4 w-4" />}
				label="Avg. latency"
				value="42ms"
			/>
			<MetricCard
				icon={<Database className="h-4 w-4" />}
				label="DB queries"
				value="3.4K"
				subtitle="This hour"
			/>
		</div>
		<span className="text-[10px] font-medium text-muted-foreground">
			Live endpoints
		</span>
		<div className="flex flex-col gap-1.5">
			<EndpointRow method="GET" path="/api/users" status="ok" />
			<EndpointRow method="POST" path="/api/users" status="ok" />
			<EndpointRow method="PUT" path="/api/users/:id" status="warn" />
			<EndpointRow method="DEL" path="/api/users/:id" status="ok" />
		</div>
	</div>
)

const ordersContent = (
	<div className="flex w-[21rem] flex-col gap-3">
		<div className="grid grid-cols-2 gap-3">
			<MetricCard
				icon={<ShoppingCart className="h-4 w-4" />}
				label="Orders"
				value="842"
				subtitle="This week"
			/>
			<MetricCard
				icon={<Database className="h-4 w-4" />}
				label="Revenue"
				value="$45.2K"
				subtitle="Week to date"
			/>
			<MetricCard
				icon={<Activity className="h-4 w-4" />}
				label="Pending"
				value="27"
			/>
			<MetricCard
				icon={<Server className="h-4 w-4" />}
				label="Avg. order"
				value="$53.7"
			/>
		</div>
		<span className="text-[10px] font-medium text-muted-foreground">
			Order pipeline
		</span>
		<div className="flex flex-col gap-1.5">
			<div className="flex items-center justify-between rounded-md border border-border/50 bg-muted/10 px-3 py-1.5 font-mono text-xs">
				<span className="text-muted-foreground">#ORD-4729</span>
				<span className="text-green-500">Shipped</span>
			</div>
			<div className="flex items-center justify-between rounded-md border border-border/50 bg-muted/10 px-3 py-1.5 font-mono text-xs">
				<span className="text-muted-foreground">#ORD-4728</span>
				<span className="text-amber-500">Processing</span>
			</div>
			<div className="flex items-center justify-between rounded-md border border-border/50 bg-muted/10 px-3 py-1.5 font-mono text-xs">
				<span className="text-muted-foreground">#ORD-4727</span>
				<span className="text-destructive">Failed</span>
			</div>
		</div>
	</div>
)

const authContent = (
	<div className="flex w-[21rem] flex-col gap-3">
		<div className="grid grid-cols-2 gap-3">
			<MetricCard
				icon={<Lock className="h-4 w-4" />}
				label="Logins"
				value="2.8K"
				subtitle="Today"
			/>
			<MetricCard
				icon={<ShieldCheck className="h-4 w-4" />}
				label="Errors"
				value="12"
				subtitle="4.2% rate"
			/>
			<MetricCard
				icon={<Activity className="h-4 w-4" />}
				label="Active sessions"
				value="942"
			/>
			<MetricCard
				icon={<Server className="h-4 w-4" />}
				label="Avg. TTL"
				value="24m"
				subtitle="Session length"
			/>
		</div>
		<span className="text-[10px] font-medium text-muted-foreground">
			Recent events
		</span>
		<div className="flex flex-col gap-1.5">
			<EndpointRow method="POST" path="/auth/login" status="ok" />
			<EndpointRow method="POST" path="/auth/login" status="err" />
			<EndpointRow method="GET" path="/auth/session" status="ok" />
			<EndpointRow method="POST" path="/auth/logout" status="ok" />
		</div>
	</div>
)

const analyticsContent = (
	<div className="flex w-[21rem] flex-col gap-3">
		<div className="grid grid-cols-2 gap-3">
			<MetricCard
				icon={<Activity className="h-4 w-4" />}
				label="Events/sec"
				value="1.4K"
			/>
			<MetricCard
				icon={<Database className="h-4 w-4" />}
				label="Storage"
				value="842 MB"
			/>
			<MetricCard
				icon={<Server className="h-4 w-4" />}
				label="Endpoints"
				value="24"
				subtitle="Tracked"
			/>
			<MetricCard
				icon={<Users className="h-4 w-4" />}
				label="DAU"
				value="4.2K"
			/>
		</div>
		<span className="text-[10px] font-medium text-muted-foreground">
			Top endpoints
		</span>
		<div className="flex flex-col gap-1.5">
			<EndpointRow method="GET" path="/api/track/event" status="ok" />
			<EndpointRow method="POST" path="/api/track/batch" status="ok" />
			<EndpointRow method="GET" path="/api/track/feed" status="warn" />
			<EndpointRow method="POST" path="/api/track/identify" status="ok" />
		</div>
	</div>
)

export function ExpandableTabsDevDemo() {
	const [active, setActive] = useState<string | null>(null)
	return (
		<div className="flex min-h-88 w-full items-end justify-center">
			<ExpandableTabs
				value={active}
				onValueChange={setActive}
				items={[
					{
						id: "users",
						label: "Users API",
						icon: <Users className="h-4 w-4" />,
						content: usersContent,
					},
					{
						id: "orders",
						label: "Orders API",
						icon: <ShoppingCart className="h-4 w-4" />,
						content: ordersContent,
					},
					{
						id: "auth",
						label: "Auth API",
						icon: <ShieldCheck className="h-4 w-4" />,
						content: authContent,
					},
					{
						id: "analytics",
						label: "Analytics API",
						icon: <Database className="h-4 w-4" />,
						content: analyticsContent,
					},
				]}
			/>
		</div>
	)
}
