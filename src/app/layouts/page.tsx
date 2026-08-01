import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/primitives/card"
import { Button } from "@/registry/primitives/button"
import { LayoutDashboardIcon, LayoutGridIcon, LayoutListIcon, LayoutPanelLeftIcon, SettingsIcon } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("Metadata")
	return { title: t("layoutsTitle") }
}

const layouts = [
	{
		id: "dashboard-default",
		name: "Default Dashboard",
		description: "A classic dashboard layout with sidebar navigation, header, and main content area.",
		icon: LayoutDashboardIcon,
		href: "/layouts/dashboard-default",
	},
	{
		id: "dashboard-analytics",
		name: "Analytics Dashboard",
		description: "Data-focused layout with charts, metrics cards, and detailed reports section.",
		icon: LayoutGridIcon,
		href: "/layouts/dashboard-analytics",
	},
	{
		id: "dashboard-project",
		name: "Project Management",
		description: "Kanban boards, task lists, and project overview with sidebar navigation.",
		icon: LayoutListIcon,
		href: "/layouts/dashboard-project",
	},
	{
		id: "dashboard-settings",
		name: "Settings Panel",
		description: "Configuration layout with categorized settings, tabs, and preview pane.",
		icon: SettingsIcon,
		href: "/layouts/dashboard-settings",
	},
	{
		id: "dashboard-sidebar",
		name: "Collapsible Sidebar",
		description: "Responsive layout with collapsible sidebar, mobile drawer, and top navigation.",
		icon: LayoutPanelLeftIcon,
		href: "/layouts/dashboard-sidebar",
	},
]

export default async function LayoutsPage() {
	const t = await getTranslations("Layouts")

	return (
		<main className="mx-auto w-full max-w-6xl px-6 py-14">
			<div className="mb-10 flex flex-col gap-3">
				<p className="text-sm font-medium text-muted-foreground">
					{t("eyebrow")}
				</p>
				<h1 className="text-4xl font-semibold tracking-tight">
					{t("heading")}
				</h1>
				<p className="max-w-2xl text-muted-foreground">
					{t("summary", { count: layouts.length })}
				</p>
			</div>

			<div className="flex flex-col gap-6">
				{layouts.map((layout) => {
					const Icon = layout.icon
					return (
						<Card key={layout.id} className="w-full">
							<CardHeader className="flex flex-row items-start justify-between gap-4 p-6">
								<div className="flex flex-1 flex-col gap-3">
									<div className="flex items-center gap-3">
										<Icon className="size-6 text-primary" aria-hidden="true" />
										<CardTitle className="text-xl">{layout.name}</CardTitle>
									</div>
									<CardDescription className="text-base">{layout.description}</CardDescription>
								</div>
							</CardHeader>
							<CardContent />
							<CardFooter className="flex-row p-6">
								<Button asChild variant="outline">
									<Link href={layout.href}>
										{t("viewLayout")}
									</Link>
								</Button>
							</CardFooter>
						</Card>
					)
				})}
			</div>
		</main>
	)
}