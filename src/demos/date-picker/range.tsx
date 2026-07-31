"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useId, useRef, useState } from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/registry/primitives/button"
import { Calendar } from "@/registry/primitives/calendar"
import { Field, FieldLabel } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Popover, PopoverAnchor, PopoverContent } from "@/registry/primitives/popover"

export default function DatePickerRangeDemo() {
  const id = useId()
  const awaitingRangeEndRef = useRef(false)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>()
  const value = date?.from
    ? date.to
      ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
      : format(date.from, "LLL dd, y")
    : ""

  return (
    <Field>
      <FieldLabel htmlFor={id}>Date range picker</FieldLabel>

      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            awaitingRangeEndRef.current = false
          }

          setOpen(nextOpen)
        }}
      >
        <PopoverAnchor asChild>
          <div className="relative">
            <Input
              id={id}
              name="travelDates"
              readOnly
              value={value}
              placeholder="Pick a date range"
              aria-haspopup="dialog"
              aria-expanded={open}
              className="pr-10"
              onFocus={() => setOpen(true)}
              onClick={() => setOpen(true)}
              onKeyDown={(event) => {
                if (
                  event.key === "ArrowDown" ||
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault()
                  setOpen(true)
                }

                if (event.key === "Escape") {
                  setOpen(false)
                }
              }}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Open date range picker"
              className="absolute top-1 right-1 size-7 text-muted-foreground hover:text-foreground"
              onClick={() => setOpen((currentOpen) => !currentOpen)}
            >
              <CalendarIcon aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </PopoverAnchor>

        <PopoverContent align="start" className="w-auto p-2">
          <Calendar
            mode="range"
            selected={date}
            onSelect={(nextDate) => {
              setDate(nextDate)

              if (!nextDate?.from) {
                awaitingRangeEndRef.current = false
                return
              }

              if (!awaitingRangeEndRef.current) {
                awaitingRangeEndRef.current = true
                return
              }

              if (nextDate.to) {
                awaitingRangeEndRef.current = false
                setOpen(false)
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
