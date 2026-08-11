"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import type { ComponentType, ReactNode } from "react"
import {
	BookOpen,
	Banknote,
	Calendar,
	ChartBarDecreasing,
	Check,
	CheckSquare,
	ChevronDown,
	ChevronRight,
	CirclePlus,
	Copy,
	CreditCard,
	Ellipsis,
	ExternalLink,
	HelpCircle,
	LayoutDashboard,
	ListTodo,
	LogOut,
	Mail,
	Palette,
	Settings,
	Star,
	Trash2,
	User,
	Users,
	ShoppingBag,
	GraduationCap,
	Forklift,
	Server,
	FolderOpen,
	HeartPulse,
	MessageSquare,
	Kanban,
	ReceiptText,
	Lock,
	Gauge

} from "lucide-react"

import { Avatar } from "@/registry/primitives/avatar"
import { Badge } from "@/registry/primitives/badge"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/primitives/breadcrumb"
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
	SidebarMenuBadge,
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"
import { AnimatedThemeToggler } from "@/components/animated-theme-toggler"
import { cn } from "@/lib/utils"

interface PlatformItem {
	label: string
	icon: ComponentType<{ className?: string }>
	href?: string
	children?: string[]
	badge?: string
}

const platformItems: PlatformItem[] = [
	{ label: "Default", icon: LayoutDashboard, href: "/dashboard/default" },
	{ label: "CRM", icon: ChartBarDecreasing, href: "/dashboard/crm" },
	{ label: "Finance", icon: Banknote, href: "/dashboard/finance" },
	{ label: "Analytics", icon: Gauge, href: "/dashboard/analytics" },
	{ label: "Productivity", icon: ListTodo, href: "/dashboard/productivity" },
	{ label: "E-commerce", icon: ShoppingBag, href: "/dashboard/ecommerce" },
	{ label: "Academy", icon: GraduationCap, href: "/dashboard/academy" },
	{ label: "Logistics", icon: Forklift, href: "/dashboard/logistics" },
	{ label: "Infrastructure", icon: Server, href: "/dashboard/infrastructure" },
	{ label: "File Manager", icon: FolderOpen, href: "/dashboard/file-manager" },
	{ label: "Patient Monitoring", icon: HeartPulse, href: "/dashboard/patient-monitoring" },
]

interface ResourceItem {
	label: string
	icon: ComponentType<{ className?: string }>
	color: string
	badge?: string
	href: string
}

