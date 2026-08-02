"use client"

import * as React from "react"
import {
	Bell,
	Check,
	ChevronDown,
	ChevronRight,
	CircleDot,
	Copy,
	CreditCard,
	Ellipsis,
	ExternalLink,
	Folder,
	House,
	LayoutDashboard,
	LogOut,
	Monitor,
	Moon,
	Palette,
	Plus,
	Search,
	Settings,
	SquareCheck,
	Sun,
	Trash2,
	UserRound,
	Users,
	ChartNoAxesColumnIncreasing,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/registry/primitives/avatar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/primitives/breadcrumb"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/primitives/collapsible"
import {
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandDialog,
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
import { Kbd } from "@/registry/primitives/kbd"
import { Progress } from "@/registry/primitives/progress"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/registry/primitives/sidebar"
import { Button } from "@/registry/primitives/button"
import {
	ToggleGroup,
	ToggleGroupItem,
} from "@/registry/primitives/toggle-group"
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/registry/primitives/popover"
import { cn } from "@/lib/utils"
import {
	applyTheme,
	getStoredTheme,
	THEME_CHANGE_EVENT,
	THEME_STORAGE_KEY,
	type Theme,
} from "@/lib/theme"

const projects = [
	{ name: "Design System", color: "bg-violet-500", progress: 72 },
	{ name: "API Integration", color: "bg-blue-500", progress: 58 },
	{ name: "Mobile App", color: "bg-emerald-500", progress: 88 },
	{ name: "Analytics Dashboard", color: "bg-orange-500", progress: 30 },
	{ name: "Auth Module", color: "bg-rose-500", progress: 60 },
]

const navigation = [
	{ label: "Dashboard", icon: LayoutDashboard },
	{ label: "Projects", icon: Folder },
	{ label: "My Tasks", icon: SquareCheck },
]

const secondaryNavigation = [
	{ label: "Team", icon: Users },
	{ label: "Reports", icon: ChartNoAxesColumnIncreasing },
]

function BrandMark({
	letter = "U",
	className,
}: {
	letter?: string
	className?: string
}) {
	return (
		<span
			className={cn(
				"flex size-6 shrink-0 items-center justify-center rounded-[7px] bg-neutral-900 text-[13px] font-semibold text-white",
				className
			)}
			aria-hidden="true"
		>
			{letter}
		</span>
	)
}

function ActionItem({
	icon: Icon,
	children,
	destructive = false,
}: {
	icon: typeof Copy
	children: React.ReactNode
	destructive?: boolean
}) {
	return (
		<DropdownMenuItem variant={destructive ? "destructive" : "default"}>
			<Icon />
			<span>{children}</span>
		</DropdownMenuItem>
	)
}

function ProjectActions({ name }: { name: string }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuAction
					showOnHover
					aria-label={`Actions for ${name}`}
					className="top-1 right-1 max-md:opacity-100 data-open:bg-sidebar-accent"
				>
					<Ellipsis />
				</SidebarMenuAction>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="right" align="start" className="w-44">
				<DropdownMenuLabel>{name}</DropdownMenuLabel>
				<ActionItem icon={ExternalLink}>Open project</ActionItem>
				<ActionItem icon={Copy}>Copy link</ActionItem>
				<ActionItem icon={Check}>Mark complete</ActionItem>
				<DropdownMenuSeparator />
				<ActionItem icon={Trash2} destructive>
					Remove project
				</ActionItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function Notifications() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon-sm" aria-label="Notifications">
					<Bell />
					<span className="absolute top-1 right-1 size-1.5 rounded-full bg-primary" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-80">
				<PopoverHeader>
					<PopoverTitle>Notifications</PopoverTitle>
					<PopoverDescription>You are all caught up.</PopoverDescription>
				</PopoverHeader>
				<div className="mt-3 flex items-start gap-3 rounded-md border p-3 text-sm">
					<span className="mt-0.5 flex size-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
						<Check />
					</span>
					<span>
						<span className="block font-medium">All systems operational</span>
						<span className="text-muted-foreground">Updated just now</span>
					</span>
				</div>
			</PopoverContent>
		</Popover>
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
			title="Search workspace"
			description="Search your workspace content."
		>
			<CommandInput placeholder="Search your workspace..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					{["Dashboard", "Projects", "My Tasks", "Issues", "Team"].map(
						(item) => (
							<CommandItem key={item} onSelect={() => onOpenChange(false)}>
								<Search />
								{item}
							</CommandItem>
						)
					)}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}

