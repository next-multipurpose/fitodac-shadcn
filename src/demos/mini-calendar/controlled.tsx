"use client"

import { format } from "date-fns"
import { useState } from "react"

import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
} from "@/registry/components/mini-calendar"

export default function MiniCalendarControlledDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col items-center gap-3">
      <MiniCalendar value={date} onValueChange={setDate}>
        <MiniCalendarDays>
          {(day) => <MiniCalendarDay date={day} />}
        </MiniCalendarDays>
      </MiniCalendar>
      <p
        aria-live="polite"
        className="text-center text-sm text-muted-foreground"
      >
        {date ? format(date, "EEEE, MMMM d, yyyy") : "No date selected"}
      </p>
    </div>
  )
}
