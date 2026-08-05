import type { DemoEntry } from "@/demos/types"

import { SharedLayoutBgDefaultDemo } from "./default"
import { SharedLayoutBgPlaylistDemo } from "./playlist"
import { SharedLayoutBgSidebarDemo } from "./sidebar"

export const sharedLayoutBgDemos: DemoEntry[] = [
	{
		name: "default",
		title: "Default",
		component: SharedLayoutBgDefaultDemo,
		componentSlug: "shared-layout-bg",
		sourcePath: "src/demos/shared-layout-bg/default.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
	{
		name: "sidebar",
		title: "Sidebar Navigation",
		component: SharedLayoutBgSidebarDemo,
		componentSlug: "shared-layout-bg",
		sourcePath: "src/demos/shared-layout-bg/sidebar.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
	{
		name: "playlist",
		title: "Audio Playlist",
		component: SharedLayoutBgPlaylistDemo,
		componentSlug: "shared-layout-bg",
		sourcePath: "src/demos/shared-layout-bg/playlist.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
]