function SearchButton({ onClick }: { onClick: () => void }) {
	return (
		<Button
			type="button"
			variant="outline"
			onClick={onClick}
			className="relative h-8 w-full justify-start pl-7 font-normal"
		>
			<Search className="pointer-events-none absolute left-2 opacity-50" />
			<span>Search...</span>
			<Kbd className="pointer-events-none absolute right-2">⌘K</Kbd>
		</Button>
	)
}

function AppSidebar({ onSearch }: { onSearch: () => void }) {
	const [activeItem, setActiveItem] = React.useState("Dashboard")
	const [issuesOpen, setIssuesOpen] = React.useState(false)

	return (
		<Sidebar variant="inset" collapsible="icon" className="bg-sidebar">
			<SidebarHeader className="p-2 bg-sidebar">
				<div className="flex items-center justify-between gap-2">
					<div className="flex min-h-10 items-center gap-2 px-0.5">
						<BrandMark />
						<span className="text-sm font-medium group-data-[collapsible=icon]:hidden">
							ReUI
						</span>
					</div>
					<div className="flex items-center gap-0.5 group-data-[collapsible=icon]:flex-col">
						<Notifications />
						<SidebarTrigger aria-label="Toggle Sidebar" />
					</div>
				</div>
			</SidebarHeader>
			
			<SidebarContent className="scrollbar-none bg-sidebar">
				<SidebarGroup className="py-2">
					<SidebarGroupContent className="relative">
						<SearchButton onClick={onSearch} />
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<div className="flex items-center justify-between">
						<SidebarGroupLabel>Platform</SidebarGroupLabel>
					</div>
					<SidebarGroupContent>
						<SidebarMenu>
							{navigation.map((item) => {
								const Icon = item.icon
								return (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											asChild
											isActive={activeItem === item.label}
											tooltip={item.label}
										>
											<a
												href={`#${item.label.toLowerCase().replaceAll(" ", "-")}`}
												onClick={() => setActiveItem(item.label)}
											>
												<Icon />
												<span>{item.label}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
						<SidebarMenu>
							<SidebarMenuItem>
								<Collapsible open={issuesOpen} onOpenChange={setIssuesOpen}>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton
											tooltip="Issues"
											isActive={activeItem === "Issues"}
											onClick={() => setActiveItem("Issues")}
										>
											<CircleDot />
											<span>Issues</span>
											{issuesOpen ? (
												<ChevronDown className="ml-auto" />
											) : (
												<ChevronRight className="ml-auto" />
											)}
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<div className="ml-5 flex flex-col gap-1 border-l pl-2">
											{["All Issues", "Assigned to me", "Labels"].map(
												(item) => (
													<button
														key={item}
														type="button"
														className={cn(
															"rounded-md px-2 py-1 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
															activeItem === item && "bg-accent text-foreground"
														)}
														onClick={() => setActiveItem(item)}
													>
														{item}
													</button>
												)
											)}
										</div>
									</CollapsibleContent>
								</Collapsible>
							</SidebarMenuItem>
						</SidebarMenu>
						<SidebarMenu>
							{secondaryNavigation.map((item) => {
								const Icon = item.icon
								return (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton
											asChild
											isActive={activeItem === item.label}
											tooltip={item.label}
										>
											<a
												href={`#${item.label.toLowerCase()}`}
												onClick={() => setActiveItem(item.label)}
											>
												<Icon />
												<span>{item.label}</span>
												<ChevronRight className="ml-auto" />
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<div className="flex items-center justify-between">
						<SidebarGroupLabel>Active Projects</SidebarGroupLabel>
						<ChevronDown className="mr-2 size-4 text-muted-foreground" />
					</div>
					<SidebarGroupContent>
						<SidebarMenu>
							{projects.map((project) => (
								<SidebarMenuItem key={project.name}>
									<SidebarMenuButton
										asChild
										tooltip={project.name}
										className="pr-8"
									>
										<a
											href={`#${project.name.toLowerCase().replaceAll(" ", "-")}`}
										>
											<ProjectProgress
												value={project.progress}
												color={project.color}
											/>
											<span className="min-w-0 truncate">{project.name}</span>
										</a>
									</SidebarMenuButton>
									<ProjectActions name={project.name} />
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<div className="mt-auto px-2 pb-2 group-data-[collapsible=icon]:hidden">
					<div className="rounded-lg border bg-muted/40 p-3">
						<div className="mb-2 text-xs font-semibold text-warning">
							Spending Limit
						</div>
						<p className="mb-2 text-xs leading-snug text-muted-foreground">
							Consumption and balance will reset at the end of the month.
						</p>
						<Progress value={82} className="h-1.5" />
						<div className="mt-2 flex justify-between text-xs">
							<span>
								<strong>82%</strong>{" "}
								<span className="text-muted-foreground">Used</span>
							</span>
							<span>
								<strong>18%</strong>{" "}
								<span className="text-muted-foreground">Free</span>
							</span>
						</div>
					</div>
				</div>
			</SidebarContent>
			<SidebarFooter className="p-2 bg-sidebar">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							aria-label="Open user menu"
							className="-ml-1 pr-0! group-data-[collapsible=icon]:ml-0! group-data-[collapsible=icon]:justify-center"
						>
							<Avatar className="size-6">
								<img
									src="https://i.pravatar.cc/48"
									alt="Claude"
									className="size-full object-cover"
								/>
								<AvatarFallback>CL</AvatarFallback>
							</Avatar>
							<span className="truncate text-sm font-medium group-data-[collapsible=icon]:hidden">
								Claude
							</span>
							<Ellipsis className="ml-auto opacity-50 group-data-[collapsible=icon]:hidden" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<UserMenuContent />
				</DropdownMenu>
			</SidebarFooter>
		</Sidebar>
	)
}

function ProjectProgress({ value, color }: { value: number; color: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			className="size-4 shrink-0 -rotate-90"
			aria-hidden="true"
		>
			<circle
				cx="8"
				cy="8"
				r="6"
				fill="none"
				className="stroke-muted-foreground/20"
				strokeWidth="2"
			/>
			<circle
				cx="8"
				cy="8"
				r="6"
				fill="none"
				className={cn(
					"[stroke-dasharray:37.7] [stroke-linecap:round]",
					color === "bg-violet-500" && "stroke-violet-500",
					color === "bg-blue-500" && "stroke-blue-500",
					color === "bg-emerald-500" && "stroke-emerald-500",
					color === "bg-orange-500" && "stroke-orange-500",
					color === "bg-rose-500" && "stroke-rose-500"
				)}
				strokeWidth="2"
				strokeDashoffset={37.7 * (1 - value / 100)}
			/>
		</svg>
	)
}

type ColorMode = Theme | "system"

const organizations = [
	{ name: "Claude", plan: "Enterprise", initials: "C" },
	{ name: "Vercel", plan: "Pro", initials: "V" },
	{ name: "OpenAI", plan: "Team", initials: "O" },
]

function UserMenuContent() {
	const [organization, setOrganization] = React.useState("Claude")
	const [colorMode, setColorMode] = React.useState<ColorMode>("system")

	React.useEffect(() => {
		const colorScheme = window.matchMedia("(prefers-color-scheme: dark)")

		function syncColorMode() {
			setColorMode(getStoredTheme() ?? "system")
		}

		function syncSystemTheme(event: MediaQueryListEvent) {
			if (!getStoredTheme()) {
				applyTheme(event.matches ? "dark" : "light")
			}
		}

		syncColorMode()
		document.addEventListener(THEME_CHANGE_EVENT, syncColorMode)
		colorScheme.addEventListener("change", syncSystemTheme)

		return () => {
			document.removeEventListener(THEME_CHANGE_EVENT, syncColorMode)
			colorScheme.removeEventListener("change", syncSystemTheme)
		}
	}, [])

	function selectColorMode(value: string) {
		if (value !== "light" && value !== "dark" && value !== "system") {
			return
		}

		if (value === "system") {
			try {
				localStorage.removeItem(THEME_STORAGE_KEY)
			} catch {
				// The system preference still applies when storage is unavailable.
			}
			applyTheme(
				window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light"
			)
		} else {
			try {
				localStorage.setItem(THEME_STORAGE_KEY, value)
			} catch {
				// The selected theme still applies when storage is unavailable.
			}
			applyTheme(value)
		}

		setColorMode(value)
	}

	return (
		<DropdownMenuContent side="right" align="end" className="w-60">
			<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
				Organizations
			</DropdownMenuLabel>
			<DropdownMenuGroup>
				{organizations.map((item) => (
					<DropdownMenuItem
						key={item.name}
						onSelect={() => setOrganization(item.name)}
						className="py-1"
					>
						<Avatar className="size-5">
							<AvatarFallback className="text-[10px]">
								{item.initials}
							</AvatarFallback>
						</Avatar>
						<span className="grid min-w-0 flex-1 leading-tight">
							<span className="truncate text-sm text-foreground">
								{item.name}
							</span>
							<span className="truncate text-xs text-muted-foreground">
								{item.plan}
							</span>
						</span>
						{organization === item.name && <Check className="ml-auto" />}
					</DropdownMenuItem>
				))}
				<DropdownMenuItem>
					<Plus />
					<span>New Organization</span>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
				Account
			</DropdownMenuLabel>
			<DropdownMenuGroup>
				<ActionItem icon={UserRound}>Profile</ActionItem>
				<ActionItem icon={CreditCard}>Billing</ActionItem>
				<ActionItem icon={Settings}>Preferences</ActionItem>
			</DropdownMenuGroup>
			<div
				className="flex h-8 items-center gap-2 px-2 text-sm"
				role="group"
				aria-label="Color mode"
			>
				<Palette />
				<span>Theme</span>
				<ToggleGroup
					type="single"
					value={colorMode}
					onValueChange={selectColorMode}
					size="sm"
					spacing={1}
					className="ml-auto rounded-full bg-muted/60 p-0.5"
				>
					<ToggleGroupItem
						value="light"
						aria-label="Use light color mode"
						className="size-6 min-w-6 rounded-full px-0 data-[state=on]:bg-sidebar data-[state=on]:shadow-xs"
					>
						<Sun />
					</ToggleGroupItem>
					<ToggleGroupItem
						value="dark"
						aria-label="Use dark color mode"
						className="size-6 min-w-6 rounded-full px-0 data-[state=on]:bg-sidebar data-[state=on]:shadow-xs"
					>
						<Moon />
					</ToggleGroupItem>
					<ToggleGroupItem
						value="system"
						aria-label="Use system color mode"
						className="size-6 min-w-6 rounded-full px-0 data-[state=on]:bg-sidebar data-[state=on]:shadow-xs"
					>
						<Monitor />
					</ToggleGroupItem>
				</ToggleGroup>
			</div>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem>
					<LogOut />
					<span>Sign Out</span>
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	)
}

function PlaceholderPanel({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={cn("rounded-lg border border-border/40 bg-sidebar", className)}
		/>
	)
}

export default function AppShellLayoutThree() {
	const [searchOpen, setSearchOpen] = React.useState(false)

	React.useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault()
				setSearchOpen(true)
			}
		}
		window.addEventListener("keydown", onKeyDown)
		return () => window.removeEventListener("keydown", onKeyDown)
	}, [])

	return (
		<SidebarProvider className="h-screen bg-sidebar [&_[data-slot=sidebar-menu-button]:hover>svg]:opacity-100 [&_[data-slot=sidebar-menu-button]>svg]:opacity-60 [&_[data-slot=sidebar-menu-button][data-active]]:border [&_[data-slot=sidebar-menu-button][data-active]]:border-border/60 [&_[data-slot=sidebar-menu-button][data-active]]:bg-sidebar [&_[data-slot=sidebar-menu-button][data-active]]:font-medium [&_[data-slot=sidebar-menu-button][data-active]]:text-foreground [&_[data-slot=sidebar-menu-button][data-active]]:shadow-xs [&_[data-slot=sidebar-menu-button][data-active]]:hover:bg-sidebar [&_[data-slot=sidebar-menu-button][data-active]>svg]:text-primary">
			<AppSidebar onSearch={() => setSearchOpen(true)} />
			
			<SidebarInset className="min-w-0 overflow-y-auto cn-sidebar-inset">
				<header className="flex h-12 shrink-0 items-center gap-2 px-4">
					<SidebarTrigger
						className="-ml-1 md:hidden"
						aria-label="Toggle Sidebar"
					/>
					
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:flex">
								<BreadcrumbLink href="#" className="flex items-center gap-2">
									<House size={16} />
									Home
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:flex" />
							<BreadcrumbItem>
								<BreadcrumbPage>Overview</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				
				<main className="flex flex-1 flex-col gap-4 px-4 pb-4">
					<div className="grid gap-4 md:grid-cols-3">
						<PlaceholderPanel className="aspect-video" />
						<PlaceholderPanel className="aspect-video" />
						<PlaceholderPanel className="aspect-video" />
					</div>
					<PlaceholderPanel className="min-h-[32rem] flex-1 md:min-h-0" />
				</main>
			</SidebarInset>
			<SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
		</SidebarProvider>
	)
}
