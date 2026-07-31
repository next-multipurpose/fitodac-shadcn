"use client"

import { useEffect, useId, useState } from "react"
import {
  DateSelector,
  formatDateValue,
  type DateSelectorValue,
} from "@/registry/components/date-selector"

import { Button } from "@/registry/primitives/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/primitives/popover"
import { Separator } from "@/registry/primitives/separator"
import { CalendarIcon } from "lucide-react"
import { Field, FieldLabel } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"

export default function DatePickerAdvancedDueDateDemo() {
  const id = useId()
  const [value, setValue] = useState<DateSelectorValue | undefined>()
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<
    DateSelectorValue | undefined
  >(value)

  const displayValue = open
    ? internalValue
      ? formatDateValue(internalValue)
      : ""
    : value
      ? formatDateValue(value)
      : ""

  useEffect(() => {
    if (open) {
      setInternalValue(value)
    }
  }, [open, value])

  const handleApply = () => {
    setValue(internalValue)
    setOpen(false)
  }

  const handleCancel = () => {
    setInternalValue(value)
    setOpen(false)
  }

  return (
    <Field>
      <FieldLabel htmlFor={id}>Due date</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id={id}
              name="appointmentDate"
              readOnly
              value={displayValue}
              placeholder="Pick a date"
              aria-haspopup="dialog"
              aria-expanded={open}
              className="pr-10"
              onClick={() => setOpen((currentOpen) => !currentOpen)}
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

        <PopoverContent
          className="w-auto gap-3 p-0"
          align="start"
          sideOffset={4}
        >
          <div className="p-3">
            <DateSelector
              value={internalValue}
              onChange={setInternalValue}
              allowRange={true}
              label="Due date"
              inputHint="Try: 2025, Q4, 05/10/2025"
            />
          </div>
          <Separator className="p-0" />

          <div className="flex justify-end gap-2 p-3">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={handleApply}>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  )
}
