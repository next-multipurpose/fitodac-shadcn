import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { LogIn } from "lucide-react"

import { LayoutCategoryNav } from "../_components/layout-category-nav"
import { LayoutPreviewCard, type LayoutPreview } from "../_components/layout-preview-card"

export const metadata: Metadata = { title: "Login Layouts" }

const layouts: LayoutPreview[] = [
	{
		id: "login-layout-01",
		name: "Login template 01",
		description: "A split-screen login page with an account form and supporting visual panel.",
		icon: LogIn,
		href: "/layouts/login/login-01",
		preview: "/layouts/login/login-01",
	},
]

export default async function LoginLayoutsPage() {
	const t = await getTranslations("Layouts")

	return (
		<main className="mx-auto w-full max-w-6xl px-6 py-14">
			<div className="mb-10 flex flex-col gap-3">
				<p className="text-sm font-medium text-muted-foreground">Layouts</p>
				<h1 className="text-4xl font-semibold tracking-tight">Login Layouts</h1>
				<p className="max-w-2xl text-muted-foreground">Login layout starting points for authentication flows.</p>
				<LayoutCategoryNav active="login" />
			</div>
			<div className="flex flex-col gap-6">
				{layouts.map((layout) => <LayoutPreviewCard key={layout.id} layout={layout} viewLabel="View template" />)}
			</div>
		</main>
	)
}
