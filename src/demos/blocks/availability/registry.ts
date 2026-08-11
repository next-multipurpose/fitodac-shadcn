import type { DemoEntry } from "@/demos/types"

import { AvailabilitySchedulerDemo } from "./availability-scheduler-demo"

export const availabilityDemos: Record<string, DemoEntry> = {
	"availability-scheduler": {
		name: "availability-scheduler",
		title: "Default",
		component: AvailabilitySchedulerDemo,
		componentSlug: "availability-scheduler",
		sourcePath: "src/demos/blocks/availability/availability-scheduler-demo.tsx",
	},
}
