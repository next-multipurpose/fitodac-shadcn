"use client"

import * as React from "react"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/registry/primitives/navigation-menu"
import {
	BagIcon,
	BeltIcon,
	HatIcon,
	JewelryIcon,
	OtherIcon,
	SunglassesIcon,
} from "./icons"

type ListItemType = {
	title: string
	href?: string
	description?: string
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const accessoriesMenuItems: ListItemType[] = [
	{
		title: "Bags",
		href: "#",
		icon: BagIcon,
	},
	{
		title: "Jewelry",
		href: "#",
		icon: JewelryIcon,
	},
	{
		title: "Sunglasses",
		href: "#",
		icon: SunglassesIcon,
	},
	{
		title: "Hats & Beanies",
		href: "#",
		icon: HatIcon,
	},
	{
		title: "Belts",
		href: "#",
		icon: BeltIcon,
	},
	{
		title: "All Accessories",
		href: "#",
		icon: OtherIcon,
	},
]

const collectionItems = [
	{
		title: "Trends",
		href: "#",
		description: "Discover this summer's trendy products.",
	},
	{
		title: "Best Sellers",
		href: "#",
		description: "We've collected the best-selling products for you.",
	},
	{
		title: "New Arrivals",
		href: "#",
		description: "Discover the most favorited products.",
	},
]
import { useIsMobile } from "@/hooks/use-mobile"

export default function NavigationMenuCommerceDemo() {
	const isMobile = useIsMobile()

	return (
		<NavigationMenu viewport={isMobile} className="z-10">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Collections</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-0 md:w-[400px] lg:w-[600px] lg:grid-cols-2">
							{collectionItems.map((item) => (
								<a
									key={item.title}
									href={`${item.href}`}
									className="gap-2 space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
									onClick={(e) => e.preventDefault()}
								>
									<div className="text-sm leading-none font-medium">
										{item.title}
									</div>
									<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
										{item.description}
									</p>
								</a>
							))}
							<li className="col-start-2 row-span-3 row-start-1">
								<NavigationMenuLink asChild>
									<a
										href="#"
										className="block space-y-2"
										onClick={(e) => e.preventDefault()}
									>
										<img
											src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
											alt="..."
											className="aspect-4/3 w-96 rounded object-cover"
										/>
										<div className="space-y-1">
											<div className="text-sm leading-none font-medium">
												Timeless Classics
											</div>
											<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
												Elevate your style with essentials
											</p>
										</div>
									</a>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Accessories</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] list-none grid-cols-2 gap-3 lg:w-[300px]">
							{accessoriesMenuItems.map((item) => (
								<NavigationMenuLink asChild key={item.title}>
									<a
										href={`${item.href}`}
										className="flex justify-center gap-2 space-y-1 rounded-md p-3 text-center leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										onClick={(e) => e.preventDefault()}
									>
										{item.icon ? (
											<item.icon className="mx-auto size-8 text-muted-foreground" />
										) : null}
										<span className="block text-sm leading-none font-medium">
											{item.title}
										</span>
									</a>
								</NavigationMenuLink>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<a
							href="#"
							className={navigationMenuTriggerStyle()}
							onClick={(e) => e.preventDefault()}
						>
							Women
						</a>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<a
							href="#"
							className={navigationMenuTriggerStyle()}
							onClick={(e) => e.preventDefault()}
						>
							Men
						</a>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
