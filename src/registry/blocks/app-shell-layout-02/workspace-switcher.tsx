"use client"

import { useState } from "react"
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react"

import { Avatar } from "@/registry/primitives/avatar"
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

const workspaces = [
	{ name: "Vercel", image: "https://i.pravatar.cc/48?img=1" },
	{ name: "Acme Inc", image: "https://i.pravatar.cc/48?img=2" },
	{ name: "Evil Corp", image: "https://i.pravatar.cc/48?img=3" },
]

export function WorkspaceSwitcher() {
	const { isMobile } = useSidebar()
	const [workspace, setWorkspace] = useState(workspaces[0].name)

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
