"use client"

import { CalendarIcon } from "lucide-react"
import { useEffect, useId, useState } from "react"

import { Button } from "@/registry/primitives/button"
import {
  DateSelector,
  formatDateValue,
  type DateSelectorValue,
} from "@/registry/components/date-selector"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/primitives/dialog"
import { Field, FieldLabel } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Separator } from "@/registry/primitives/separator"

export default function DatePickerAdvancedDialogDemo() {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<DateSelectorValue | undefined>()
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
      <FieldLabel htmlFor={id}>Date picker</FieldLabel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
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
        </DialogTrigger>

        <DialogContent
          className="gap-0 p-0 sm:max-w-126"
          showCloseButton={false}
        >
          <DialogHeader className="px-4 pt-4">
            <DialogTitle className="text-center text-base">
              Select Due Date
            </DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <DateSelector
              value={internalValue}
              onChange={setInternalValue}
              allowRange={true}
              label="Due date"
              inputHint="Try: 2025, Q4, 05/10/2025"
            />
          </div>

          <Separator />

          <DialogFooter className="px-4 py-3">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="button" onClick={handleApply}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Field>
  )
}
