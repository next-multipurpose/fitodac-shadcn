"use client"

import type { CSSProperties, ReactNode } from "react"
import * as React from "react"
import {
	BarChart3Icon,
	BookOpenIcon,
	ChevronRightIcon,
	CreditCardIcon,
	LayoutGridIcon,
	LifeBuoyIcon,
	MoonIcon,
	PanelLeftIcon,
	SearchIcon,
	SettingsIcon,
	SunIcon,
	UserPlusIcon,
	UsersIcon,
	ZapIcon,
	CheckIcon,
	ChevronsUpDownIcon,
	PlusIcon,
} from "lucide-react"

import { Avatar } from "@/registry/primitives/avatar"
import { Button } from "@/registry/primitives/button"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/primitives/breadcrumb"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/registry/primitives/dialog"
import { Input } from "@/registry/primitives/input"
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/registry/primitives/item"
import { Kbd } from "@/registry/primitives/kbd"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"
import { Separator } from "@/registry/primitives/separator"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarTrigger,
	SidebarRail,
	useSidebar,
} from "@/registry/primitives/sidebar"
import { cn } from "@/lib/utils"
import { getEffectiveTheme, toggleTheme, type Theme } from "@/lib/theme"

const sidebarStyle = {
	"--sidebar-width": "16rem",
	"--sidebar-width-icon": "3rem",
	"--sidebar-border": "transparent",
} as CSSProperties

const wrapperClass =
	"[&_[data-slot=sidebar-inner]]:border [&_[data-slot=sidebar-inner]]:border-border/80 [&_[data-slot=sidebar-inner]]:shadow-xs [&_[data-slot=sidebar-inner]]:shadow-black/5 [&_[data-slot=sidebar-menu-button][data-active]]:bg-sidebar-accent [&_[data-slot=sidebar-menu-button][data-active]]:text-sidebar-accent-foreground [&_[data-slot=sidebar-menu-button][data-active]]:font-medium [&_[data-slot=sidebar-menu-button][data-active]]:hover:bg-sidebar-accent [&_[data-slot=sidebar-menu-button][data-active]>svg]:text-primary [&_[data-slot=sidebar-menu-button][data-active]>svg]:opacity-100 [&_[data-slot=sidebar-menu-button]>svg]:opacity-60 [&_[data-slot=sidebar-menu-button]:hover>svg]:opacity-100 [&_[data-slot=sidebar-menu-sub-button][data-active]]:bg-sidebar-accent [&_[data-slot=sidebar-menu-sub-button][data-active]]:text-sidebar-accent-foreground [&_[data-slot=sidebar-menu-sub-button][data-active]]:hover:bg-sidebar-accent"

const secondaryNavigation = [
	{ title: "Settings", icon: SettingsIcon },
	{ title: "Invite Team", icon: UserPlusIcon },
	{ title: "Documentation", icon: BookOpenIcon },
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

const searchResults = [
	{ title: "Overview", icon: LayoutGridIcon },
	{ title: "Customers", icon: UsersIcon },
	{ title: "Subscriptions", icon: CreditCardIcon },
	{ title: "Revenue", icon: BarChart3Icon },
]

function SearchDialog() {
	const [open, setOpen] = React.useState(false)
	const [query, setQuery] = React.useState("")

	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault()
				setOpen((current) => !current)
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [])

	const filteredResults = searchResults.filter((result) =>
		result.title.toLowerCase().includes(query.toLowerCase())
	)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton
						variant="outline"
						className="h-8 w-full justify-start pl-7 font-normal transition-[width] duration-200 ease-linear in-data-[state=collapsed]:w-8! in-data-[state=collapsed]:pl-4! in-data-[state=collapsed]:text-transparent bg-background shadow-xs"
						tooltip="Search"
						onClick={() => setOpen(true)}
					>
						<SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 opacity-50" />
						<span>Search...</span>
						<Kbd className="absolute top-1/2 right-2 -translate-y-1/2 in-data-[state=collapsed]:hidden">
							⌘K
						</Kbd>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>

			<DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md" showCloseButton={false}>
				<DialogHeader className="sr-only">
					<DialogTitle>Search workspace</DialogTitle>
					<DialogDescription>
						Search navigation and workspace destinations.
					</DialogDescription>
				</DialogHeader>
				<div className="relative border-b">
					<SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						autoFocus
						aria-label="Search workspace"
						className="h-12 rounded-none border-0 pr-14 pl-10 shadow-none focus-visible:ring-0"
						placeholder="Search..."
						value={query}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<Kbd className="absolute top-1/2 right-4 -translate-y-1/2">ESC</Kbd>
				</div>
				<ItemGroup className="gap-1 p-2">
					{filteredResults.map((result) => {
						const Icon = result.icon
						return (
							<Item asChild key={result.title} size="sm" className="cursor-pointer px-2 py-2">
								<button type="button" onClick={() => setOpen(false)}>
									<ItemMedia>
										<Icon className="size-4 text-muted-foreground" />
									</ItemMedia>
									<ItemContent>
										<ItemTitle>{result.title}</ItemTitle>
									</ItemContent>
								</button>
							</Item>
						)
					})}
				</ItemGroup>
			</DialogContent>
		</Dialog>
	)
}

