"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useId, useState } from "react"

import { Button } from "@/registry/primitives/button"
import { Calendar } from "@/registry/primitives/calendar"
import { Field, FieldLabel } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/primitives/dialog"

export default function DatePickerDialogDemo() {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>()
  const [pendingDate, setPendingDate] = useState<Date | undefined>()
  const value = date ? format(date, "PPP") : ""

  const handleApply = () => {
    setDate(pendingDate)
    setOpen(false)
  }

  return (
    <Field>
      <FieldLabel htmlFor={id}>Date picker</FieldLabel>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            setPendingDate(date)
          } else {
            setPendingDate(undefined)
          }

          setOpen(nextOpen)
        }}
      >
        <DialogTrigger asChild>
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
        </DialogTrigger>

        <DialogContent className="gap-1 sm:max-w-75" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-center text-base">
              Select Due Date
            </DialogTitle>
          </DialogHeader>

          <Calendar
            mode="single"
            selected={pendingDate}
            onSelect={setPendingDate}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="button" onClick={handleApply}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Field>
  )
}
