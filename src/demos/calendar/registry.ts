import type { DemoEntry } from "@/demos/types"

import CalendarSingleDateDemo from "./single-date"
import CalendarRangeDemo from "./range"
import CalendarDisabledDatesDemo from "./disabled-dates"
import CalendarMultipleDatesDemo from "./multiple-dates"
import CalendarPricingDemo from "./pricing"
import CalendarCustomDropdownsDemo from "./custom-dropdowns"
import CalendarTodayButtonDemo from "./today-button"
import CalendarDateTimeDemo from "./date-time"
import CalendarMonthYearPickerDemo from "./month-year-picker"
import CalendarTimeSlotsDemo from "./time-slots"
import CalendarRangePresetsDemo from "./range-presets"
import CalendarMultiMonthRangeDemo from "./multi-month-range"
import CalendarCustomRangeStyleDemo from "./custom-range-style"
import CalendarDateSelectorDebugDemo from "./date-selector-debug"

export const calendarDemos: DemoEntry[] = [
  {
    name: "single-date",
    title: "Single date",
    component: CalendarSingleDateDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/single-date.tsx",
  },
  {
    name: "range",
    title: "Date range",
    component: CalendarRangeDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/range.tsx",
    dependencies: ["date-fns"],
  },
  {
    name: "disabled-dates",
    title: "Disabled dates",
    component: CalendarDisabledDatesDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/disabled-dates.tsx",
    dependencies: ["date-fns"],
  },
  {
    name: "multiple-dates",
    title: "Multiple dates",
    component: CalendarMultipleDatesDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/multiple-dates.tsx",
    dependencies: ["date-fns"],
  },
  {
    name: "pricing",
    title: "Pricing",
    component: CalendarPricingDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/pricing.tsx",
  },
  {
    name: "custom-dropdowns",
    title: "Custom dropdowns",
    component: CalendarCustomDropdownsDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/custom-dropdowns.tsx",
    registryDependencies: ["select"],
  },
  {
    name: "today-button",
    title: "Today button",
    component: CalendarTodayButtonDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/today-button.tsx",
    registryDependencies: ["button"],
    dependencies: ["date-fns"],
  },
  {
    name: "date-time",
    title: "Date and time",
    component: CalendarDateTimeDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/date-time.tsx",
    registryDependencies: ["input", "label"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "month-year-picker",
    title: "Month and year picker",
    component: CalendarMonthYearPickerDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/month-year-picker.tsx",
    registryDependencies: ["button", "collapsible", "scroll-area"],
    dependencies: ["date-fns", "lucide-react@^0.577.0"],
  },
  {
    name: "time-slots",
    title: "Time slots",
    component: CalendarTimeSlotsDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/time-slots.tsx",
    registryDependencies: ["button", "scroll-area"],
    dependencies: ["date-fns"],
  },
  {
    name: "range-presets",
    title: "Range presets",
    component: CalendarRangePresetsDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/range-presets.tsx",
    registryDependencies: ["button"],
    dependencies: ["date-fns"],
  },
  {
    name: "multi-month-range",
    title: "Multi-month range",
    component: CalendarMultiMonthRangeDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/multi-month-range.tsx",
    dependencies: ["date-fns"],
  },
  {
    name: "custom-range-style",
    title: "Custom range style",
    component: CalendarCustomRangeStyleDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/calendar/custom-range-style.tsx",
  },
  {
    name: "date-selector-debug",
    title: "Date selector debug",
    component: CalendarDateSelectorDebugDemo,
    componentSlug: "date-selector",
    sourcePath: "src/demos/calendar/date-selector-debug.tsx",
    registryDependencies: ["card"],
  },
]
