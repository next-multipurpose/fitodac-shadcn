"use client"

import * as React from "react"
import {
	BarChart3,
	Bell,
	Check,
	ChevronsUpDown,
	CircleAlert,
	ClipboardList,
	CreditCard,
	FileText,
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
	Search,
	Settings,
	ShieldCheck,
	ShoppingCart,
	Star,
	Sun,
	Tag,
	Truck,
	User,
	Users,
	Warehouse,
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
	SheetContent,
	SheetDescription,
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
	usage?: {
		title: string
		description: string
		value: number
	}
}

const sidebarNavigation: Record<string, NavigationSection> = {
	Home: {
		groups: [
			{
				label: "Workspace",
				items: [
					{ label: "Overview", icon: Home },
					{ label: "Activity", icon: ClipboardList },
					{ label: "Saved Views", icon: Star },
				],
			},
			{
				label: "Shortcuts",
				items: [
					{ label: "Reports", icon: FileText },
					{ label: "Team", icon: Users },
				],
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
				label: "Orders",
				items: [
					{ label: "All Orders", icon: ClipboardList, badge: "128" },
					{ label: "Drafts", icon: FileText },
					{ label: "Returns", icon: ShoppingCart, badge: "6" },
				],
			},
			{
				label: "Fulfillment",
				items: [
					{ label: "Shipments", icon: Truck },
					{ label: "Pickup Orders", icon: Package },
				],
			},
		],
	},
	Customers: {
		groups: [
			{
				label: "Customers",
				items: [
					{ label: "Directory", icon: Users },
					{ label: "Segments", icon: LayoutGrid },
					{ label: "Reviews", icon: Star, badge: "20" },
				],
			},
			{
				label: "Programs",
				items: [
					{ label: "Loyalty", icon: Star },
					{ label: "Permissions", icon: ShieldCheck },
				],
			},
		],
	},
	Messages: {
		groups: [
			{
				label: "Inbox",
				items: [
					{ label: "All Messages", icon: Inbox, badge: "8" },
					{ label: "Customer Support", icon: MessageSquare },
					{ label: "Team Messages", icon: Users },
				],
			},
			{
				label: "Manage",
				items: [
					{ label: "Templates", icon: FileText },
					{ label: "Automations", icon: Settings },
				],
			},
		],
	},
	Analytics: {
		groups: [
			{
				label: "Analytics",
				items: [
					{ label: "Overview", icon: BarChart3 },
					{ label: "Sales", icon: ShoppingCart },
					{ label: "Inventory", icon: Package },
					{ label: "Customers", icon: Users },
				],
			},
			{
				label: "Reports",
				items: [
					{ label: "Saved Reports", icon: FileText },
					{ label: "Exports", icon: ClipboardList },
				],
			},
		],
	},
	Settings: {
		groups: [
			{
				label: "Workspace Settings",
				items: [
					{ label: "General", icon: Settings },
					{ label: "Members", icon: Users },
					{ label: "Roles & Permissions", icon: ShieldCheck },
				],
			},
			{
				label: "Account",
				items: [
					{ label: "Billing", icon: CreditCard },
					{ label: "Preferences", icon: Palette },
				],
			},
		],
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
			<Palette />
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
					<Avatar className="size-6 rounded-md">
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
								nick@acmeinc.com
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
						Settings
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard />
						Billing
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
											<span className="truncate">{item.label}</span>
											{item.badge ? (
												<Badge variant="outline" className="ml-auto">
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
			{navigation.usage ? (
				<div className="shrink-0 border-t p-3">
					<div className="flex flex-col gap-2">
						<p className="text-xs font-medium text-warning">
							{navigation.usage.title}
						</p>
						<p className="text-[11px] leading-snug text-muted-foreground">
							{navigation.usage.description}
						</p>
						<Progress value={navigation.usage.value} className="h-1.5" />
						<div className="flex justify-between text-xs">
							<span>
								<strong>{navigation.usage.value}%</strong>{" "}
								<span className="text-muted-foreground">Used</span>
							</span>
							<span>
								<strong>{100 - navigation.usage.value}%</strong>{" "}
								<span className="text-muted-foreground">Free</span>
							</span>
						</div>
					</div>
				</div>
			) : null}
		</nav>
	)
}

function CrumbMenu({
	value,
	options,
	onChange,
	showMark = false,
}: {
	value: string
	options: string[]
	onChange: (value: string) => void
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
			<DropdownMenuContent align="start">
				<DropdownMenuGroup>
					{options.map((option) => (
						<DropdownMenuItem key={option} onSelect={() => onChange(option)}>
							{showMark ? (
								<span
									className="size-2 rounded-full bg-primary"
									aria-hidden="true"
								/>
							) : null}
							{option}
							{option === value ? <Check className="ml-auto" /> : null}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
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
					{[
						...railNavigation.map((item) => item.label),
						...Object.values(sidebarNavigation).flatMap((section) =>
							section.groups.flatMap((group) =>
								group.items.map((item) => item.label)
							)
						),
					].map((item) => (
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
				<DropdownMenuLabel>Create new</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Package />
						Product
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Tag />
						Category
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Truck />
						Supplier
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function Notifications() {
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
					<span
						className="absolute top-0.5 right-1 size-1.5 rounded-full bg-primary"
						aria-hidden="true"
					/>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Notifications</SheetTitle>
					<SheetDescription>
						Recent inventory activity and alerts.
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-3 px-4">
					{[
						["Low stock alert", "Wireless Keyboard has 4 units remaining."],
						["Catalog updated", "18 products were synced successfully."],
						["New review", "A customer left a five-star product review."],
					].map(([title, description]) => (
						<div key={title} className="flex gap-3 rounded-lg border p-3">
							<span
								className="mt-1 size-2 shrink-0 rounded-full bg-primary"
								aria-hidden="true"
							/>
							<span className="flex flex-col gap-1">
								<span className="text-sm font-medium">{title}</span>
								<span className="text-xs text-muted-foreground">
									{description}
								</span>
							</span>
						</div>
					))}
				</div>
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
									options={workspaces}
									onChange={setWorkspace}
									showMark
								/>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem className="hidden min-w-0 sm:flex">
								<CrumbMenu
									value={area}
									options={inventoryAreas}
									onChange={setArea}
								/>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden sm:block" />
							<BreadcrumbItem className="hidden min-w-0 md:flex">
								<CrumbMenu
									value={environment}
									options={environments}
									onChange={setEnvironment}
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
