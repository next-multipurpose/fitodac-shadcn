import type { DemoEntry } from "@/demos/types"

import { BloomMenuDefaultDemo } from "./default"
import { BloomMenuAiStudioDemo } from "./ai-studio"
import { BloomMenuTeamHubDemo } from "./team-hub"

export const bloomMenuDemos: DemoEntry[] = [
	{
		name: "default",
		title: "Default",
		component: BloomMenuDefaultDemo,
		componentSlug: "bloom-menu",
		sourcePath: "src/demos/bloom-menu/default.tsx",
		dependencies: ["lucide-react@^0.577.0", "motion@^12.38.0"],
	},
	{
		name: "ai-studio",
		title: "AI Content Studio",
		component: BloomMenuAiStudioDemo,
		componentSlug: "bloom-menu",
		sourcePath: "src/demos/bloom-menu/ai-studio.tsx",
		dependencies: ["lucide-react@^0.577.0", "motion@^12.38.0"],
	},
	{
		name: "team-hub",
		title: "Team Collaboration Hub",
		component: BloomMenuTeamHubDemo,
		componentSlug: "bloom-menu",
		sourcePath: "src/demos/bloom-menu/team-hub.tsx",
		dependencies: ["lucide-react@^0.577.0", "motion@^12.38.0"],
	},
]
