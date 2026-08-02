"use client"

import { useState } from "react"
import {
	BarChart3Icon,
	ChevronDownIcon,
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
		active: true,
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
									<ChevronDownIcon
										className={cn(
											"ml-auto transition-transform group-data-[collapsible=icon]:hidden",
											!isOpen && "-rotate-90"
										)}
									/>
								) : null}
								{item.status ? (
									<span className="ml-auto size-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10 group-data-[collapsible=icon]:hidden" />
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
														"border bg-background shadow-xs"
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
