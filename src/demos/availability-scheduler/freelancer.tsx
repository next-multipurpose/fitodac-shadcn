"use client"

import { useState } from "react"
import {
	AvailabilityScheduler,
	type WeekAvailability,
} from "@/registry/components/availability-scheduler"

/**
 * Freelance project scheduler: irregular, project-driven availability blocks.
 * Morning deep-work, afternoon client calls, weekend creative bursts.
 */
const FREELANCE_WEEK: WeekAvailability = {
	mon: {
		enabled: true,
		ranges: [{ id: "mon-0", start: "08:00", end: "11:00" }],
	},
	tue: {
		enabled: true,
		ranges: [
			{ id: "tue-0", start: "10:00", end: "13:00" },
			{ id: "tue-1", start: "15:00", end: "17:00" },
		],
	},
	wed: {
		enabled: true,
		ranges: [{ id: "wed-0", start: "09:00", end: "12:00" }],
	},
	thu: {
		enabled: true,
		ranges: [{ id: "thu-0", start: "14:00", end: "17:00" }],
	},
	fri: {
		enabled: true,
		ranges: [{ id: "fri-0", start: "08:00", end: "10:00" }],
	},
	sat: {
		enabled: true,
		ranges: [{ id: "sat-0", start: "14:00", end: "18:00" }],
	},
	sun: { enabled: false, ranges: [] },
}

export function AvailabilitySchedulerFreelancerDemo() {
	const [value, setValue] = useState<WeekAvailability>(FREELANCE_WEEK)

	return (
		<div className="flex min-h-[520px] w-full max-w-2xl flex-col gap-6 px-4 pt-12">
			<div className="space-y-1">
				<h3 className="text-sm font-semibold text-foreground">
					Freelancer Availability
				</h3>
				<p className="text-sm text-muted-foreground">
					Project-driven scheduling with irregular blocks: deep work in the
					mornings, client calls mid-day, weekend creative bursts.
				</p>
			</div>
			<AvailabilityScheduler value={value} onChange={setValue} step={15} />
		</div>
	)
}
