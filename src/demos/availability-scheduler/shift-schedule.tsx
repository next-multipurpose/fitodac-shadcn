"use client"

import { useState } from "react"
import {
	AvailabilityScheduler,
	type WeekAvailability,
} from "@/registry/components/availability-scheduler"

/**
 * Healthcare shift scheduler: 24/7 coverage with 12-hour rotating shifts.
 * Night shifts span midnight, and weekend rotations are staggered.
 */
const SHIFT_WEEK: WeekAvailability = {
	mon: {
		enabled: true,
		ranges: [{ id: "mon-0", start: "07:00", end: "19:00" }],
	},
	tue: {
		enabled: true,
		ranges: [{ id: "tue-0", start: "19:00", end: "07:00" }],
	},
	wed: {
		enabled: true,
		ranges: [{ id: "wed-0", start: "07:00", end: "19:00" }],
	},
	thu: {
		enabled: true,
		ranges: [{ id: "thu-0", start: "19:00", end: "07:00" }],
	},
	fri: {
		enabled: true,
		ranges: [{ id: "fri-0", start: "07:00", end: "19:00" }],
	},
	sat: {
		enabled: true,
		ranges: [
			{ id: "sat-0", start: "19:00", end: "07:00" },
			{ id: "sat-1", start: "18:00", end: "22:00" },
		],
	},
	sun: {
		enabled: true,
		ranges: [{ id: "sun-0", start: "19:00", end: "07:00" }],
	},
}

export function AvailabilitySchedulerShiftDemo() {
	const [value, setValue] = useState<WeekAvailability>(SHIFT_WEEK)

	return (
		<div className="flex min-h-[520px] w-full max-w-2xl flex-col gap-6 px-4 pt-12">
			<div className="space-y-1">
				<h3 className="text-sm font-semibold text-foreground">
					Hospital Shift Roster
				</h3>
				<p className="text-sm text-muted-foreground">
					24/7 coverage with rotating day/night 12-hour shifts. Weekend off-duty
					windows can be adjusted per nurse.
				</p>
			</div>
			<AvailabilityScheduler
				value={value}
				onChange={setValue}
				step={60}
				className="rounded-xl border border-border bg-card"
			/>
		</div>
	)
}
