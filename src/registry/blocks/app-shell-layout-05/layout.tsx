"use client"

import { useEffect, useMemo, useState, type CSSProperties } from "react"
import {
	Bell,
	ChartColumn,
	Check,
	ChevronDown,
	ChevronRight,
	CircleDot,
	CreditCard,
	Ellipsis,
	Folder,
	House,
	LayoutDashboard,
	LogOut,
	Mail,
	MessageSquare,
	Monitor,
	Moon,
	Palette,
	Plus,
	Search,
	Settings,
	Sparkles,
	SquareCheck,
	Sun,
	User,
	Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
	applyTheme,
	getStoredTheme,
	THEME_CHANGE_EVENT,
	THEME_STORAGE_KEY,
	type Theme,
} from "@/lib/theme"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/registry/primitives/avatar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/primitives/breadcrumb"
import { Button } from "@/registry/primitives/button"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/primitives/collapsible"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/primitives/dialog"
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
import { Input } from "@/registry/primitives/input"
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/registry/primitives/popover"
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
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarTrigger,
	useSidebar,
} from "@/registry/primitives/sidebar"
import {
	ToggleGroup,
	ToggleGroupItem,
} from "@/registry/primitives/toggle-group"

const navigation = [
	{ label: "Dashboard", icon: LayoutDashboard },
	{ label: "Projects", icon: Folder },
	{ label: "My Tasks", icon: SquareCheck },
	{
		label: "Issues",
		icon: CircleDot,
		children: ["All issues", "Assigned to me", "Created by me"],
	},
	{
		label: "Team",
		icon: Users,
		children: ["Members", "Groups", "Invitations"],
	},
	{ label: "Reports", icon: ChartColumn },
]

const members = [
	{
		name: "Daniel Parker",
		image: "https://i.pravatar.cc/80?img=12",
		online: true,
	},
	{
		name: "Matthew Reed",
		image: "https://i.pravatar.cc/80?img=11",
		online: true,
	},
	{
		name: "Ryan Brooks",
		image: "https://i.pravatar.cc/80?img=13",
		online: false,
	},
	{
		name: "Lena Dawson",
		image: "https://i.pravatar.cc/80?img=47",
		online: true,
	},
	{
		name: "Sophie Bennett",
		image: "https://i.pravatar.cc/80?img=32",
		online: false,
	},
	{
		name: "Liam Carter",
		image: "https://i.pravatar.cc/80?img=5",
		online: true,
	},
]

const searchableItems = [
	...navigation.map((item) => ({ label: item.label, group: "Platform" })),
	...members.map((member) => ({ label: member.name, group: "Team members" })),
]

function BrandMark() {
	return (
		<span
			className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground"
			aria-hidden="true"
		>
			<svg viewBox="0 0 50 50" className="size-4" fill="none">
				<circle cx="45" cy="5" r="5" fill="currentColor" />
				<path
					d="M5 5v27c0 7 6 13 13 13h14c7 0 13-6 13-13V18"
					stroke="currentColor"
					strokeWidth="9"
					strokeLinecap="round"
				/>
			</svg>
		</span>
	)
}

