"use client"

import * as React from "react"
import {
	Bell,
	BookOpen,
	Check,
	ChevronDown,
	ChevronRight,
	CircleDot,
	CircleHelp,
	Copy,
	CreditCard,
	Ellipsis,
	ExternalLink,
	Folder,
	House,
	LayoutDashboard,
	LogOut,
	Moon,
	PanelLeft,
	Palette,
	Search,
	Settings,
	SquareCheck,
	Sun,
	Trash2,
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
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
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
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/registry/primitives/popover"
import { cn } from "@/lib/utils"

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
	const [activeItem, setActiveItem] = React.useState("")
	const [issuesOpen, setIssuesOpen] = React.useState(false)

	return (
		<Sidebar collapsible="icon" className="p-2">
			<div className="flex h-full flex-col rounded-lg border bg-sidebar">
				<SidebarHeader className="p-2">
					<div className="flex items-center justify-between gap-2">
						<div className="flex min-h-10 items-center gap-2 px-0.5">
							<BrandMark />
							<span className="text-sm font-medium group-data-[collapsible=icon]:hidden">
								Acme Inc.
							</span>
						</div>
						<div className="flex items-center gap-0.5 group-data-[collapsible=icon]:flex-col">
							<Notifications />
							<SidebarTrigger aria-label="Toggle Sidebar" />
						</div>
					</div>
				</SidebarHeader>
				<SidebarContent className="scrollbar-none">
					<SidebarGroup className="py-2">
						<SidebarGroupContent className="relative">
							<SearchButton onClick={onSearch} />
						</SidebarGroupContent>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupLabel>Platform</SidebarGroupLabel>
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
																activeItem === item &&
																	"bg-accent text-foreground"
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
						</SidebarGroupContent>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupLabel>Active Projects</SidebarGroupLabel>
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
												<Progress
													value={project.progress}
													className={cn(
														"size-4 shrink-0 -rotate-90 bg-muted/50",
														project.color === "bg-violet-500" &&
															"[&>div]:bg-violet-500",
														project.color === "bg-blue-500" &&
															"[&>div]:bg-blue-500",
														project.color === "bg-emerald-500" &&
															"[&>div]:bg-emerald-500",
														project.color === "bg-orange-500" &&
															"[&>div]:bg-orange-500",
														project.color === "bg-rose-500" &&
															"[&>div]:bg-rose-500"
													)}
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
				<SidebarFooter className="p-2">
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
			</div>
		</Sidebar>
	)
}

function UserMenuContent() {
	const [theme, setTheme] = React.useState("system")

	React.useEffect(() => {
		const root = document.documentElement
		if (theme === "system") root.classList.remove("dark")
		else root.classList.toggle("dark", theme === "dark")
	}, [theme])

	return (
		<DropdownMenuContent side="right" align="end" className="w-60">
			<div className="flex gap-2 p-1.5">
				<Avatar className="size-8 rounded-md">
					<img
						src="https://i.pravatar.cc/48"
						alt="Claude"
						className="size-full object-cover"
					/>
					<AvatarFallback>CL</AvatarFallback>
				</Avatar>
				<span className="grid min-w-0 leading-tight">
					<span className="truncate font-semibold">Claude</span>
					<span className="truncate text-xs text-muted-foreground">
						claude@acmeinc.com
					</span>
				</span>
			</div>
			<DropdownMenuSeparator />
			<ActionItem icon={Settings}>Preferences</ActionItem>
			<ActionItem icon={CreditCard}>Billing &amp; Usage</ActionItem>
			<DropdownMenuSeparator />
			<ActionItem icon={CircleHelp}>Help &amp; Support</ActionItem>
			<ActionItem icon={BookOpen}>API Reference</ActionItem>
			<DropdownMenuSeparator />
			<div className="flex items-center gap-2 px-2 py-1.5 text-sm">
				<Palette />
				<span>Theme</span>
				<span className="ml-auto flex gap-0.5">
					{[
						["light", Sun],
						["dark", Moon],
						["system", PanelLeft],
					].map(([value, Icon]) => {
						const ThemeIcon = Icon as typeof Sun
						return (
							<button
								key={value as string}
								type="button"
								aria-label={`Use ${value} theme`}
								onClick={() => setTheme(value as string)}
								className={cn(
									"flex size-6 items-center justify-center rounded-md",
									theme === value && "bg-accent"
								)}
							>
								<ThemeIcon />
							</button>
						)
					})}
				</span>
			</div>
			<DropdownMenuSeparator />
			<ActionItem icon={LogOut}>Sign Out</ActionItem>
		</DropdownMenuContent>
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
		<SidebarProvider className="[&_[data-slot=sidebar-menu-button][data-active]]:bg-sidebar-accent [&_[data-slot=sidebar-menu-button][data-active]]:font-medium [&_[data-slot=sidebar-menu-button][data-active]]:text-sidebar-accent-foreground [&_[data-slot=sidebar-menu-button][data-active]]:hover:bg-sidebar-accent [&_[data-slot=sidebar-menu-button][data-active]>svg]:text-primary">
			<AppSidebar onSearch={() => setSearchOpen(true)} />
			<SidebarInset className="min-w-0 overflow-y-auto">
				<header className="flex h-12 shrink-0 items-center gap-2 px-4">
					<SidebarTrigger
						className="-ml-1 md:hidden"
						aria-label="Toggle Sidebar"
					/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:flex">
								<BreadcrumbLink href="#">
									<House />
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
