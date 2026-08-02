import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import {
	LayoutDashboardIcon,
	LayoutGridIcon,
	LayoutListIcon,
	LayoutPanelLeftIcon,
	SettingsIcon,
} from "lucide-react"

import { Button } from "@/registry/primitives/button"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/registry/primitives/resizable"

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("Metadata")
	return { title: t("layoutsTitle") }
}

const layouts = [
	{
		id: "app-shell-layout-01",
		name: "App Shell Layout",
		description:
			"A responsive application shell with a collapsible sidebar, header, breadcrumbs, and content area.",
		icon: LayoutPanelLeftIcon,
		href: "/layouts/app-shell-layout-01",
		preview: "/layouts/app-shell-layout-01",
	},
	{
		id: "dashboard-default",
		name: "Default Dashboard",
		description:
			"A classic dashboard layout with sidebar navigation, header, and main content area.",
		icon: LayoutDashboardIcon,
		href: "/layouts/app-shell-layout-02",
		preview: "/layouts/app-shell-layout-02",
	},
	{
		id: "app-shell-layout-03",
		name: "Workspace App Shell",
		description:
			"A ReUI-inspired workspace shell with project navigation, search, notifications, and account controls.",
		icon: LayoutPanelLeftIcon,
		href: "/layouts/app-shell-layout-03",
		preview: "/layouts/app-shell-layout-03",
	},
	{
		id: "dashboard-analytics",
		name: "Analytics Dashboard",
		description:
			"Data-focused layout with charts, metrics cards, and detailed reports section.",
		icon: LayoutGridIcon,
		href: "/layouts/app-shell-layout-04",
		preview: "/layouts/app-shell-layout-04",

	},
	{
		id: "dashboard-project",
		name: "Project Management",
		description:
			"Kanban boards, task lists, and project overview with sidebar navigation.",
		icon: LayoutListIcon,
		href: "/layouts/app-shell-layout-05",
		preview: "/layouts/app-shell-layout-05",
	}
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
						<section
							aria-labelledby={layout.id}
							key={layout.id}
							className="min-w-0 rounded-xl border border-border bg-card"
						>
							<div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-3 sm:px-6 sm:py-4">
								<div className="flex min-w-0 flex-1 flex-col gap-2">
									<div className="flex items-center gap-3">
										<Icon
											className="size-5 text-muted-foreground"
											aria-hidden="true"
										/>
										<h2 className="text-sm font-semibold" id={layout.id}>
											{layout.name}
										</h2>
									</div>
									<p className="text-sm text-muted-foreground">
										{layout.description}
									</p>
								</div>
								<Button asChild size="sm" variant="outline">
									<Link href={layout.href} target="_blank">{t("viewLayout")}</Link>
								</Button>
							</div>
							{layout.preview ? (
								<ResizablePanelGroup
									className="min-h-0 w-full flex-1 overflow-visible!"
									orientation="horizontal"
								>
									<ResizablePanel
										className="min-w-0"
										defaultSize="100"
										minSize="40"
									>
										<div className="flex h-150 items-center justify-center p-1">
											<iframe
												src={layout.preview}
												title={`${layout.name} preview`}
												className="size-full rounded-lg border border-border bg-background"
											/>
										</div>
									</ResizablePanel>
									<ResizableHandle withHandle className="w-0 bg-transparent translate-x-2 pl-1 [&>div]:w-1.5 [&>div]:h-10 [&:hover:focus>div]:h-14 [&:hover:active>div]:h-14 [&>div]:transition-all [&:hover>div]:bg-foreground/80" />
									<ResizablePanel
										className="w-0"
										defaultSize="0"
										minSize="0"
									/>
								</ResizablePanelGroup>
							) : null}
						</section>
					)
				})}
			</div>
		</main>
	)
}