function Notifications() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon-sm"
					aria-label="Notifications"
					className="relative text-zinc-200 hover:bg-zinc-800 hover:text-zinc-50"
				>
					<Bell />
					<span className="absolute top-1 right-1 size-1.5 rounded-full bg-zinc-100" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" side="right" className="w-80 p-0">
				<PopoverHeader className="border-b p-4">
					<PopoverTitle>Notifications</PopoverTitle>
					<PopoverDescription>You have 3 unread updates.</PopoverDescription>
				</PopoverHeader>
				<div className="flex flex-col p-2">
					{[
						["Project Aurora was updated", "2 minutes ago"],
						["Lena mentioned you in an issue", "18 minutes ago"],
						["Weekly report is ready", "1 hour ago"],
					].map(([title, time]) => (
						<button
							key={title}
							type="button"
							className="flex flex-col gap-1 rounded-md px-3 py-2 text-left hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
						>
							<span className="text-sm font-medium">{title}</span>
							<span className="text-xs text-muted-foreground">{time}</span>
						</button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}

function SearchDialog() {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState("")
	const results = useMemo(() => {
		const normalized = query.trim().toLowerCase()
		return normalized
			? searchableItems.filter((item) =>
					item.label.toLowerCase().includes(normalized)
				)
			: searchableItems.slice(0, 6)
	}, [query])

	useEffect(() => {
		function handleShortcut(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault()
				setOpen(true)
			}
		}

		window.addEventListener("keydown", handleShortcut)
		return () => window.removeEventListener("keydown", handleShortcut)
	}, [])

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					id="layout-05-search"
					variant="outline"
					className="relative h-8 w-full justify-start border-0 bg-zinc-800 pl-7 font-normal text-zinc-300 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:pl-4! group-data-[collapsible=icon]:text-transparent hover:bg-zinc-700 hover:text-white"
				>
					<Search className="pointer-events-none absolute left-2 opacity-60" />
					Search...
					<kbd className="pointer-events-none absolute right-2 rounded bg-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-200 group-data-[collapsible=icon]:hidden">
						⌘K
					</kbd>
				</Button>
			</DialogTrigger>
			<DialogContent className="top-[28%] gap-0 p-0 sm:max-w-xl">
				<DialogHeader className="sr-only">
					<DialogTitle>Search</DialogTitle>
					<DialogDescription>Search your workspace content.</DialogDescription>
				</DialogHeader>
				<div className="flex items-center border-b px-4">
					<Search className="size-4 text-muted-foreground" />
					<Input
						autoFocus
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search projects, tasks, or people..."
						className="h-12 border-0 bg-transparent shadow-none focus-visible:ring-0"
					/>
				</div>
				<div className="max-h-72 overflow-y-auto p-2">
					{results.length ? (
						results.map((result) => (
							<button
								key={`${result.group}-${result.label}`}
								type="button"
								onClick={() => setOpen(false)}
								className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
							>
								<span>{result.label}</span>
								<span className="text-xs text-muted-foreground">
									{result.group}
								</span>
							</button>
						))
					) : (
						<p className="p-6 text-center text-sm text-muted-foreground">
							No results found.
						</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}

function PlatformNavigation() {
	const [active, setActive] = useState("Dashboard")

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{navigation.map((item) => {
						const Icon = item.icon

						if (item.children) {
							return (
								<Collapsible key={item.label} className="group/collapsible">
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton tooltip={item.label}>
												<Icon />
												<span>{item.label}</span>
												<ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.children.map((child) => (
													<SidebarMenuSubItem key={child}>
														<SidebarMenuSubButton
															href="#"
															onClick={(event) => {
																event.preventDefault()
																setActive(child)
															}}
															isActive={active === child}
														>
															<span>{child}</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							)
						}

						return (
							<SidebarMenuItem key={item.label}>
								<SidebarMenuButton
									asChild
									isActive={active === item.label}
									tooltip={item.label}
								>
									<a
										href="#"
										onClick={(event) => {
											event.preventDefault()
											setActive(item.label)
										}}
									>
										<Icon />
										<span>{item.label}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}

function MemberMenu({ name }: { name: string }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuAction showOnHover aria-label={`Actions for ${name}`}>
					<Ellipsis />
				</SidebarMenuAction>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="right" align="start" className="w-44">
				<DropdownMenuLabel>{name}</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User /> View profile
					</DropdownMenuItem>
					<DropdownMenuItem>
						<MessageSquare /> Send message
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Mail /> Send email
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function TeamMembers() {
	return (
		<Collapsible
			defaultOpen
			className="group/members group-data-[collapsible=icon]:hidden"
		>
			<SidebarGroup>
				<SidebarGroupLabel asChild>
					<CollapsibleTrigger>
						Team Members
						<ChevronDown className="ml-auto transition-transform group-data-[state=closed]/members:-rotate-90" />
					</CollapsibleTrigger>
				</SidebarGroupLabel>
				<CollapsibleContent>
					<SidebarGroupContent>
						<SidebarMenu>
							{members.map((member) => (
								<SidebarMenuItem key={member.name}>
									<SidebarMenuButton asChild>
										<a href="#" onClick={(event) => event.preventDefault()}>
											<span className="relative shrink-0">
												<Avatar className="size-5">
													<AvatarImage src={member.image} alt={member.name} />
													<AvatarFallback>
														{member.name.slice(0, 2)}
													</AvatarFallback>
												</Avatar>
												<span
													aria-hidden="true"
													className={cn(
														"absolute right-0 bottom-0 size-2 rounded-full border border-zinc-900",
														member.online ? "bg-emerald-500" : "bg-zinc-500"
													)}
												/>
											</span>
											<span>{member.name}</span>
										</a>
									</SidebarMenuButton>
									<MemberMenu name={member.name} />
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	)
}

function CreditsPanel() {
	return (
		<SidebarGroup className="mt-auto overflow-hidden group-data-[collapsible=icon]:hidden">
			<div className="mx-auto w-full shrink-0 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900/90">
				<div className="flex items-center gap-1.5 px-3 py-2">
					<Sparkles className="size-3.5 text-yellow-500" />
					<span className="text-xs font-semibold text-yellow-500">
						AI Credits
					</span>
				</div>
				<div className="flex flex-col gap-2.5 border-t border-zinc-700 p-3">
					<p className="text-xs leading-snug text-zinc-400">
						Usage resets at the end of your billing cycle.
					</p>
					<Progress
						value={82}
						className="h-1.5 bg-zinc-700 [&_[data-slot=progress-indicator]]:bg-emerald-500"
					/>
					<div className="flex items-center justify-between text-xs leading-none">
						<span className="flex items-center gap-1">
							<strong className="text-zinc-100 tabular-nums">82%</strong>
							<span className="text-zinc-400">Used</span>
						</span>
						<span className="flex items-center gap-1">
							<strong className="text-zinc-100 tabular-nums">18%</strong>
							<span className="text-zinc-400">Free</span>
						</span>
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" size="sm" className="w-full">
								Upgrade Plan
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Upgrade your plan</DialogTitle>
								<DialogDescription>
									Choose a plan with more AI credits. This demo does not start a
									purchase.
								</DialogDescription>
							</DialogHeader>
							<div className="rounded-lg border p-4">
								<p className="font-medium">Pro workspace</p>
								<p className="text-sm text-muted-foreground">
									20,000 AI credits per month
								</p>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</SidebarGroup>
	)
}

type ColorMode = Theme | "system"

const organizations = [
	{ name: "Acme Corp", color: "bg-gradient-to-br from-violet-500 to-pink-500" },
	{ name: "Vercel", color: "bg-cyan-500" },
	{ name: "OpenAI", color: "bg-amber-500" },
]

function AccountMenu() {
	const { isMobile } = useSidebar()
	const [organization, setOrganization] = useState("Acme Corp")
	const [colorMode, setColorMode] = useState<ColorMode>("system")

	useEffect(() => {
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

	const organizationColor =
		organizations.find((item) => item.name === organization)?.color ??
		organizations[0].color

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							aria-label="Open workspace menu"
							className="h-10 bg-transparent"
						>
							<Avatar className="size-7 rounded-md">
								<AvatarImage
									src="https://i.pravatar.cc/80?img=3"
									alt="Nick Bold"
								/>
								<AvatarFallback>NB</AvatarFallback>
							</Avatar>
							<span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
								<span className="truncate text-xs font-medium text-zinc-100">
									Nick Bold
								</span>
								<span className="flex items-center gap-1 truncate text-[10px] text-zinc-400">
									<span
										className={cn(
											"size-3 shrink-0 rounded-full",
											organizationColor
										)}
									/>
									{organization}
								</span>
							</span>
							<Ellipsis className="ml-auto opacity-50" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						side={isMobile ? "top" : "right"}
						align={isMobile ? "start" : "end"}
						className="w-60"
					>
						<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
							Organizations
						</DropdownMenuLabel>
						<DropdownMenuGroup>
							{organizations.map((item) => (
								<DropdownMenuItem
									key={item.name}
									onSelect={() => setOrganization(item.name)}
								>
									<span className={cn("size-5 rounded-full", item.color)} />
									<span>{item.name}</span>
									{organization === item.name ? (
										<Check className="ml-auto" />
									) : null}
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
							<DropdownMenuItem>
								<User /> Profile
								<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CreditCard /> Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings /> Preferences
							</DropdownMenuItem>
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
									className="size-6 min-w-6 rounded-full px-0 data-[state=on]:bg-background data-[state=on]:shadow-xs"
								>
									<Sun />
								</ToggleGroupItem>
								<ToggleGroupItem
									value="dark"
									aria-label="Use dark color mode"
									className="size-6 min-w-6 rounded-full px-0 data-[state=on]:bg-background data-[state=on]:shadow-xs"
								>
									<Moon />
								</ToggleGroupItem>
								<ToggleGroupItem
									value="system"
									aria-label="Use system color mode"
									className="size-6 min-w-6 rounded-full px-0 data-[state=on]:bg-background data-[state=on]:shadow-xs"
								>
									<Monitor />
								</ToggleGroupItem>
							</ToggleGroup>
						</div>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<LogOut /> Sign Out
								<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

function AppSidebar() {
	return (
		<Sidebar variant="inset" collapsible="icon">
			<div className="dark flex size-full min-h-0 flex-col bg-zinc-900 text-zinc-100">
				<SidebarHeader className="flex-row items-center justify-between px-2">
					<div className="flex min-h-10 items-center gap-2 px-0.5">
						<BrandMark />
						<span className="text-sm font-medium text-zinc-100 group-data-[collapsible=icon]:hidden">
							ReUI
						</span>
					</div>
					<div className="group-data-[collapsible=icon]:hidden">
						<Notifications />
					</div>
				</SidebarHeader>
				<SidebarContent className="scrollbar-none">
					<div className="py-2">
						<SidebarGroup className="py-0">
							<SidebarGroupContent>
								<SearchDialog />
							</SidebarGroupContent>
						</SidebarGroup>
					</div>
					<PlatformNavigation />
					<TeamMembers />
					<CreditsPanel />
				</SidebarContent>
				<SidebarFooter className="pb-2">
					<AccountMenu />
				</SidebarFooter>
			</div>
		</Sidebar>
	)
}

function SidebarCollapseControl() {
	const { open, toggleSidebar } = useSidebar()

	return (
		<button
			type="button"
			aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
			onClick={toggleSidebar}
			className="group/rail fixed top-1/2 z-30 hidden h-12 w-7 -translate-y-1/2 cursor-pointer items-center pl-2 transition-[left] duration-200 ease-linear outline-none motion-reduce:transition-none md:flex"
			style={{
				left: open ? "var(--sidebar-width)" : "var(--sidebar-width-icon)",
			}}
		>
			<span className="flex flex-col items-center">
				<span
					className={cn(
						"block h-2 w-0.5 origin-bottom rounded-t-full bg-foreground/40 transition-transform group-hover/rail:bg-foreground/60",
						open ? "group-hover/rail:rotate-40" : "group-hover/rail:-rotate-40"
					)}
				/>
				<span
					className={cn(
						"block h-2 w-0.5 origin-top rounded-b-full bg-foreground/40 transition-transform group-hover/rail:bg-foreground/60",
						open ? "group-hover/rail:-rotate-40" : "group-hover/rail:rotate-40"
					)}
				/>
			</span>
			<span className="pointer-events-none absolute left-full -ml-2 -translate-x-0.5 rounded-md border bg-foreground px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-background opacity-0 shadow-xs transition-all group-hover/rail:translate-x-0 group-hover/rail:opacity-100">
				{open ? "Collapse" : "Expand"}
			</span>
		</button>
	)
}

function PlaceholderPanel({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"rounded-lg border border-dashed border-border/40 bg-muted/40",
				className
			)}
		/>
	)
}

export default function AppShellLayout() {
	const sidebarStyle = {
		"--sidebar-width": "250px",
		"--sidebar-width-icon": "50px",
		"--sidebar": "var(--color-zinc-900)",
		"--sidebar-foreground": "var(--color-zinc-100)",
		"--sidebar-border":
			"color-mix(in oklab, var(--color-zinc-700) 52%, transparent)",
		"--sidebar-accent": "var(--color-zinc-800)",
		"--sidebar-accent-foreground": "var(--color-zinc-100)",
		"--sidebar-primary": "var(--color-zinc-100)",
		"--sidebar-primary-foreground": "var(--color-zinc-900)",
		"--sidebar-ring": "var(--color-zinc-400)",
		"--header-height": "50px",
	} as CSSProperties

	return (
		<SidebarProvider style={sidebarStyle} className="h-svh">
			<AppSidebar />
			<SidebarCollapseControl />
			<SidebarInset className="ml-0! min-w-0 overflow-y-auto">
				<header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center border-b bg-background px-4">
					<div className="flex min-w-0 items-center gap-2">
						<SidebarTrigger
							className="-ml-1 md:hidden"
							aria-label="Toggle sidebar"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:flex">
									<BreadcrumbLink
										href="#"
										className="flex items-center gap-1.5"
									>
										<House className="size-4" /> Home
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:flex">
									<span className="h-0.5 w-2 rounded-full bg-foreground/30" />
								</BreadcrumbSeparator>
								<BreadcrumbItem>
									<BreadcrumbPage>Overview</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<PlaceholderPanel className="aspect-video" />
						<PlaceholderPanel className="aspect-video" />
						<PlaceholderPanel className="aspect-video" />
					</div>
					<PlaceholderPanel className="min-h-[32rem] flex-1 md:min-h-0" />
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
