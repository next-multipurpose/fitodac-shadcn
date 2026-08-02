"use client"

import { useState } from "react"
import {
	BarChart3Icon,
	ChevronRightIcon,
	CreditCardIcon,
	LayoutGridIcon,
	LifeBuoyIcon,
	UsersIcon,
	ZapIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/registry/primitives/sidebar"

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

export function NavMain() {
	const [openItems, setOpenItems] = useState<Record<string, boolean>>({
		Customers: true,
	})

	return (
		<SidebarGroup className="pt-1">
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
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
		</SidebarGroup>
	)
}
