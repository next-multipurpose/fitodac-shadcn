"use client"

import Image from "next/image"
import {
	BookOpenIcon,
	PanelLeftIcon,
	SettingsIcon,
	UserPlusIcon,
} from "lucide-react"

import { Button } from "@/registry/primitives/button"
import { Separator } from "@/registry/primitives/separator"
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

export function AppSidebar() {
	const { toggleSidebar } = useSidebar()

	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarHeader className="gap-1 pb-1">
				<div className="flex h-8 items-center gap-2 px-1">
					<div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-black p-1">
						<Image
							alt="ReUI"
							height={18}
							priority
							src="/brand/reui-mark.svg"
							width={18}
						/>
					</div>
					<span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">
						ReUI
					</span>
					<Button
						aria-label="Collapse sidebar"
						className="ml-auto group-data-[collapsible=icon]:hidden"
						onClick={toggleSidebar}
						size="icon-xs"
						variant="ghost"
					>
						<PanelLeftIcon />
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
							<SidebarMenuButton asChild tooltip={item.title}>
								<a href="#">
									<item.icon />
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
