"use client"

import * as React from "react"
import {
	Shield,
	Box,
	Code,
	FileCode,
	Cloud,
	GitBranch,
	Lock,
	BookOpen,
	HelpCircle,
	FileText,
	Video,
	MessageSquare,
	ChevronRight,
} from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/registry/primitives/badge"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/registry/primitives/navigation-menu"

const platformFeatures: {
	title: string
	href: string
	description: string
	icon: React.ReactNode
	isNew?: boolean
	showArrow?: boolean
}[] = [
	{
		title: "Hardcoded Secrets Detection",
		href: "/features/secrets-detection",
		description:
			"Find existing secrets across your DLC and block new secrets in pull requests",
		icon: <Shield className="h-5 w-5 text-green-600" />,
	},
	{
		title: "NextGen SCA - Software Composition Analysis",
		href: "/features/sca",
		description:
			"Combine integrity verification, anomaly detection, critical code monitoring & governance",
		icon: <Box className="h-5 w-5 text-red-600" />,
		isNew: true,
		showArrow: true,
	},
	{
		title: "Source Code Leakage Detection",
		href: "/features/code-leakage",
		description:
			"Identify suspicious behavior and detection proprietary code exposures",
		icon: <FileCode className="h-5 w-5 text-orange-600" />,
	},
	{
		title: "SAST - Static Application Security Testing",
		href: "/features/sast",
		description: "Zero in on vulnerabilities in custom developed code",
		icon: <Code className="h-5 w-5 text-teal-600" />,
		isNew: true,
	},
	{
		title: "Infrastructure As-Code",
		href: "/features/iac",
		description:
			"Prevent cloud misconfigurations and enforce security standards to Terraform",
		icon: <Cloud className="h-5 w-5 text-blue-600" />,
	},
	{
		title: "Source Control & Compliance",
		href: "/features/source-control",
		description:
			"Centrally manage governance and compliance across all your DevOps pipelines",
		icon: <GitBranch className="h-5 w-5 text-purple-600" />,
	},
	{
		title: "Code Tampering Prevention",
		href: "/features/code-tampering",
		description:
			"Centrally manage governance and compliance across all your DevOps pipelines",
		icon: <Lock className="h-5 w-5 text-pink-600" />,
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

export default function NavigationMenuSecurityDemo() {
	const isMobile = useIsMobile()

	return (
		<NavigationMenu viewport={isMobile} className="z-10">
			<NavigationMenuList className="flex-wrap">
				<NavigationMenuItem>
					<NavigationMenuTrigger>Platform</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-1 p-2 md:w-[600px] lg:w-[700px] lg:grid-cols-2">
							{platformFeatures.map((feature) => (
								<PlatformListItem
									key={feature.title}
									title={feature.title}
									href={feature.href}
									icon={feature.icon}
									isNew={feature.isNew}
									showArrow={feature.showArrow}
								>
									{feature.description}
								</PlatformListItem>
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

function PlatformListItem({
	title,
	children,
	href,
	icon,
	isNew,
	showArrow,
	...props
}: React.ComponentPropsWithoutRef<"li"> & {
	href: string
	icon: React.ReactNode
	isNew?: boolean
	showArrow?: boolean
}) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<a
					href={href}
					className="group relative flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-muted/50 focus:bg-muted/50"
				>
					<div className="absolute top-0 left-0 h-full w-0.5 bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
					<div className="mt-0.5 shrink-0">{icon}</div>
					<div className="min-w-0 flex-1">
						<div className="mb-1 flex items-center gap-2">
							<div className="text-sm leading-none font-medium">{title}</div>
							{isNew && (
								<Badge
									variant="default"
									className="h-5 rounded-full bg-blue-600 px-2 text-[10px] font-medium text-white"
								>
									NEW
								</Badge>
							)}
							{showArrow && (
								<ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
							)}
						</div>
						<p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
							{children}
						</p>
					</div>
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
