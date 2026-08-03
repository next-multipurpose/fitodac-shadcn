"use client"

import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { addDays, format, isSameDay, isToday } from "date-fns"
import type { Locale } from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Slot } from "radix-ui"
import {
  type ButtonHTMLAttributes,
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  useContext,
} from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/primitives/button"

type MiniCalendarContextType = {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  startDate: Date
  onNavigate: (direction: "prev" | "next") => void
  days: number
  locale?: Locale
}

const MiniCalendarContext = createContext<MiniCalendarContextType | null>(null)

const useMiniCalendar = () => {
  const context = useContext(MiniCalendarContext)

  if (!context) {
    throw new Error("MiniCalendar components must be used within MiniCalendar")
  }

  return context
}

const normalizeDays = (value: number | undefined): number => {
  const n = Number(value)
  return Number.isInteger(n) && n > 0 ? n : 1
}

const getDays = (startDate: Date, count: number): Date[] => {
  const dates: Date[] = []
  for (let i = 0; i < count; i++) {
    dates.push(addDays(startDate, i))
  }
  return dates
}

const formatDate = (date: Date, locale?: Locale) => {
  const month = format(date, "MMM", { locale })
  const day = format(date, "d", { locale })
  return { month, day }
}

export type MiniCalendarProps = HTMLAttributes<HTMLDivElement> & {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  startDate?: Date
  defaultStartDate?: Date
  onStartDateChange?: (date: Date | undefined) => void
  days?: number
  locale?: Locale
}

export const MiniCalendar = ({
  value,
  defaultValue,
  onValueChange,
  startDate,
  defaultStartDate = new Date(),
  onStartDateChange,
  days = 5,
  locale,
  className,
  children,
  ...props
}: MiniCalendarProps) => {
  const [selectedDate, setSelectedDate] = useControllableState<Date | undefined>({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const [currentStartDate, setCurrentStartDate] = useControllableState<
    Date | undefined
  >({
    prop: startDate,
    defaultProp: defaultStartDate,
    onChange: onStartDateChange,
  })

  const normalizedDays = normalizeDays(days)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleNavigate = (direction: "prev" | "next") => {
    const newStartDate = addDays(
      currentStartDate || new Date(),
      direction === "next" ? normalizedDays : -normalizedDays
    )
    setCurrentStartDate(newStartDate)
  }

  const contextValue: MiniCalendarContextType = {
    selectedDate: selectedDate || null,
    onDateSelect: handleDateSelect,
    startDate: currentStartDate || new Date(),
    onNavigate: handleNavigate,
    days: normalizedDays,
    locale,
  }

  return (
    <MiniCalendarContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border bg-background p-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </MiniCalendarContext.Provider>
  )
}

export type MiniCalendarNavigationProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: "prev" | "next"
  asChild?: boolean
}

export const MiniCalendarNavigation = ({
  direction,
  asChild = false,
  children,
  onClick,
  ...props
}: MiniCalendarNavigationProps) => {
  const { onNavigate } = useMiniCalendar()
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onNavigate(direction)
    onClick?.(event)
  }

  if (asChild) {
    return (
      <Slot.Root onClick={handleClick} {...props}>
        {children}
      </Slot.Root>
    )
  }

  return (
    <Button
      aria-label={direction === "prev" ? "Previous" : "Next"}
      onClick={handleClick}
      size="icon"
      type="button"
      variant="ghost"
      {...props}
    >
      {children ?? <Icon className="size-4" />}
    </Button>
  )
}

export type MiniCalendarDaysProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  children: (date: Date) => ReactNode
}

export const MiniCalendarDays = ({
  className,
  children,
  ...props
}: MiniCalendarDaysProps) => {
  const { startDate, days: dayCount } = useMiniCalendar()
  const days = getDays(startDate, dayCount)

  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      {days.map((date) => children(date))}
    </div>
  )
}

export type MiniCalendarDayProps = ComponentProps<typeof Button> & {
  date: Date
}

export const MiniCalendarDay = ({
  date,
  className,
  onClick,
  ...props
}: MiniCalendarDayProps) => {
  const { selectedDate, onDateSelect, locale } = useMiniCalendar()
  const { month, day } = formatDate(date, locale)
  const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
  const isTodayDate = isToday(date)

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onDateSelect(date)
    onClick?.(event)
  }

  return (
    <Button
      className={cn(
        "h-auto min-w-[3rem] flex-col gap-0 p-2 text-xs",
        isTodayDate && !isSelected && "bg-accent",
        className
      )}
      {...props}
      aria-label={format(date, "EEEE, MMMM d, yyyy", { locale })}
      aria-pressed={isSelected}
      onClick={handleClick}
      size="sm"
      type="button"
      variant={isSelected ? "default" : "ghost"}
    >
      <span
        className={cn(
          "font-medium text-[10px] text-muted-foreground",
          isSelected && "text-primary-foreground/70"
        )}
      >
        {month}
      </span>
      <span className="font-semibold text-sm">{day}</span>
    </Button>
  )
}
