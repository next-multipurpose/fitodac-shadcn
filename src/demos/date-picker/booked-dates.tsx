"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type ComponentProps, useState, useId } from "react"

import { Button } from "@/registry/primitives/button"
import { Calendar } from "@/registry/primitives/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/primitives/popover"
import { Field, FieldLabel } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"

const now = new Date()
const bookedDays = [5, 14, 23].map(
  (day) => new Date(now.getFullYear(), now.getMonth(), day)
)

export default function DatePickerBookedDatesDemo() {
  const id = useId()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)
  const value = date ? format(date, "PPP") : ""

  const modifiers = {
    booked: bookedDays,
  }

  const modifiersStyles: ComponentProps<typeof Calendar>["modifiersStyles"] = {
    booked: {
      backgroundColor: "#fbbf24",
      color: "#78350f",
      fontWeight: "bold",
    },
  }

  return (
    <Field>
      <FieldLabel htmlFor={id}>Booked dates</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id={id}
              name="travelDates"
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
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            classNames={{
              day_button: "rounded-full",
              day: "rounded-full",
              today: "rounded-full",
            }}
            mode="single"
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            onSelect={setDate}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
