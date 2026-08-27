import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/registry/primitives/button"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/registry/primitives/resizable"

export type LayoutPreview = {
	id: string
	name: string
	description: string
	icon: LucideIcon
	href: string
	preview: string
}

export function LayoutPreviewCard({ layout, viewLabel }: { layout: LayoutPreview; viewLabel: string }) {
	const Icon = layout.icon

	return (
		<section aria-labelledby={layout.id} className="min-w-0 rounded-xl border border-border bg-card">
			<div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-3 sm:px-6 sm:py-4">
				<div className="flex min-w-0 flex-1 flex-col gap-2">
					<div className="flex items-center gap-3">
						<Icon className="size-5 text-muted-foreground" aria-hidden="true" />
						<h2 className="text-sm font-semibold" id={layout.id}>{layout.name}</h2>
					</div>
					<p className="text-sm text-muted-foreground">{layout.description}</p>
				</div>
				<Button asChild size="sm" variant="outline">
					<Link href={layout.href} target="_blank">{viewLabel}</Link>
				</Button>
			</div>
			<ResizablePanelGroup className="min-h-0 w-full flex-1 overflow-visible!" orientation="horizontal">
				<ResizablePanel className="min-w-0" defaultSize="100" minSize="40">
					<div className="flex h-150 items-center justify-center p-1">
						<iframe src={layout.preview} title={`${layout.name} preview`} className="size-full rounded-lg border border-border bg-background" />
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle className="w-0 bg-transparent translate-x-2 pl-1 [&>div]:w-1.5 [&>div]:h-10 [&:hover:focus>div]:h-14 [&:hover:active>div]:h-14 [&>div]:transition-all [&:hover>div]:bg-foreground/80" />
				<ResizablePanel className="w-0" defaultSize="0" minSize="0" />
			</ResizablePanelGroup>
		</section>
	)
}
