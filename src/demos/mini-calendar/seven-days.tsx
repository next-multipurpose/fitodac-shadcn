"use client"

import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
} from "@/registry/components/mini-calendar"

export default function MiniCalendarSevenDaysDemo() {
  return (
    <MiniCalendar days={7} defaultStartDate={new Date()}>
      <MiniCalendarDays>
        {(date) => <MiniCalendarDay date={date} />}
      </MiniCalendarDays>
    </MiniCalendar>
  )
}
