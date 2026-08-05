"use client"

import {
	Code,
	Database,
	Folder,
	LayoutDashboard,
	Settings,
	Terminal,
} from "lucide-react"
import { useState } from "react"
import { Dock, DockItem, DockSeparator } from "@/registry/components/dock"

export function DockApplicationLauncherDemo() {
	const [active, setActive] = useState("dashboard")

	return (
		<div className="flex w-full items-center justify-center">
			<Dock size={52} className="px-3 py-1.5">
				<DockItem
					aria-label="Dashboard"
					active={active === "dashboard"}
					onClick={() => setActive("dashboard")}
				>
					<LayoutDashboard className="h-6 w-6" />
				</DockItem>
				<DockItem
					aria-label="Files"
					active={active === "files"}
					onClick={() => setActive("files")}
				>
					<Folder className="h-6 w-6" />
				</DockItem>
				<DockItem
					aria-label="Database"
					active={active === "database"}
					onClick={() => setActive("database")}
				>
					<Database className="h-6 w-6" />
				</DockItem>
				<DockItem
					aria-label="Code"
					active={active === "code"}
					onClick={() => setActive("code")}
				>
					<Code className="h-6 w-6" />
				</DockItem>
				<DockSeparator />
				<DockItem
					aria-label="Terminal"
					active={active === "terminal"}
					onClick={() => setActive("terminal")}
				>
					<Terminal className="h-6 w-6" />
				</DockItem>
				<DockItem
					aria-label="Settings"
					active={active === "settings"}
					onClick={() => setActive("settings")}
				>
					<Settings className="h-6 w-6" />
				</DockItem>
			</Dock>
		</div>
	)
}
