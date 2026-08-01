"use client"

import * as React from "react"
import {
	Zap,
	Shield,
	BarChart3,
	Users,
	BookOpen,
	HelpCircle,
	FileText,
	Video,
	MessageSquare,
	Rocket,
} from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/registry/primitives/navigation-menu"

const features: {
	title: string
	href: string
	description: string
	icon: React.ReactNode
}[] = [
	{
		title: "Analytics Dashboard",
		href: "/features/analytics",
		description:
			"Real-time insights and data visualization for your business metrics.",
		icon: <BarChart3 className="h-4 w-4" />,
	},
	{
		title: "Team Collaboration",
		href: "/features/collaboration",
		description: "Work together seamlessly with your team in real-time.",
		icon: <Users className="h-4 w-4" />,
	},
	{
		title: "Security & Compliance",
		href: "/features/security",
		description: "Enterprise-grade security with SOC 2 and GDPR compliance.",
		icon: <Shield className="h-4 w-4" />,
	},
	{
		title: "Automation",
		href: "/features/automation",
		description: "Streamline workflows with powerful automation tools.",
		icon: <Zap className="h-4 w-4" />,
	},
]

const resources: {
	title: string
	href: string
	description: string
	icon: React.ReactNode
}[] = [
	{
		title: "Documentation",
		href: "/docs",
		description: "Comprehensive guides and API references.",
		icon: <BookOpen className="h-4 w-4" />,
	},
	{
		title: "Help Center",
		href: "/help",
		description: "Find answers to common questions and issues.",
		icon: <HelpCircle className="h-4 w-4" />,
	},
	{
		title: "Blog",
		href: "/blog",
		description: "Latest updates, tips, and industry insights.",
		icon: <FileText className="h-4 w-4" />,
	},
	{
		title: "Video Tutorials",
		href: "/tutorials",
		description: "Step-by-step video guides to get you started.",
		icon: <Video className="h-4 w-4" />,
	},
	{
		title: "Community",
		href: "/community",
		description: "Join our community and connect with other users.",
		icon: <MessageSquare className="h-4 w-4" />,
	},
]

export default function NavigationMenuPlatformDemo() {
	const isMobile = useIsMobile()

	return (
		<NavigationMenu viewport={isMobile} className="z-10">
			<NavigationMenuList className="flex-wrap">
				<NavigationMenuItem>
					<NavigationMenuTrigger>Product</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<a
										className="flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
										href="/"
									>
										<Rocket className="mb-2 h-6 w-6" />
										<div className="mb-2 text-lg font-medium sm:mt-4">
											Our Platform
										</div>
										<p className="text-sm leading-tight text-muted-foreground">
											Powerful tools to grow your business and streamline
											operations.
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							{features.map((feature) => (
								<ListItem
									key={feature.title}
									title={feature.title}
									href={feature.href}
								>
									{feature.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Resources</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{resources.map((resource) => (
								<ListItemWithIcon
									key={resource.title}
									title={resource.title}
									href={resource.href}
									icon={resource.icon}
								>
									{resource.description}
								</ListItemWithIcon>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<a href="/pricing">Pricing</a>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden md:block">
					<NavigationMenuTrigger>Company</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[300px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<a href="/about">
										<div className="font-medium">About Us</div>
										<div className="text-muted-foreground">
											Learn about our mission and values.
										</div>
									</a>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<a href="/careers">
										<div className="font-medium">Careers</div>
										<div className="text-muted-foreground">
											Join our growing team.
										</div>
									</a>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<a href="/contact">
										<div className="font-medium">Contact</div>
										<div className="text-muted-foreground">
											Get in touch with our team.
										</div>
									</a>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<a href={href}>
					<div className="text-sm leading-none font-medium">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
}

function ListItemWithIcon({
	title,
	children,
	href,
	icon,
	...props
}: React.ComponentPropsWithoutRef<"li"> & {
	href: string
	icon: React.ReactNode
}) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<a
					href={href}
					className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
				>
					<div className="mt-0.5 text-muted-foreground">{icon}</div>
					<div className="flex-1">
						<div className="text-sm leading-none font-medium">{title}</div>
						<p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
							{children}
						</p>
					</div>
				</a>
			</NavigationMenuLink>
		</li>
	)
}
