"use client"

import { useState } from "react"
import {
	CheckIcon,
	ChevronsUpDownIcon,
	PlusIcon,
	TriangleIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/registry/primitives/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/registry/primitives/sidebar"

const workspaces = ["Vercel", "Acme Inc", "Evil Corp"]

export function WorkspaceSwitcher() {
	const { isMobile } = useSidebar()
	const [workspace, setWorkspace] = useState("Vercel")

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="h-10 data-[state=open]:bg-sidebar-accent"
							tooltip={workspace}
						>
							<Avatar className="size-6 bg-black text-white">
								<AvatarFallback className="bg-black text-white">
									<TriangleIcon className="size-3 fill-current" />
								</AvatarFallback>
							</Avatar>
							<span className="font-medium">{workspace}</span>
							<ChevronsUpDownIcon className="ml-auto" />
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
									key={item}
									onSelect={() => setWorkspace(item)}
								>
									<Avatar className="size-5 bg-black text-white">
										<AvatarFallback className="bg-black text-[10px] text-white">
											{item.slice(0, 1)}
										</AvatarFallback>
									</Avatar>
									{item}
									{workspace === item ? (
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
