import type { DemoEntry } from "@/demos/types"

import { DockApplicationLauncherDemo } from "./application-launcher"
import { DockDefaultDemo } from "./default"
import { DockMediaControlDemo } from "./media-control"

export const dockDemos: DemoEntry[] = [
	{
		name: "default",
		title: "Default",
		component: DockDefaultDemo,
		componentSlug: "dock",
		sourcePath: "src/demos/dock/default.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
	{
		name: "application-launcher",
		title: "Application Launcher",
		component: DockApplicationLauncherDemo,
		componentSlug: "dock",
		sourcePath: "src/demos/dock/application-launcher.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
	{
		name: "media-control",
		title: "Media Controls",
		component: DockMediaControlDemo,
		componentSlug: "dock",
		sourcePath: "src/demos/dock/media-control.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
]
