import type { DemoEntry } from "@/demos/types"

import HoverCardBasicDemo from "./basic"
import HoverCardProfileDemo from "./profile"
import HoverCardProfileActionsDemo from "./profile-actions"

export const hoverCardDemos: DemoEntry[] = [
	{
		name: "basic",
		title: "Basic",
		component: HoverCardBasicDemo,
		componentSlug: "hover-card",
		sourcePath: "src/demos/hover-card/basic.tsx",
		registryDependencies: ["button", "hover-card"],
	},
	{
		name: "profile",
		title: "Profile",
		component: HoverCardProfileDemo,
		componentSlug: "hover-card",
		sourcePath: "src/demos/hover-card/profile.tsx",
		registryDependencies: ["avatar", "button", "hover-card"],
		dependencies: ["lucide-react@^0.577.0"],
	},
	{
		name: "profile-actions",
		title: "Profile with actions",
		component: HoverCardProfileActionsDemo,
		componentSlug: "hover-card",
		sourcePath: "src/demos/hover-card/profile-actions.tsx",
		registryDependencies: ["avatar", "button", "hover-card"],
		dependencies: ["lucide-react@^0.577.0"],
	},
]
