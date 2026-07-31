"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useId, useState } from "react"

import { Button } from "@/registry/primitives/button"
import { Calendar } from "@/registry/primitives/calendar"
import { Field, FieldLabel } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Popover, PopoverAnchor, PopoverContent } from "@/registry/primitives/popover"

export default function DatePickerSingleDateDemo() {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>()
  const value = date ? format(date, "PPP") : ""

  return (
    <Field>
      <FieldLabel htmlFor={id}>Date picker</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div className="relative">
            <Input
              id={id}
              name="appointmentDate"
              readOnly
              value={value}
              placeholder="Pick a date"
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
              aria-label="Open date picker"
              className="absolute top-1 right-1 size-7 text-muted-foreground hover:text-foreground"
              onClick={() => setOpen((currentOpen) => !currentOpen)}
            >
              <CalendarIcon aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </PopoverAnchor>

        <PopoverContent align="start" className="w-auto p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(nextDate) => {
              setDate(nextDate)

              if (nextDate) {
                setOpen(false)
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
