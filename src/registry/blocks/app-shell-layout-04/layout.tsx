"use client"

import * as React from "react"
import {
	BarChart3,
	Bell,
	Check,
	CheckCheck,
	ChevronsUpDown,
	CircleAlert,
	CircleCheck,
	ClipboardList,
	Code2,
	CreditCard,
	FileText,
	FlaskConical,
	Home,
	Inbox,
	LayoutGrid,
	LogOut,
	MessageSquare,
	Monitor,
	Moon,
	Package,
	Palette,
	Plus,
	Rocket,
	Search,
	Settings,
	ShieldCheck,
	ShoppingCart,
	Star,
	Store,
	Sun,
	Tag,
	Truck,
	User,
	Users,
	Warehouse,
	X,
} from "lucide-react"

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/registry/primitives/avatar"
import { Badge } from "@/registry/primitives/badge"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/registry/primitives/breadcrumb"
import { Button } from "@/registry/primitives/button"
import { Card } from "@/registry/primitives/card"
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/primitives/command"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"
import { Kbd, KbdGroup } from "@/registry/primitives/kbd"
import { Progress } from "@/registry/primitives/progress"
import { ScrollArea } from "@/registry/primitives/scroll-area"
import { Separator } from "@/registry/primitives/separator"
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/registry/primitives/sheet"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/registry/primitives/sidebar"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/registry/primitives/tooltip"
import { cn } from "@/lib/utils"
import {
	applyTheme,
	getStoredTheme,
	THEME_STORAGE_KEY,
	type Theme,
} from "@/lib/theme"

const railNavigation = [
	{ label: "Home", icon: Home },
	{ label: "Inventory", icon: Package },
	{ label: "Orders", icon: ShoppingCart },
	{ label: "Customers", icon: Users },
	{ label: "Messages", icon: MessageSquare },
	{ label: "Analytics", icon: BarChart3 },
	{ label: "Settings", icon: Settings },
]

type NavigationItem = {
	label: string
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
	badge?: string
}

type NavigationSection = {
	groups: Array<{ label: string; items: NavigationItem[] }>
	usage?: { title: string; description: string; value: number }
	metrics?: {
		status: string
		statusTone: "default" | "destructive"
		rows: Array<{
			label: string
			value: string
			tone?: "default" | "destructive"
		}>
	}
	promo?: { title: string; description: string; action: string }
	status?: { title: string; value: string; description: string }
	notices?: Array<{ title: string; description: string }>
}

