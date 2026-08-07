"use client"

import { AvailabilityScheduler } from "@/registry/components/availability-scheduler"
import { defaultWeek } from "@/registry/components/availability-scheduler"

export function AvailabilitySchedulerDefaultDemo() {
	return (
		<div className="flex min-h-[520px] w-full max-w-2xl flex-col gap-6 px-4 pt-12">
			<div className="space-y-1">
				<h3 className="text-sm font-semibold text-foreground">
					Team Availability
				</h3>
				<p className="text-sm text-muted-foreground">
					Standard office hours (Mon–Fri 9–5, weekends off).
				</p>
			</div>
			<AvailabilityScheduler defaultValue={defaultWeek()} />
		</div>
	)
}
