import type { DemoEntry } from "@/demos/types"

import { ExpandableActionBarCreativeToolbarDemo } from "./creative-toolbar"
import { ExpandableActionBarDefaultDemo } from "./default"
import { ExpandableActionBarMediaControlsDemo } from "./media-controls"

export const expandableActionBarDemos: DemoEntry[] = [
	{
		name: "default",
		title: "Default",
		component: ExpandableActionBarDefaultDemo,
		componentSlug: "expandable-action-bar",
		sourcePath: "src/demos/expandable-action-bar/default.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
	{
		name: "creative-toolbar",
		title: "Creative toolbar",
		component: ExpandableActionBarCreativeToolbarDemo,
		componentSlug: "expandable-action-bar",
		sourcePath: "src/demos/expandable-action-bar/creative-toolbar.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
	{
		name: "media-controls",
		title: "Media controls",
		component: ExpandableActionBarMediaControlsDemo,
		componentSlug: "expandable-action-bar",
		sourcePath: "src/demos/expandable-action-bar/media-controls.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
]
