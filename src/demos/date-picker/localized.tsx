"use client"

import { format } from "date-fns"
import { de, enUS, es, fr } from "date-fns/locale"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { useId, useState } from "react"

import { Button } from "@/registry/primitives/button"
import { Calendar } from "@/registry/primitives/calendar"
import { Field, FieldLabel } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Popover, PopoverAnchor, PopoverContent } from "@/registry/primitives/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"

const LOCALES = {
  fr,
  en: enUS,
  es,
  de,
} as const

export default function DatePickerLocalizedDemo() {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>()
  const [currentLanguage, setCurrentLanguage] = useState<
    "fr" | "en" | "es" | "de"
  >("fr")
  const currentLocale = LOCALES[currentLanguage]
  const value = date ? format(date, "PPP", { locale: currentLocale }) : ""

  return (
    <Field>
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <span>{currentLanguage}</span>
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => setCurrentLanguage("fr")}
              className="flex items-center gap-2"
            >
              Français
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setCurrentLanguage("en")}
              className="flex items-center gap-2"
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setCurrentLanguage("es")}
              className="flex items-center gap-2"
            >
              Español
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setCurrentLanguage("de")}
              className="flex items-center gap-2"
            >
              Deutsch
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <FieldLabel htmlFor={id}>Translations</FieldLabel>

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
            locale={currentLocale}
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