const resources: ResourceItem[] = [
	{ label: "Email", icon: Mail, color: "bg-emerald-500", badge: "26", href: "/dashboard/mail" },
	{ label: "Chat", icon: MessageSquare, color: "bg-violet-500", href: "/dashboard/chat" },
	{ label: "Calendar", icon: Calendar, color: "bg-blue-500", href: "/dashboard/calendar" },
	{ label: "Kanban", icon: Kanban, color: "bg-amber-500", href: "/dashboard/kanban" },
	{ label: "Tasks", icon: CheckSquare, color: "bg-rose-500", href: "/dashboard/tasks" },
	{ label: "Invoice", icon: ReceiptText, color: "bg-rose-500", href: "/dashboard/invoice" },
	{ label: "Users", icon: Users, color: "bg-rose-500", href: "/dashboard/users" },
	{ label: "Roles", icon: Lock, color: "bg-rose-500", href: "/dashboard/roles" },
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

function WorkspaceSwitcher() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="z-40">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							aria-label="Switch workspace"
							className="h-9 gap-2 rounded-lg p-2 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-1! data-open:bg-sidebar-accent"
						>
							<BrandMark />
							<span className="sidebar-label font-semibold group-data-[collapsible=icon]:hidden">
								Acme Inc.
							</span>
							<Ellipsis className="ml-auto size-4 opacity-60 group-data-[collapsible=icon]:hidden" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="w-[239px]">
						<DropdownMenuLabel>Workspaces</DropdownMenuLabel>
						{[
							{ label: "Acme Inc.", letter: "U", tone: "bg-neutral-900" },
							{ label: "Keenthemes", letter: "K", tone: "bg-blue-500" },
							{ label: "Metronic", letter: "M", tone: "bg-rose-500" },
						].map((workspace) => (
							<DropdownMenuItem key={workspace.label}>
								<BrandMark
									letter={workspace.letter}
									className={workspace.tone}
								/>
								<span>{workspace.label}</span>
								{workspace.label === "Acme Inc." ? (
									<Check className="ml-auto size-4" />
								) : null}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="items-start">
							<span className="flex size-6 items-center justify-center rounded-md border">
								<CirclePlus className="size-4" />
							</span>
							<span className="grid text-left">
								<span>New Workspace</span>
								<span className="text-xs text-muted-foreground">
									Collaborate with others.
								</span>
							</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

function PlatformNavigation() {
	const pathname = usePathname()
	return (
		<SidebarGroup className="p-2">
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu className="gap-1">
					{platformItems.map((item) => {
						const Icon = item.icon

						return (
							<SidebarMenuItem key={item.label}>
								{item.children ? (
									<details className="group/nav" open>
										<SidebarMenuButton asChild className="h-8">
											<summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
												<Icon />
												<span className="sidebar-label">{item.label}</span>
												<ChevronRight className="ml-auto opacity-60 group-open/nav:hidden" />
												<ChevronDown className="ml-auto hidden opacity-60 group-open/nav:block" />
											</summary>
										</SidebarMenuButton>
										<SidebarMenuSub className="gap-0 border-0 py-0 pl-4">
											{item.children.map((child) => (
												<SidebarMenuSubItem key={child}>
													<SidebarMenuSubButton
														href="#"
														isActive={child === "Deployments"}
														className="h-8 px-2"
													>
														<span>{child}</span>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</details>
								) : (
									<SidebarMenuButton
										asChild
										isActive={item.href ? pathname === item.href : false}
										tooltip={item.label}
										className="h-8"
									>
										<a href={item.href ?? "#"}>
											<Icon />
											<span>{item.label}</span>
										</a>
									</SidebarMenuButton>
								)}
								{item.badge ? (
									<SidebarMenuBadge className="right-2 rounded-md border border-emerald-600/15 bg-emerald-500/10 px-1.5 text-[11px] font-normal text-emerald-700 group-data-[collapsible=icon]:hidden">
										{item.badge}
									</SidebarMenuBadge>
								) : null}
							</SidebarMenuItem>
						)
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}

function ResourceActions({ label }: { label: string }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuAction
					showOnHover
					aria-label={`Actions for ${label}`}
					className="top-1.5 right-1.5 max-md:opacity-100 data-open:bg-sidebar-accent"
				>
					<Ellipsis />
				</SidebarMenuAction>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="right" align="start" className="w-40">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<NativeMenuItem icon={ExternalLink}>Details</NativeMenuItem>
				<NativeMenuItem icon={Copy}>Copy Link</NativeMenuItem>
				<NativeMenuItem icon={Star}>Pin to Favorites</NativeMenuItem>
				<DropdownMenuSeparator />
				<NativeMenuItem icon={Trash2} destructive>
					Remove
				</NativeMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function ResourceNavigation() {
	return (
		<SidebarGroup className="p-2">
			<details className="native-collapsible-section group/resources" open>
				<SidebarGroupLabel asChild>
					<summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
						<span className="sidebar-label">Pages</span>
						<ChevronRight className="ml-auto group-open/resources:hidden" />
						<ChevronDown className="ml-auto hidden group-open/resources:block" />
					</summary>
				</SidebarGroupLabel>
				<div className="group-data-[collapsible=icon]:hidden">
					<SidebarGroupContent>
						<SidebarMenu>
							{resources.map((resource) => (
								<SidebarMenuItem key={resource.label}>
									<SidebarMenuButton asChild className="h-[33px] pr-8">
										<a href={resource.href}>
											<resource.icon className="size-4" />
											<span>{resource.label}</span>
											{resource.badge ? (
												<Badge
													variant="outline"
													className="h-4 rounded px-1 text-[10px] font-normal"
												>
													{resource.badge}
												</Badge>
											) : null}
										</a>
									</SidebarMenuButton>
									{/* <ResourceActions label={resource.label} /> */}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</div>
			</details>
		</SidebarGroup>
	)
}

function NativeMenuItem({
	icon: Icon,
	children,
	shortcut,
	destructive = false,
}: {
	icon: typeof User
	children: ReactNode
	shortcut?: string
	destructive?: boolean
}) {
	return (
		<DropdownMenuItem
			variant={destructive ? "destructive" : "default"}
			className="h-7"
		>
			<Icon className="size-4" />
			<span>{children}</span>
			{shortcut ? (
				<DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
			) : null}
		</DropdownMenuItem>
	)
}

function UserMenu() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="z-40">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							aria-label="Open user menu"
							size="lg"
							className="h-[38px] shrink-0 border border-border bg-background p-1.5 shadow-sm shadow-black/5 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:justify-center data-open:bg-accent"
						>
							<Avatar className="size-6 rounded-md transition-all group-data-[collapsible=icon]:size-7">
								<Image
									src="https://i.pravatar.cc/48"
									alt="Nick Bold"
									width={48}
									height={48}
									className="size-full rounded-md object-cover"
								/>
							</Avatar>
							<span className="sidebar-label min-w-0 flex-1 truncate text-left font-semibold group-data-[collapsible=icon]:hidden">
								Nick Bold
							</span>
							<Ellipsis className="ml-auto size-4 opacity-50 group-data-[collapsible=icon]:hidden" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="right" align="end" className="w-60">
						<div className="flex gap-2 p-1.5">
							<Avatar className="size-8 rounded-md">
								<Image
									src="https://i.pravatar.cc/48"
									alt="Nick Bold"
									width={48}
									height={48}
									className="size-full rounded-md object-cover"
								/>
							</Avatar>
							<span className="grid min-w-0 leading-tight">
								<span className="truncate font-semibold">Nick Bold</span>
								<span className="truncate text-xs text-muted-foreground">
									nick@acmeinc.com
								</span>
							</span>
						</div>
						<DropdownMenuSeparator />
						<NativeMenuItem icon={User} shortcut="⇧⌘P">
							Profile
						</NativeMenuItem>
						<NativeMenuItem icon={CreditCard}>
							Billing &amp; Usage
						</NativeMenuItem>
						<NativeMenuItem icon={Settings} shortcut="⌘,">
							Preferences
						</NativeMenuItem>
						<DropdownMenuSeparator />
						<NativeMenuItem icon={HelpCircle}>
							Help &amp; Support
						</NativeMenuItem>
						<NativeMenuItem icon={BookOpen}>API Reference</NativeMenuItem>
						<DropdownMenuSeparator />
						<div className="flex h-7 items-center gap-2 px-2 text-sm">
							<Palette className="size-4" />
							<span>Theme</span>
							<span className="ml-auto">
								<AnimatedThemeToggler />
							</span>
						</div>
						<DropdownMenuSeparator />
						<NativeMenuItem icon={LogOut} shortcut="⇧⌘Q">
							Sign Out
						</NativeMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

function AppSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="p-2">
				<WorkspaceSwitcher />
			</SidebarHeader>
			<SidebarContent className="h-[calc(100vh-4rem)] overflow-y-auto">
				<PlatformNavigation />
				<ResourceNavigation />
			</SidebarContent>
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
			className="group/rail fixed top-1/2 z-30 hidden h-12 w-7 -translate-y-1/2 cursor-pointer items-center pl-2 transition-[left] duration-200 ease-linear outline-none md:flex"
			style={{
				left: open ? "var(--sidebar-width)" : "var(--sidebar-width-icon)",
			}}
		>
			<span className="flex flex-col items-center">
				<span
					aria-hidden="true"
					className={cn(
						"block h-2 w-0.5 origin-bottom rounded-t-full bg-foreground/40 transition-all duration-100 ease-linear group-hover/rail:bg-foreground/60",
						open ? "group-hover/rail:rotate-40" : "group-hover/rail:-rotate-40"
					)}
				/>
				<span
					aria-hidden="true"
					className={cn(
						"block h-2 w-0.5 origin-top rounded-b-full bg-foreground/40 transition-all duration-100 ease-linear group-hover/rail:bg-foreground/60",
						open ? "group-hover/rail:-rotate-40" : "group-hover/rail:rotate-40"
					)}
				/>
			</span>
			<span className="pointer-events-none absolute left-full -ml-2 -translate-x-0.5 rounded-md border border-border bg-foreground px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-background opacity-0 shadow-xs shadow-black/5 transition-all duration-200 ease-out group-hover/rail:translate-x-0 group-hover/rail:opacity-100">
				{open ? "Collapse" : "Expand"}
			</span>
		</button>
	)
}

export default function AppShell({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarCollapseControl />
			<SidebarInset className="h-svh min-w-0 overflow-y-auto">
				<header className="flex h-12 shrink-0 items-center gap-2 px-4">
					<SidebarTrigger
						className="-ml-2 md:hidden"
						aria-label="Toggle sidebar"
					/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:flex">
								<BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Overview</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>

				<main className="flex flex-1 flex-col items-center gap-4 px-4 pb-4">
					<div className="w-full max-w-screen-xl shrink-0 h-full">
						{children}
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
