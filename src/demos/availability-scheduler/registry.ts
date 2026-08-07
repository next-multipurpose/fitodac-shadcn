import type { DemoEntry } from "@/demos/types"

import { AvailabilitySchedulerDefaultDemo } from "./default"
import { AvailabilitySchedulerShiftDemo } from "./shift-schedule"
import { AvailabilitySchedulerFreelancerDemo } from "./freelancer"

export const availabilitySchedulerDemos: DemoEntry[] = [
	{
		name: "default",
		title: "Default",
		component: AvailabilitySchedulerDefaultDemo,
		componentSlug: "availability-scheduler",
		sourcePath: "src/demos/availability-scheduler/default.tsx",
		dependencies: ["lucide-react@^0.577.0", "motion@^12.38.0"],
	},
	{
		name: "shift-schedule",
		title: "Healthcare Shift Roster",
		component: AvailabilitySchedulerShiftDemo,
		componentSlug: "availability-scheduler",
		sourcePath: "src/demos/availability-scheduler/shift-schedule.tsx",
		dependencies: ["lucide-react@^0.577.0", "motion@^12.38.0"],
	},
	{
		name: "freelancer",
		title: "Freelance Project Scheduler",
		component: AvailabilitySchedulerFreelancerDemo,
		componentSlug: "availability-scheduler",
		sourcePath: "src/demos/availability-scheduler/freelancer.tsx",
		dependencies: ["lucide-react@^0.577.0", "motion@^12.38.0"],
	},
]
