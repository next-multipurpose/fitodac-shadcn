"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useId, useMemo, useState } from "react"

import { Button } from "@/registry/primitives/button"
import { Calendar } from "@/registry/primitives/calendar"
import { Field, FieldLabel } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Popover, PopoverAnchor, PopoverContent } from "@/registry/primitives/popover"
import { ScrollArea } from "@/registry/primitives/scroll-area"


const AVAILABLE_TIMES = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
]

export default function DatePickerAppointmentDemo() {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const value = useMemo(() => {
    if (!date) {
      return ""
    }

    if (!selectedTime) {
      return format(date, "PPP")
    }

    return `${format(date, "PPP")} at ${selectedTime}`
  }, [date, selectedTime])

  const selectedDateLabel = date ? format(date, "EEEE, MMMM d") : null

  return (
    <Field>
      <FieldLabel htmlFor={id}>Appointment picker</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div className="relative">
            <Input
              id={id}
              name="appointment"
              readOnly
              value={value}
              placeholder="Pick a date and time"
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
              aria-label="Open appointment picker"
              className="absolute top-1 right-1 size-7 text-muted-foreground hover:text-foreground"
              onClick={() => setOpen((currentOpen) => !currentOpen)}
            >
              <CalendarIcon aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </PopoverAnchor>

        <PopoverContent align="start" className="w-auto p-0">
          <div className="flex overflow-hidden bg-background max-sm:flex-col sm:divide-x">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(nextDate) => {
                setDate(nextDate)

                if (!nextDate) {
                  setSelectedTime(null)
                }
              }}
            />

            <div className="flex w-[248px] flex-col border-t sm:border-t-0">
              <div className="border-b px-4 py-3">
                <p className="text-sm font-medium">Available times</p>
                <p className="text-xs text-muted-foreground">
                  {selectedDateLabel ?? "Select a date to choose a time"}
                </p>
              </div>

              <ScrollArea className="h-72">
                <div className="grid gap-2 p-4">
                  {AVAILABLE_TIMES.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      size="sm"
                      variant={selectedTime === time ? "default" : "outline"}
                      disabled={!date}
                      onClick={() => {
                        setSelectedTime(time)
                        setOpen(false)
                      }}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  )
}
