"use client"

import { Activity, Home, Search, Settings, Star, Upload } from "lucide-react"
import { useState } from "react"
import { Dock, DockItem, DockSeparator } from "@/registry/components/dock"

export function DockDefaultDemo() {
	const [active, setActive] = useState("home")

	return (
		<div className="flex w-full items-center justify-center">
			<Dock>
				<DockItem
					aria-label="Home"
					active={active === "home"}
					onClick={() => setActive("home")}
				>
					<Home className="h-5 w-5" />
				</DockItem>
				<DockItem
					aria-label="Search"
					active={active === "search"}
					onClick={() => setActive("search")}
				>
					<Search className="h-5 w-5" />
				</DockItem>
				<DockItem
					aria-label="Activity"
					active={active === "activity"}
					onClick={() => setActive("activity")}
				>
					<Activity className="h-5 w-5" />
				</DockItem>
				<DockSeparator />
				<DockItem
					aria-label="Settings"
					active={active === "settings"}
					onClick={() => setActive("settings")}
				>
					<Settings className="h-5 w-5" />
				</DockItem>
			</Dock>
		</div>
	)
}
