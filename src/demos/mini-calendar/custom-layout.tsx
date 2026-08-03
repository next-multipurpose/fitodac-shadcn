"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/registry/primitives/button"
import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from "@/registry/components/mini-calendar"

export default function MiniCalendarCustomLayoutDemo() {
  return (
    <MiniCalendar defaultStartDate={new Date()}>
      <div className="flex items-center gap-1">
        <MiniCalendarNavigation asChild direction="prev">
          <Button aria-label="Previous" size="icon" variant="ghost">
            <ChevronLeftIcon className="size-4" />
          </Button>
        </MiniCalendarNavigation>
        <MiniCalendarDays>
          {(date) => <MiniCalendarDay date={date} />}
        </MiniCalendarDays>
        <MiniCalendarNavigation asChild direction="next">
          <Button aria-label="Next" size="icon" variant="ghost">
            <ChevronRightIcon className="size-4" />
          </Button>
        </MiniCalendarNavigation>
      </div>
    </MiniCalendar>
  )
}