const workspaces = [
	{ name: "Vercel", image: "https://i.pravatar.cc/48?img=1" },
	{ name: "Acme Inc", image: "https://i.pravatar.cc/48?img=2" },
	{ name: "Evil Corp", image: "https://i.pravatar.cc/48?img=3" },
]

function WorkspaceSwitcher() {
	const { isMobile } = useSidebar()
	const [workspace, setWorkspace] = React.useState(workspaces[0].name)

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="default"
							className="in-data-[state=collapsed]:justify-center"
							tooltip={workspace}
						>
							<Avatar className="size-6">
								<img
									alt={workspace}
									src={
										workspaces.find((w) => w.name === workspace)?.image ||
										workspaces[0].image
									}
									className="aspect-square size-full object-cover"
								/>
							</Avatar>
							<span className="truncate text-sm font-medium in-data-[state=collapsed]:hidden">
								{workspace}
							</span>
							<ChevronsUpDownIcon className="ml-auto size-3.5 opacity-60 in-data-[state=collapsed]:hidden" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="start"
						className="w-56"
						side={isMobile ? "bottom" : "right"}
						sideOffset={8}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							Workspaces
						</DropdownMenuLabel>
						<DropdownMenuGroup>
							{workspaces.map((item) => (
								<DropdownMenuItem
									key={item.name}
									onSelect={() => setWorkspace(item.name)}
								>
									<Avatar className="size-5">
										<img
											alt={item.name}
											src={item.image}
											className="aspect-square size-full object-cover"
										/>
									</Avatar>
									{item.name}
									{workspace === item.name ? (
										<CheckIcon className="ml-auto" />
									) : null}
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<PlusIcon />
							Create workspace
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

const navigation = [
	{
		title: "Overview",
		icon: LayoutGridIcon,
		active: false,
	},
	{
		title: "Customers",
		icon: UsersIcon,
		defaultOpen: true,
		items: ["Segments", "Accounts", "Health Scores"],
	},
	{
		title: "Subscriptions",
		icon: CreditCardIcon,
		items: ["Plans", "Invoices", "Payment Methods"],
	},
	{
		title: "Revenue",
		icon: BarChart3Icon,
		status: true,
	},
	{
		title: "Automation",
		icon: ZapIcon,
	},
	{
		title: "Support",
		icon: LifeBuoyIcon,
	},
]

function NavMain() {
	const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({
		Customers: true,
	})

	return (
		<SidebarMenu>
			{navigation.map((item) => {
				const isOpen = openItems[item.title] ?? item.defaultOpen ?? false
				const Icon = item.icon

				return (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton
							aria-expanded={item.items ? isOpen : undefined}
							aria-current={item.active ? "page" : undefined}
							isActive={item.active}
							tooltip={item.title}
							onClick={
								item.items
									? () =>
											setOpenItems((current) => ({
												...current,
												[item.title]: !isOpen,
											}))
									: undefined
							}
						>
							<Icon />
							<span>{item.title}</span>
							{item.items ? (
								<ChevronRightIcon
									className={cn(
										"ml-auto size-4 shrink-0 opacity-60 transition-transform duration-200 group-data-[collapsible=icon]:hidden",
										isOpen && "rotate-90"
									)}
								/>
							) : null}
							{item.status ? (
								<div className="ml-auto flex items-center group-data-[collapsible=icon]:hidden">
									<div className="relative mr-1 size-1.5 rounded-full bg-emerald-500 before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-emerald-400 before:opacity-80 before:duration-1500 after:absolute after:inset-0 after:animate-ping after:rounded-full after:bg-emerald-400 after:opacity-40 after:delay-500 after:duration-1500" />
								</div>
							) : null}
						</SidebarMenuButton>

						{item.items && isOpen ? (
							<SidebarMenuSub className="gap-0 border-0 py-0">
								{item.items.map((subItem) => (
									<SidebarMenuSubItem key={subItem}>
										<SidebarMenuSubButton
											aria-current={
												subItem === "Accounts" ? "page" : undefined
											}
											className={cn(
												subItem === "Accounts" &&
													"bg-sidebar-accent font-medium"
											)}
											href="#"
											isActive={subItem === "Accounts"}
										>
											<span>{subItem}</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								))}
							</SidebarMenuSub>
						) : null}
					</SidebarMenuItem>
				)
			})}
		</SidebarMenu>
	)
}

function AppSidebar() {
	const { toggleSidebar } = useSidebar()

	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarHeader className="gap-1 pb-1">
				<div className="flex h-8 items-center gap-2 px-1">
					<BrandMark />
					<span className="text-sm font-semibold in-data-[state=collapsed]:hidden">
						Acme Inc.
					</span>
					

					<SidebarTrigger aria-label="Collapse sidebar" className="ml-auto hidden in-data-[state=expanded]:flex" />
				</div>
				
				<div className="flex justify-center in-data-[state=expanded]:hidden">
					<SidebarTrigger aria-label="Expand sidebar" />
				</div>
				<SearchDialog />
			</SidebarHeader>

			<SidebarContent>
				<NavMain />
			</SidebarContent>

			<SidebarFooter className="gap-1 pt-1">
				<SidebarMenu>
					{secondaryNavigation.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild tooltip={item.title} className="h-8">
								<a href="#">
									<item.icon className="size-3.5" />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
				<Separator className="my-1" />
				<WorkspaceSwitcher />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}

function ColorModeToggle() {
	const [theme, setTheme] = React.useState<Theme>("light")

	React.useEffect(() => {
		setTheme(getEffectiveTheme())
	}, [])

	function handleToggle() {
		setTheme(toggleTheme(theme))
	}

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			aria-label="Toggle color mode"
			onClick={handleToggle}
		>
			{theme === "dark" ? (
				<SunIcon className="size-4" />
			) : (
				<MoonIcon className="size-4" />
			)}
		</Button>
	)
}

function AppHeader() {
	return (
		<header className="flex h-12 shrink-0 items-center gap-2 pt-2 px-2 lg:justify-between">
			<SidebarTrigger className="-ml-1 md:hidden" />

			<nav aria-label="breadcrumb">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink className="flex items-center gap-2" href="#">
								<Avatar className="size-5">
									<img
										alt=""
										src="https://i.pravatar.cc/48"
										className="aspect-square size-full object-cover"
									/>
								</Avatar>
								Workspace
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink className="flex items-center gap-2" href="#">
								<Avatar className="size-5">
									<img
										alt=""
										src="https://i.pravatar.cc/48"
										className="aspect-square size-full object-cover"
									/>
								</Avatar>
								@shadcn
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Projects</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</nav>
			<ColorModeToggle />
		</header>
	)
}

export default function AppShellLayoutTwo() {
	return (
		<SidebarProvider className={wrapperClass} style={sidebarStyle}>
			<AppSidebar />
			<SidebarInset className="shadow-none">
				<AppHeader />
				<div className="flex flex-1 flex-col gap-4 py-2 pr-4 pl-2">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						{Array.from({ length: 3 }).map((_, index) => (
							<div
								aria-hidden="true"
								className="aspect-video rounded-lg border border-dashed border-border/40 bg-muted/40"
								key={index}
							/>
						))}
					</div>
					<div
						aria-hidden="true"
						className="min-h-screen flex-1 rounded-lg border border-dashed border-border/40 bg-muted/40 md:min-h-min"
					/>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