const sidebarNavigation: Record<string, NavigationSection> = {
	Home: {
		groups: [
			{
				label: "Overview",
				items: [
					{ label: "Dashboard", icon: Home },
					{ label: "Activity Feed", icon: ClipboardList },
					{ label: "Quick Stats", icon: Star },
				],
			},
			{
				label: "Reporting",
				items: [
					{ label: "Reports", icon: FileText },
					{ label: "Exports", icon: ClipboardList },
				],
			},
		],
		notices: [
			{
				title: "Icon library v2 released",
				description:
					"Five icon libraries unified under a single API with automatic mapping.",
			},
			{
				title: "Multi-theme support is here",
				description:
					"Switch between Vega, Nova, Maia, Lyra, and Mira themes across all components.",
			},
		],
	},
	Inventory: {
		groups: [
			{
				label: "Catalog",
				items: [
					{ label: "Product Catalog", icon: LayoutGrid },
					{ label: "Categories", icon: Tag },
					{ label: "Customer Reviews", icon: Star, badge: "20" },
				],
			},
			{
				label: "Operations",
				items: [
					{ label: "Transactions", icon: ShoppingCart },
					{ label: "Suppliers", icon: Truck },
					{ label: "Warehouses", icon: Warehouse },
					{ label: "Stock Alerts", icon: CircleAlert, badge: "4" },
				],
			},
		],
		usage: {
			title: "Storage Usage",
			description: "Warehouse capacity across all locations",
			value: 74,
		},
	},
	Orders: {
		groups: [
			{
				label: "Order Management",
				items: [
					{ label: "All Orders", icon: ClipboardList },
					{ label: "Pending", icon: CircleAlert, badge: "3" },
					{ label: "Drafts", icon: FileText },
				],
			},
			{
				label: "Fulfillment",
				items: [
					{ label: "Fulfilled", icon: Package },
					{ label: "Shipping", icon: Truck },
					{ label: "Returns", icon: ShoppingCart },
					{ label: "Refunds", icon: CreditCard },
				],
			},
		],
		metrics: {
			status: "Normal",
			statusTone: "default",
			rows: [
				{ label: "Orders / min", value: "8.4" },
				{ label: "Fulfillment", value: "77.1%" },
			],
		},
	},
	Customers: {
		groups: [
			{
				label: "Directory",
				items: [
					{ label: "All Customers", icon: Users },
					{ label: "Segments", icon: LayoutGrid },
					{ label: "Companies", icon: Package },
				],
			},
			{
				label: "Engagement",
				items: [
					{ label: "Loyalty Program", icon: Star },
					{ label: "Campaigns", icon: MessageSquare },
				],
			},
		],
		metrics: {
			status: "Alert",
			statusTone: "destructive",
			rows: [
				{ label: "Active Users", value: "980.9" },
				{ label: "Churn Rate", value: "3.1%", tone: "destructive" },
			],
		},
	},
	Messages: {
		groups: [
			{
				label: "Mailbox",
				items: [
					{ label: "Inbox", icon: Inbox, badge: "5" },
					{ label: "Sent", icon: FileText },
					{ label: "Drafts", icon: ClipboardList },
					{ label: "Archived", icon: Package },
				],
			},
			{
				label: "Manage",
				items: [
					{ label: "Templates", icon: FileText },
					{ label: "Auto-Replies", icon: Settings },
				],
			},
		],
		metrics: {
			status: "Alert",
			statusTone: "destructive",
			rows: [
				{ label: "Messages / hr", value: "225.9" },
				{ label: "Avg Response", value: "3.1h", tone: "destructive" },
			],
		},
	},
	Analytics: {
		groups: [
			{
				label: "Dashboards",
				items: [
					{ label: "Overview", icon: BarChart3 },
					{ label: "Sales", icon: ShoppingCart },
					{ label: "Inventory", icon: Package },
					{ label: "Traffic", icon: Users },
				],
			},
			{
				label: "Insights",
				items: [
					{ label: "Conversion", icon: FileText },
					{ label: "Retention", icon: Users },
					{ label: "Forecasts", icon: ClipboardList },
				],
			},
		],
		promo: {
			title: "Upgrade to Pro",
			description: "Unlock real-time dashboards and AI-powered insights.",
			action: "View Plans",
		},
	},
	Settings: {
		groups: [
			{
				label: "Workspace",
				items: [
					{ label: "General", icon: Settings },
					{ label: "Billing", icon: CreditCard },
					{ label: "Team Members", icon: Users },
				],
			},
			{
				label: "Configuration",
				items: [
					{ label: "Integrations", icon: Package },
					{ label: "API Keys", icon: ShieldCheck },
					{ label: "Webhooks", icon: MessageSquare },
				],
			},
		],
		status: {
			title: "Security Status",
			value: "Healthy",
			description: "All checks passed. 2FA enabled, API keys rotated.",
		},
	},
}

const defaultActiveItems = Object.fromEntries(
	Object.entries(sidebarNavigation).map(([section, navigation]) => [
		section,
		navigation.groups[0]?.items[0]?.label ?? section,
	])
) as Record<string, string>

const workspaces = ["Acme Inc", "Northstar Labs", "Keenthemes"]
const inventoryAreas = ["Inventory", "Orders", "Customers"]
const environments = ["Production", "Staging", "Development"]

const organizationOptions = [
	{ label: "Acme Inc", description: "Pro", mark: "primary" },
	{ label: "Starter Kit", description: "Free", mark: "warning" },
	{ label: "Enterprise", description: "Enterprise", mark: "chart" },
]
const applicationOptions = [
	{ label: "Inventory", icon: Package },
	{ label: "Storefront", icon: Store },
	{ label: "Analytics", icon: BarChart3 },
]
const environmentOptions = [
	{ label: "Production", icon: Rocket },
	{ label: "Staging", icon: FlaskConical },
	{ label: "Development", icon: Code2 },
]

function BrandMark() {
	return (
		<span
			className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground"
			aria-label="Acme"
		>
			<span className="text-sm font-semibold">U</span>
		</span>
	)
}

