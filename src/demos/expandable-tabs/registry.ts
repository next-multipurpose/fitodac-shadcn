import type { DemoEntry } from "@/demos/types"

import { ExpandableTabsDefaultDemo } from "./default"
import { ExpandableTabsSocialDemo } from "./social-studio"
import { ExpandableTabsDevDemo } from "./dev-console"

export const expandableTabsDemos: DemoEntry[] = [
	{
		name: "default",
		title: "Default",
		component: ExpandableTabsDefaultDemo,
		componentSlug: "expandable-tabs",
		sourcePath: "src/demos/expandable-tabs/default.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
	{
		name: "social-studio",
		title: "Social Studio",
		component: ExpandableTabsSocialDemo,
		componentSlug: "expandable-tabs",
		sourcePath: "src/demos/expandable-tabs/social-studio.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
	{
		name: "dev-console",
		title: "Dev Console",
		component: ExpandableTabsDevDemo,
		componentSlug: "expandable-tabs",
		sourcePath: "src/demos/expandable-tabs/dev-console.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
]
