import {
	BarChart3,
	FileText,
	LayoutDashboard,
	LogOut,
	Settings,
	User,
} from "lucide-react"

import { SharedLayoutBg } from "@/registry/components/shared-layout-bg"

const menuItems = [
	{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, shortcut: "D" },
	{ id: "analytics", label: "Analytics", icon: BarChart3, shortcut: "A" },
	{ id: "reports", label: "Reports", icon: FileText, shortcut: "R" },
	{ id: "profile", label: "Profile", icon: User, shortcut: "P" },
]

const systemItems = [
	{ id: "settings", label: "Settings", icon: Settings, shortcut: "S" },
	{ id: "logout", label: "Log out", icon: LogOut, shortcut: "L" },
]

function NavSection({
	title,
	items,
	pillClassName,
}: {
	title: string
	items: typeof menuItems
	pillClassName: string
}) {
	return (
		<div className="mb-4">
			<p className="px-6 pb-2 text-xs font-medium text-muted-foreground/50 uppercase">
				{title}
			</p>
			<SharedLayoutBg as="ul" pillClassName={pillClassName} inset={16}>
				{items.map(({ id, label, icon: Icon, shortcut }) => (
					<li key={id}>
						<button
							type="button"
							className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left outline-none"
						>
							<Icon className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm font-medium text-foreground">
								{label}
							</span>
							<kbd className="ml-auto text-xs text-muted-foreground/50">
								⌘{shortcut}
							</kbd>
						</button>
					</li>
				))}
			</SharedLayoutBg>
		</div>
	)
}

export function SharedLayoutBgSidebarDemo() {
	return (
		<div className="flex min-h-[380px] w-full items-center justify-center">
			<nav className="w-full max-w-xs">
				<NavSection
					title="Menu"
					items={menuItems}
					pillClassName="rounded-xl bg-blue-500/12"
				/>
				<NavSection
					title="System"
					items={systemItems}
					pillClassName="rounded-xl bg-amber-500/12"
				/>
			</nav>
		</div>
	)
}