function RailNavigation({
	active,
	onChange,
}: {
	active: string
	onChange: (label: string) => void
}) {
	return (
		<SidebarGroup className="px-1.5 py-1">
			<SidebarGroupContent>
				<SidebarMenu className="gap-0.5">
					{railNavigation.map((item) => {
						const Icon = item.icon

						return (
							<SidebarMenuItem key={item.label}>
								<SidebarMenuButton
									tooltip={item.label}
									isActive={active === item.label}
									onClick={() => onChange(item.label)}
									className="justify-center"
									aria-label={item.label}
								>
									<Icon />
								</SidebarMenuButton>
							</SidebarMenuItem>
						)
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}

type ColorMode = Theme | "system"

type DocumentWithViewTransition = Document & {
	startViewTransition?: (update: () => void) => { ready: Promise<void> }
}

function ColorModeSelector() {
	const [mode, setMode] = React.useState<ColorMode>("system")

	React.useEffect(() => {
		let active = true
		const colorScheme = window.matchMedia("(prefers-color-scheme: dark)")
		queueMicrotask(() => {
			if (active) {
				setMode(getStoredTheme() ?? "system")
			}
		})

		function syncSystemTheme(event: MediaQueryListEvent) {
			if (!getStoredTheme()) {
				applyTheme(event.matches ? "dark" : "light")
			}
		}

		colorScheme.addEventListener("change", syncSystemTheme)
		return () => {
			active = false
			colorScheme.removeEventListener("change", syncSystemTheme)
		}
	}, [])

	async function selectMode(nextMode: ColorMode, target: HTMLButtonElement) {
		const applyNextMode = () => {
			try {
				if (nextMode === "system") {
					localStorage.removeItem(THEME_STORAGE_KEY)
				} else {
					localStorage.setItem(THEME_STORAGE_KEY, nextMode)
				}
			} catch {
				// The document theme still changes when storage is unavailable.
			}

			const effectiveTheme =
				nextMode === "system"
					? window.matchMedia("(prefers-color-scheme: dark)").matches
						? "dark"
						: "light"
					: nextMode

			applyTheme(effectiveTheme)
			setMode(nextMode)
		}
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches
		const startViewTransition = (
			document as DocumentWithViewTransition
		).startViewTransition?.bind(document)

		if (!startViewTransition || reduceMotion) {
			applyNextMode()
			return
		}

		const { top, left, width, height } = target.getBoundingClientRect()
		const x = left + width / 2
		const y = top + height / 2
		const radius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y)
		)

		try {
			const transition = startViewTransition(applyNextMode)
			await transition.ready
			document.documentElement.animate(
				{
					clipPath: [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${radius}px at ${x}px ${y}px)`,
					],
				},
				{
					duration: 400,
					easing: "ease-in",
					pseudoElement: "::view-transition-new(root)",
				}
			)
		} catch {
			applyNextMode()
		}
	}

	return (
		<div className="flex h-9 items-center gap-2 px-2 text-sm">
			<Palette size="16" />
			<span>Theme</span>
			<div className="ml-auto flex items-center rounded-full border bg-muted/40 p-0.5">
				{[
					{ value: "light" as const, label: "Light mode", icon: Sun },
					{ value: "dark" as const, label: "Dark mode", icon: Moon },
					{ value: "system" as const, label: "System mode", icon: Monitor },
				].map((option) => {
					const Icon = option.icon

					return (
						<Button
							key={option.value}
							type="button"
							variant={mode === option.value ? "outline" : "ghost"}
							size="icon-xs"
							aria-label={option.label}
							aria-pressed={mode === option.value}
							onClick={(event) =>
								void selectMode(option.value, event.currentTarget)
							}
							className="rounded-full"
						>
							<Icon />
						</Button>
					)
				})}
			</div>
		</div>
	)
}

function ProfileMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon-sm"
					aria-label="Open profile for Nick Bold"
					className="mx-auto"
				>
					<Avatar className="size-7">
						<AvatarImage
							src="https://i.pravatar.cc/64?img=12"
							alt="Nick Bold"
						/>
						<AvatarFallback className="rounded-md">NB</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="right" align="end" className="w-60">
				<DropdownMenuLabel className="font-normal">
					<span className="flex items-center gap-2.5 py-1">
						<Avatar className="size-8">
							<AvatarImage
								src="https://i.pravatar.cc/64?img=12"
								alt="Nick Bold"
							/>
							<AvatarFallback>NB</AvatarFallback>
						</Avatar>
						<span className="flex min-w-0 flex-col">
							<span className="font-semibold">Nick Bold</span>
							<span className="truncate text-xs text-muted-foreground">
								nick@reui.io
							</span>
						</span>
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User />
						Profile<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings />
						Preferences
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Package />
						Manage Accounts
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<ColorModeSelector />
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<LogOut />
						Sign out<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function ContextNavigation({
	section,
	active,
	onChange,
}: {
	section: string
	active: string
	onChange: (label: string) => void
}) {
	const navigation = sidebarNavigation[section] ?? sidebarNavigation.Inventory

	return (
		<nav
			className="flex min-h-0 flex-1 flex-col"
			aria-label={`${section} navigation`}
		>
			<ScrollArea className="min-h-0 flex-1">
				<div className="flex flex-col py-1">
					{navigation.groups.map((group, groupIndex) => (
						<React.Fragment key={group.label}>
							{groupIndex > 0 ? <Separator className="my-2" /> : null}
							<p className="px-3 pt-2 pb-1 text-[11px] font-medium text-muted-foreground uppercase">
								{group.label}
							</p>
							<div className="flex flex-col gap-0.5 px-2">
								{group.items.map((item) => {
									const Icon = item.icon

									return (
										<Button
											key={item.label}
											variant="ghost"
											size="sm"
											onClick={() => onChange(item.label)}
											className={cn(
												"w-full justify-start gap-2.5 font-normal text-muted-foreground",
												active === item.label &&
													"bg-accent font-medium text-accent-foreground"
											)}
											aria-current={active === item.label ? "page" : undefined}
										>
											<Icon data-icon="inline-start" />
											<span className="whitespace-nowrap">{item.label}</span>
											{item.badge ? (
												<Badge
													variant="outline"
													className="ml-auto h-4 min-w-4 rounded px-1 text-[10px] leading-none"
												>
													{item.badge}
												</Badge>
											) : null}
										</Button>
									)
								})}
							</div>
						</React.Fragment>
					))}
				</div>
			</ScrollArea>
			<SidebarSupplement navigation={navigation} />
		</nav>
	)
}

function MetricsPanel({
	metrics,
}: {
	metrics: NonNullable<NavigationSection["metrics"]>
}) {
	return (
		<div className="shrink-0 border-t p-3">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<p className="text-xs font-medium">Live Metrics</p>
					<Badge variant={metrics.statusTone}>{metrics.status}</Badge>
				</div>
				{metrics.rows.map((row, index) => (
					<div key={row.label} className="flex items-center gap-2 text-[11px]">
						<span className="min-w-0 flex-1 truncate text-muted-foreground">
							{row.label}
						</span>
						<svg
							viewBox="0 0 44 14"
							aria-hidden="true"
							className={cn(
								"h-3.5 w-11",
								row.tone === "destructive" ? "text-destructive" : "text-primary"
							)}
						>
							<path
								d="M1 9 C4 2 6 12 9 7 S14 4 16 9 S21 11 24 5 S29 3 31 8 S36 12 38 6 S41 4 43 7"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								style={{ opacity: 0.85 - index * 0.1 }}
							/>
						</svg>
						<span
							className={cn(
								"font-medium tabular-nums",
								row.tone === "destructive" && "text-destructive"
							)}
						>
							{row.value}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

function SidebarSupplement({ navigation }: { navigation: NavigationSection }) {
	if (navigation.usage) {
		return (
			<div className="w-full min-w-0 shrink-0 overflow-hidden border-t p-3">
				<div className="flex min-w-0 flex-col gap-2">
					<p className="text-xs font-medium text-warning">
						{navigation.usage.title}
					</p>
					<p className="text-[11px] leading-snug text-muted-foreground">
						{navigation.usage.description}
					</p>
					<div className="relative h-1.5 overflow-hidden rounded-sm bg-muted/55">
						<span
							className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(-45deg,currentColor_0,currentColor_1px,transparent_0,transparent_4px)] text-muted-foreground opacity-20"
							aria-hidden="true"
						/>
						<Progress
							value={navigation.usage.value}
							className="absolute inset-0 h-full rounded-none bg-transparent [&_[data-slot=progress-indicator]]:rounded-none [&_[data-slot=progress-indicator]]:bg-warning"
						/>
					</div>
					<div className="flex min-w-0 items-center justify-between gap-2 text-[11px] leading-none">
						<span className="flex items-center gap-1 whitespace-nowrap">
							<strong>{navigation.usage.value}%</strong>{" "}
							<span className="text-muted-foreground">Used</span>
						</span>
						<span className="flex items-center gap-1 pr-1 whitespace-nowrap">
							<strong>{100 - navigation.usage.value}%</strong>{" "}
							<span className="text-muted-foreground">Free</span>
						</span>
					</div>
				</div>
			</div>
		)
	}

	if (navigation.metrics) return <MetricsPanel metrics={navigation.metrics} />

	if (navigation.promo) {
		return (
			<div className="shrink-0 border-t p-3">
				<div className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3">
					<p className="text-xs font-medium">{navigation.promo.title}</p>
					<p className="text-[11px] leading-snug text-muted-foreground">
						{navigation.promo.description}
					</p>
					<Button size="sm" variant="outline" className="w-full">
						{navigation.promo.action}
					</Button>
				</div>
			</div>
		)
	}

	if (navigation.status) {
		return (
			<div className="shrink-0 border-t p-3">
				<div className="flex flex-col gap-1 rounded-lg border bg-muted/30 p-3">
					<div className="flex items-center justify-between gap-2">
						<p className="text-xs font-medium">{navigation.status.title}</p>
						<Badge variant="secondary">{navigation.status.value}</Badge>
					</div>
					<p className="text-[11px] leading-snug text-muted-foreground">
						{navigation.status.description}
					</p>
				</div>
			</div>
		)
	}

	if (navigation.notices) {
		return (
			<div className="shrink-0 border-t p-3">
				<div className="flex flex-col gap-2">
					{navigation.notices.map((notice) => (
						<div
							key={notice.title}
							className="rounded-lg border bg-muted/30 p-2.5"
						>
							<p className="text-[11px] font-medium">{notice.title}</p>
							<p className="mt-1 text-[10px] leading-snug text-muted-foreground">
								{notice.description}
							</p>
							<div className="mt-2 flex items-center justify-between gap-2">
								<Button
									size="sm"
									variant="link"
									className="h-auto p-0 text-[11px]"
								>
									Read more
								</Button>
								<Button size="sm" variant="ghost">
									Dismiss
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}

	return null
}

function CrumbMenu({
	value,
	options,
	onChange,
	heading,
	createLabel,
	showMark = false,
}: {
	value: string
	options: Array<{
		label: string
		description?: string
		icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
		mark?: string
	}>
	onChange: (value: string) => void
	heading?: string
	createLabel?: string
	showMark?: boolean
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="min-w-0 shrink">
					{showMark ? (
						<span
							className="size-3 rounded-full bg-primary"
							aria-hidden="true"
						/>
					) : null}
					<span className="truncate">{value}</span>
					<ChevronsUpDown data-icon="inline-end" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className={showMark ? "w-56" : "w-48"}>
				{heading ? <DropdownMenuLabel>{heading}</DropdownMenuLabel> : null}
				<DropdownMenuGroup>
					{options.map((option) => {
						const Icon = option.icon

						return (
							<DropdownMenuItem
								key={option.label}
								onSelect={() => onChange(option.label)}
								className={cn(option.label === value && "bg-accent")}
							>
								{showMark ? (
									<span
										className={cn(
											"size-5 shrink-0 rounded-full bg-primary",
											option.mark === "warning" && "bg-warning",
											option.mark === "chart" && "bg-chart-2"
										)}
										aria-hidden="true"
									/>
								) : null}
								{Icon ? <Icon /> : null}
								<span className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 text-left">
									<span className="truncate leading-none">{option.label}</span>
									{option.description ? (
										<span className="truncate text-xs leading-none text-muted-foreground">
											{option.description}
										</span>
									) : null}
								</span>
								{option.label === value ? (
									<Check className="ml-auto text-primary" />
								) : null}
							</DropdownMenuItem>
						)
					})}
				</DropdownMenuGroup>
				{createLabel ? (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Plus />
							{createLabel}
						</DropdownMenuItem>
					</>
				) : null}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function SearchDialog({
	open,
	onOpenChange,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
}) {
	return (
		<CommandDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Search"
			description="Search your workspace content."
		>
			<CommandInput placeholder="Search your workspace..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Navigation">
					{Array.from(
						new Set([
							...railNavigation.map((item) => item.label),
							...Object.values(sidebarNavigation).flatMap((section) =>
								section.groups.flatMap((group) =>
									group.items.map((item) => item.label)
								)
							),
						])
					).map((item) => (
						<CommandItem key={item} onSelect={() => onOpenChange(false)}>
							<Search />
							<span>{item}</span>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}

function CreateMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="sm">
					<Plus data-icon="inline-start" />
					<span className="sr-only sm:not-sr-only">Create</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Package />
						New Product
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ShoppingCart />
						New Order
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Users />
						New Customer
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Truck />
						Import Data
					</DropdownMenuItem>
					<DropdownMenuItem>
						<FileText />
						Generate Report
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const initialNotifications = [
	{
		id: 1,
		title: "Sarah Chen placed a new order #1284",
		description: "Order #1284 · 3 items, $127.50",
		time: "2 min ago",
		icon: ShoppingCart,
		unread: true,
	},
	{
		id: 2,
		title: "Low stock alert",
		description: "Wireless Headphones Pro has dropped below 10 units.",
		time: "15 min ago",
		icon: CircleAlert,
		badge: "Urgent",
		actions: ["Reorder", "Dismiss"],
		unread: true,
	},
	{
		id: 3,
		title: "Marcus Rivera left a review on Smart Watch Elite",
		description: "Great build quality and battery life exceeded expectations.",
		time: "1 hour ago",
		icon: Star,
		unread: true,
	},
	{
		id: 4,
		title: "Pending approval",
		description:
			"Bulk discount campaign for Q2 requires your approval before going live.",
		time: "2 hours ago",
		icon: ClipboardList,
		badge: "High",
		actions: ["Approve", "Review"],
		unread: true,
	},
	{
		id: 5,
		title: "Emily Watson · Shipment delivered #1279",
		description: "Order #1279 was delivered to Emily Watson successfully.",
		time: "3 hours ago",
		icon: CircleCheck,
		unread: true,
	},
	{
		id: 6,
		title: "3 new staff joined your store",
		description:
			"Sarah, James and Priya have been added to the Inventory team.",
		time: "4 hours ago",
		icon: Users,
		unread: true,
	},
	{
		id: 7,
		title: "Sales milestone reached!",
		description: "500 orders fulfilled this month. Keep up the great work!",
		time: "5 hours ago",
		icon: Star,
		badge: "500 orders",
		unread: false,
	},
	{
		id: 8,
		title: "Supplier meeting reminder",
		description: "Quarterly product catalog review with Acme Supplies.",
		time: "6 hours ago",
		icon: Warehouse,
		actions: ["Join", "Decline"],
		unread: false,
	},
	{
		id: 9,
		title: "@sarah_r shared a report with you",
		description: "inventory-march.pdf (3.2 MB)",
		time: "Yesterday",
		icon: FileText,
		unread: false,
	},
	{
		id: 10,
		title: "Payment processed",
		description: "Monthly subscription renewal, $49.00 charged.",
		time: "Yesterday",
		icon: CreditCard,
		badge: "$49.00",
		unread: false,
	},
	{
		id: 11,
		title: "New login detected",
		description: "A login from Chrome on macOS was detected in San Francisco.",
		time: "Yesterday",
		icon: ShieldCheck,
		actions: ["Review", "Dismiss"],
		unread: false,
	},
	{
		id: 12,
		title: "Deployment successful",
		description: "Storefront v2.4.1 deployed to production.",
		time: "2 days ago",
		icon: Rocket,
		badge: "Production",
		unread: false,
	},
]

function Notifications() {
	const [notifications, setNotifications] = React.useState(initialNotifications)
	const unreadCount = notifications.filter(
		(notification) => notification.unread
	).length

	function markAllAsRead() {
		setNotifications((items) =>
			items.map((item) => ({ ...item, unread: false }))
		)
	}

	function markAsRead(id: number) {
		setNotifications((items) =>
			items.map((item) => (item.id === id ? { ...item, unread: false } : item))
		)
	}

	function dismiss(id: number) {
		setNotifications((items) => items.filter((item) => item.id !== id))
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon-sm"
					aria-label="Notifications"
					className="relative"
				>
					<Bell />
					{unreadCount > 0 ? (
						<span
							className="absolute top-0.5 right-1 size-1.5 rounded-full bg-primary"
							aria-hidden="true"
						/>
					) : null}
				</Button>
			</SheetTrigger>
			<SheetContent className="w-full gap-0 p-0 sm:w-96 [&>button:last-child]:hidden">
				<SheetHeader className="border-b px-4 py-3">
					<div className="flex items-center justify-between gap-3">
						<div className="flex items-center gap-2">
							<SheetTitle className="text-sm">Notifications</SheetTitle>
							<Badge className="min-w-4 rounded-full px-1 py-0 text-[10px] leading-4">
								{unreadCount}
							</Badge>
						</div>
						<div className="flex items-center gap-0.5">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="icon-sm"
										aria-label="Mark all as read"
										onClick={markAllAsRead}
										disabled={unreadCount === 0}
									>
										<CheckCheck />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Mark all as read</TooltipContent>
							</Tooltip>
							<SheetClose asChild>
								<Button
									variant="ghost"
									size="icon-sm"
									aria-label="Close notifications"
								>
									<X />
								</Button>
							</SheetClose>
						</div>
					</div>
					<SheetDescription className="sr-only">
						View and manage your notifications
					</SheetDescription>
				</SheetHeader>
				<div className="min-h-0 grow">
					<ScrollArea className="h-full">
						<div className="flex flex-col">
							{notifications.map((notification) => {
								const Icon = notification.icon

								return (
									<div key={notification.id} className="relative border-b">
										{notification.unread ? (
											<span
												className="absolute inset-y-2 left-0 w-0.5 bg-primary"
												aria-hidden="true"
											/>
										) : null}
										<button
											type="button"
											className="flex w-full items-start gap-2 px-4 py-2 text-left transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset"
											onClick={() => markAsRead(notification.id)}
										>
											<span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
												<Icon className="size-3.5" />
											</span>
											<span className="flex min-w-0 flex-1 flex-col gap-1">
												<span className="flex items-start justify-between gap-2">
													<span className="text-xs leading-snug font-medium text-foreground">
														{notification.title}
													</span>
													{notification.badge ? (
														<Badge variant="secondary" className="shrink-0">
															{notification.badge}
														</Badge>
													) : null}
												</span>
												<span className="line-clamp-2 text-xs text-muted-foreground">
													{notification.description}
												</span>
												<span className="text-[11px] text-muted-foreground/70 tabular-nums">
													{notification.time}
												</span>
											</span>
										</button>
										{notification.actions ? (
											<div className="flex gap-1 px-12 pb-2">
												{notification.actions.map((action) => (
													<Button
														key={action}
														size="sm"
														variant={
															action === "Dismiss" || action === "Decline"
																? "ghost"
																: "outline"
														}
														onClick={() =>
															action === "Dismiss"
																? dismiss(notification.id)
																: markAsRead(notification.id)
														}
													>
														{action}
													</Button>
												))}
											</div>
										) : null}
									</div>
								)
							})}
						</div>
					</ScrollArea>
				</div>
				<SheetFooter className="border-t px-3 py-2">
					<Button
						variant="ghost"
						size="sm"
						className="w-full font-normal"
						onClick={markAllAsRead}
					>
						View all notifications
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

function PlaceholderContent() {
	return (
		<div className="grid min-h-full grid-cols-1 gap-3 p-3 md:grid-cols-3 md:grid-rows-[10.25rem_10.25rem_minmax(28rem,1fr)]">
			{Array.from({ length: 6 }, (_, index) => (
				<Card
					key={index}
					className="min-h-40 border-dashed bg-muted/20 shadow-none"
					aria-hidden="true"
				/>
			))}
			<Card
				className="min-h-[28rem] border-dashed bg-muted/20 shadow-none md:col-span-3"
				aria-hidden="true"
			/>
		</div>
	)
}

export default function AppShellLayout() {
	const [railActive, setRailActive] = React.useState("Inventory")
	const [activeItems, setActiveItems] =
		React.useState<Record<string, string>>(defaultActiveItems)
	const [innerOpen, setInnerOpen] = React.useState(true)
	const [searchOpen, setSearchOpen] = React.useState(false)
	const [workspace, setWorkspace] = React.useState(workspaces[0])
	const [area, setArea] = React.useState(inventoryAreas[0])
	const [environment, setEnvironment] = React.useState(environments[0])
	const contextualActive = activeItems[railActive] ?? railActive
	const activeRailItem =
		railNavigation.find((item) => item.label === railActive) ??
		railNavigation[1]
	const ActiveRailIcon = activeRailItem.icon

	function changeRailSection(section: string) {
		setRailActive(section)
		if (inventoryAreas.includes(section)) {
			setArea(section)
		}
	}

	function changeContextItem(item: string) {
		setActiveItems((current) => ({ ...current, [railActive]: item }))
	}

	React.useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault()
				setSearchOpen((current) => !current)
			}
		}

		document.addEventListener("keydown", onKeyDown)
		return () => document.removeEventListener("keydown", onKeyDown)
	}, [])

	return (
		<SidebarProvider
			defaultOpen
			className="h-svh min-h-0 [--header-height:50px]"
			style={
				{
					"--sidebar-width": "63px",
					"--sidebar-width-icon": "63px",
				} as React.CSSProperties
			}
		>
			<Sidebar
				collapsible="offcanvas"
				variant="inset"
				className="bg-background p-2 pr-0"
			>
				<SidebarHeader className="items-center justify-center px-1 py-1">
					<BrandMark />
				</SidebarHeader>
				<SidebarContent>
					<RailNavigation active={railActive} onChange={changeRailSection} />
				</SidebarContent>
				<SidebarFooter className="px-1 py-1">
					<ProfileMenu />
				</SidebarFooter>
			</Sidebar>

			<SidebarInset className="m-0 min-w-0 overflow-hidden rounded-xl border shadow-none md:my-2 md:mr-2 md:rounded-xl">
				<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b px-2">
					<SidebarTrigger
						className="md:hidden"
						aria-label="Toggle application navigation"
					/>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon-sm"
								className="lg:hidden"
								aria-label={`Open ${railActive.toLowerCase()} navigation`}
							>
								<ActiveRailIcon />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-64 p-0">
							<SheetHeader className="border-b">
								<SheetTitle>{railActive}</SheetTitle>
								<SheetDescription>
									Browse {railActive.toLowerCase()} tools and views.
								</SheetDescription>
							</SheetHeader>
							<ContextNavigation
								section={railActive}
								active={contextualActive}
								onChange={changeContextItem}
							/>
						</SheetContent>
					</Sheet>

					<Breadcrumb className="min-w-0">
						<BreadcrumbList className="flex-nowrap gap-0.5 sm:gap-1.5">
							<BreadcrumbItem className="min-w-0">
								<CrumbMenu
									value={workspace}
									options={organizationOptions}
									onChange={setWorkspace}
									heading="Organizations"
									createLabel="Create Organization"
									showMark
								/>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem className="hidden min-w-0 sm:flex">
								<CrumbMenu
									value={area}
									options={applicationOptions}
									onChange={setArea}
									heading="Applications"
									createLabel="Create Application"
								/>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden sm:block" />
							<BreadcrumbItem className="hidden min-w-0 md:flex">
								<CrumbMenu
									value={environment}
									options={environmentOptions}
									onChange={setEnvironment}
									heading="Environments"
								/>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					<div className="ml-auto flex items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
						<Button
							variant="outline"
							onClick={() => setSearchOpen(true)}
							className="hidden h-8 w-52 justify-start rounded-full font-normal text-muted-foreground sm:flex xl:w-80"
							aria-label="Search"
						>
							<Search data-icon="inline-start" />
							<span>Search...</span>
							<KbdGroup className="ml-auto">
								<Kbd>⌘</Kbd>
								<Kbd>K</Kbd>
							</KbdGroup>
						</Button>
					</div>
					<div className="ml-auto flex shrink-0 items-center gap-1">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon-sm"
									className="sm:hidden"
									onClick={() => setSearchOpen(true)}
									aria-label="Search"
								>
									<Search />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Search</TooltipContent>
						</Tooltip>
						<CreateMenu />
						<Notifications />
					</div>
				</header>

				<div className="relative flex min-h-0 flex-1">
					<aside
						className={cn(
							"hidden shrink-0 overflow-hidden border-r transition-[width] duration-200 motion-reduce:transition-none lg:flex",
							innerOpen ? "w-[200px]" : "w-0 border-r-0"
						)}
					>
						<div className="flex w-[200px] shrink-0">
							<ContextNavigation
								section={railActive}
								active={contextualActive}
								onChange={changeContextItem}
							/>
						</div>
					</aside>
					<button
						type="button"
						aria-label={
							innerOpen ? "Collapse inner sidebar" : "Expand inner sidebar"
						}
						onClick={() => setInnerOpen((current) => !current)}
						className={cn(
							"group/rail absolute top-1/2 hidden h-12 w-7 -translate-y-1/2 cursor-pointer items-center pl-2 transition-[left] duration-200 outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none lg:flex",
							innerOpen ? "left-[192px]" : "left-0"
						)}
					>
						<span className="flex flex-col items-center" aria-hidden="true">
							<span
								className={cn(
									"block h-2 w-0.5 origin-bottom rounded-t-full bg-foreground/40 transition-transform group-hover/rail:bg-foreground/60",
									innerOpen
										? "group-hover/rail:rotate-40"
										: "group-hover/rail:-rotate-40"
								)}
							/>
							<span
								className={cn(
									"block h-2 w-0.5 origin-top rounded-b-full bg-foreground/40 transition-transform group-hover/rail:bg-foreground/60",
									innerOpen
										? "group-hover/rail:-rotate-40"
										: "group-hover/rail:rotate-40"
								)}
							/>
						</span>
						<span className="pointer-events-none absolute left-full -ml-2 -translate-x-0.5 rounded-md border bg-foreground px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-background opacity-0 shadow-xs transition-all group-hover/rail:translate-x-0 group-hover/rail:opacity-100">
							{innerOpen ? "Collapse" : "Expand"}
						</span>
					</button>
					<main className="min-w-0 flex-1 overflow-auto">
						<PlaceholderContent />
					</main>
				</div>
			</SidebarInset>
			<SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
		</SidebarProvider>
	)
}
