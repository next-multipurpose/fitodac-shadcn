"use client"

import {
	PanelLeftIcon,
	SettingsIcon,
	UserPlusIcon,
	BookOpenIcon,
} from "lucide-react"

import { Button } from "@/registry/primitives/button"
import { Separator } from "@/registry/primitives/separator"
import { cn } from "@/lib/utils"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	useSidebar,
} from "@/registry/primitives/sidebar"

import { NavMain } from "./nav-main"
import { SearchDialog } from "./search-dialog"
import { WorkspaceSwitcher } from "./workspace-switcher"

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

export function AppSidebar() {
	const { toggleSidebar } = useSidebar()

	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarHeader className="gap-1 pb-1">
				<div className="flex h-8 items-center gap-2 px-1">
					<BrandMark />
					<span className="text-sm font-semibold in-data-[state=collapsed]:hidden">
						Acme Inc.
					</span>
					<Button
						aria-label="Collapse sidebar"
						className="ml-auto"
						onClick={toggleSidebar}
						size="icon-xs"
						variant="ghost"
					>
						<PanelLeftIcon className="[&_svg]:transition-transform [&_svg]:duration-200 in-data-[state=collapsed]:[&_svg]:rotate-180" />
					</Button>
				</div>
				<div className="flex justify-center in-data-[state=expanded]:hidden">
					<Button
						aria-label="Expand sidebar"
						onClick={toggleSidebar}
						size="icon-xs"
						variant="ghost"
					>
						<PanelLeftIcon className="[&_svg]:rotate-180" />
					</Button>
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
