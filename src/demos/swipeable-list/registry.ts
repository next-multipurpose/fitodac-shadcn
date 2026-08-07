import type { DemoEntry } from "@/demos/types"

import { SwipeableListDefaultDemo } from "./default"
import { SwipeableListTripManagerDemo } from "./trip-manager"
import { SwipeableListModerationQueueDemo } from "./moderation-queue"

export const swipeableListDemos: DemoEntry[] = [
	{
		name: "default",
		title: "Default",
		component: SwipeableListDefaultDemo,
		componentSlug: "swipeable-list",
		sourcePath: "src/demos/swipeable-list/default.tsx",
		dependencies: ["lucide-react@^0.577.0", "motion@^12.38.0"],
	},
	{
		name: "trip-manager",
		title: "Trip Manager",
		component: SwipeableListTripManagerDemo,
		componentSlug: "swipeable-list",
		sourcePath: "src/demos/swipeable-list/trip-manager.tsx",
		dependencies: ["lucide-react@^0.577.0", "motion@^12.38.0"],
	},
	{
		name: "moderation-queue",
		title: "Moderation Queue",
		component: SwipeableListModerationQueueDemo,
		componentSlug: "swipeable-list",
		sourcePath: "src/demos/swipeable-list/moderation-queue.tsx",
		dependencies: ["lucide-react@^0.577.0", "motion@^12.38.0"],
	},
]
