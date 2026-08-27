import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { LayoutDashboardIcon, LayoutPanelLeftIcon } from "lucide-react"

import { LayoutCategoryNav } from "./_components/layout-category-nav"
import { LayoutPreviewCard, type LayoutPreview } from "./_components/layout-preview-card"

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("Metadata")
	return { title: t("layoutsTitle") }
}

const layouts: LayoutPreview[] = [
	{
		id: "app-shell-layout-01",
		name: "App Shell Layout",
		description: "A responsive application shell with a collapsible sidebar, header, breadcrumbs, and content area.",
		icon: LayoutPanelLeftIcon,
		href: "/layouts/app-shell-layout-01",
		preview: "/layouts/app-shell-layout-01",
	},
	{
		id: "dashboard-default",
		name: "Default Dashboard",
		description: "A classic dashboard layout with sidebar navigation, header, and main content area.",
		icon: LayoutDashboardIcon,
		href: "/layouts/app-shell-layout-02",
		preview: "/layouts/app-shell-layout-02",
	},
	{
		id: "app-shell-layout-03",
		name: "Workspace App Shell",
		description: "A ReUI-inspired workspace shell with project navigation, search, notifications, and account controls.",
		icon: LayoutPanelLeftIcon,
		href: "/layouts/app-shell-layout-03",
		preview: "/layouts/app-shell-layout-03",
	},
]

export default async function LayoutsPage() {
	const t = await getTranslations("Layouts")

	return (
		<main className="mx-auto w-full max-w-6xl px-6 py-14">
			<div className="mb-10 flex flex-col gap-3">
				<p className="text-sm font-medium text-muted-foreground">{t("eyebrow")}</p>
				<h1 className="text-4xl font-semibold tracking-tight">{t("heading")}</h1>
				<p className="max-w-2xl text-muted-foreground">{t("summary", { count: layouts.length })}</p>
				<LayoutCategoryNav active="app-shells" />
			</div>
			<div className="flex flex-col gap-6">
				{layouts.map((layout) => <LayoutPreviewCard key={layout.id} layout={layout} viewLabel={t("viewLayout")} />)}
			</div>
		</main>
	)
}
