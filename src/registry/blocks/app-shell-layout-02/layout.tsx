import type { CSSProperties } from "react"

import { SidebarInset, SidebarProvider } from "@/registry/primitives/sidebar"

import { AppHeader } from "./app-header"
import { AppSidebar } from "./app-sidebar"

const sidebarStyle = {
	"--sidebar-width": "16rem",
	"--sidebar-width-icon": "3rem",
	"--sidebar-border": "transparent",
} as CSSProperties

const wrapperClass =
	"[&_[data-slot=sidebar-inner]]:border [&_[data-slot=sidebar-inner]]:border-border/80 [&_[data-slot=sidebar-inner]]:shadow-xs [&_[data-slot=sidebar-inner]]:shadow-black/5 [&_[data-slot=sidebar-menu-button][data-active]]:bg-sidebar-accent [&_[data-slot=sidebar-menu-button][data-active]]:text-sidebar-accent-foreground [&_[data-slot=sidebar-menu-button][data-active]]:font-medium [&_[data-slot=sidebar-menu-button][data-active]]:hover:bg-sidebar-accent [&_[data-slot=sidebar-menu-button][data-active]>svg]:text-primary [&_[data-slot=sidebar-menu-button][data-active]>svg]:opacity-100 [&_[data-slot=sidebar-menu-button]>svg]:opacity-60 [&_[data-slot=sidebar-menu-button]:hover>svg]:opacity-100 [&_[data-slot=sidebar-menu-sub-button][data-active]]:bg-sidebar-accent [&_[data-slot=sidebar-menu-sub-button][data-active]]:text-sidebar-accent-foreground [&_[data-slot=sidebar-menu-sub-button][data-active]]:hover:bg-sidebar-accent"

export default function AppShellLayoutTwo() {
	return (
		<SidebarProvider className={wrapperClass} style={sidebarStyle}>
			<AppSidebar />
			<SidebarInset className="shadow-none">
				<AppHeader />
				<div className="flex flex-1 flex-col gap-4 py-2 pr-4 pl-2">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						{Array.from({ length: 3 }).map((_, index) => (
							<div
								aria-hidden="true"
								className="aspect-video rounded-lg border border-dashed border-border/40 bg-muted/40"
								key={index}
							/>
						))}
					</div>
					<div
						aria-hidden="true"
						className="min-h-screen flex-1 rounded-lg border border-dashed border-border/40 bg-muted/40 md:min-h-min"
					/>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
