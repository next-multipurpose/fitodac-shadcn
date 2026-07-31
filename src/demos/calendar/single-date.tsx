"use client"

import { useState } from "react"

import { Calendar } from "@/registry/primitives/calendar"

export default function CalendarSingleDateDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div>
      <Calendar
        className="rounded-md border p-2"
        mode="single"
        onSelect={setDate}
        selected={date}
      />
    </div>
  )
}
