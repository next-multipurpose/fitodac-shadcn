import type { DemoEntry } from "@/demos/types"

import EventCalendarMonthDemo from "./month"
import EventCalendarDayDemo from "./day"
import EventCalendarWeekDemo from "./week"
import EventCalendarYearDemo from "./year"
import EventCalendarAgendaDemo from "./agenda"

export const eventCalendarDemos: DemoEntry[] = [
  {
    name: "month",
    title: "Month view",
    component: EventCalendarMonthDemo,
    componentSlug: "event-calendar",
    sourcePath: "src/demos/event-calendar/month.tsx",
  },
  {
    name: "day",
    title: "Day view",
    component: EventCalendarDayDemo,
    componentSlug: "event-calendar",
    sourcePath: "src/demos/event-calendar/day.tsx",
  },
  {
    name: "week",
    title: "Week view",
    component: EventCalendarWeekDemo,
    componentSlug: "event-calendar",
    sourcePath: "src/demos/event-calendar/week.tsx",
  },
  {
    name: "year",
    title: "Year view",
    component: EventCalendarYearDemo,
    componentSlug: "event-calendar",
    sourcePath: "src/demos/event-calendar/year.tsx",
  },
  {
    name: "agenda",
    title: "Agenda view",
    component: EventCalendarAgendaDemo,
    componentSlug: "event-calendar",
    sourcePath: "src/demos/event-calendar/agenda.tsx",
  },
]
