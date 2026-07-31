"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  useId,
  useState,
  useCallback,
  type ChangeEvent,
  type ChangeEventHandler,
} from "react"

import { Button } from "@/registry/primitives/button"
import { Calendar } from "@/registry/primitives/calendar"
import { Field, FieldLabel } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Popover, PopoverAnchor, PopoverContent } from "@/registry/primitives/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/primitives/select"

export default function DatePickerBirthdayDemo() {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>()
  const [month, setMonth] = useState<Date>(new Date())
  const value = date ? format(date, "PPP") : ""

  const handleCalendarChange = useCallback(
    (value: string | number, event: ChangeEventHandler<HTMLSelectElement>) => {
      const newEvent = {
        target: {
          value: String(value),
        },
      } as ChangeEvent<HTMLSelectElement>
      event(newEvent)
    },
    []
  )

  return (
    <Field>
      <FieldLabel htmlFor={id}>Birthday picker</FieldLabel>

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
            hideNavigation
            month={month}
            onMonthChange={setMonth}
            onSelect={(nextDate) => {
              setDate(nextDate)

              if (nextDate) {
                setOpen(false)
              }
            }}
            captionLayout="dropdown"
            components={{
              MonthCaption: (props) => <>{props.children}</>,
              DropdownNav: (props) => (
                <div className="flex w-full items-center gap-2">
                  {props.children}
                </div>
              ),
              Dropdown: (props) => (
                <Select
                  onValueChange={(value) => {
                    if (props.onChange) {
                      handleCalendarChange(value, props.onChange)
                    }
                  }}
                  value={String(props.value)}
                >
                  <SelectTrigger className="first:flex-1 last:shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {props.options?.map((option) => (
                      <SelectItem
                        disabled={option.disabled}
                        key={option.value}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
