"use client"

import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
} from "@/registry/components/mini-calendar"

export default function MiniCalendarDefaultDemo() {
  return (
    <MiniCalendar defaultStartDate={new Date()}>
      <MiniCalendarDays>
        {(date) => <MiniCalendarDay date={date} />}
      </MiniCalendarDays>
    </MiniCalendar>
  )
}
