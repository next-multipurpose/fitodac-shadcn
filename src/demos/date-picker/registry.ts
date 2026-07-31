import type { DemoEntry } from "@/demos/types"

import DatePickerSingleDateDemo from "./single-date"
import DatePickerRangeDemo from "./range"
import DatePickerTwoMonthRangeDemo from "./two-month-range"
import DatePickerBookedDatesDemo from "./booked-dates"
import DatePickerAppointmentDemo from "./appointment"
import DatePickerBirthdayDemo from "./birthday"
import DatePickerLocalizedDemo from "./localized"
import DatePickerAdvancedDueDateDemo from "./advanced-due-date"
import DatePickerDialogDemo from "./dialog"
import DatePickerAdvancedDialogDemo from "./advanced-dialog"

export const datePickerDemos: DemoEntry[] = [
  {
    name: "single-date",
    title: "Single date",
    component: DatePickerSingleDateDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/date-picker/single-date.tsx",
    registryDependencies: ["button", "field", "input", "popover"],
    dependencies: ["date-fns", "lucide-react@^0.577.0"],
  },
  {
    name: "range",
    title: "Date range",
    component: DatePickerRangeDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/date-picker/range.tsx",
    registryDependencies: ["button", "field", "input", "popover"],
    dependencies: ["date-fns", "lucide-react@^0.577.0", "react-day-picker@^9.14.0"],
  },
  {
    name: "two-month-range",
    title: "Two-month range",
    component: DatePickerTwoMonthRangeDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/date-picker/two-month-range.tsx",
    registryDependencies: ["button", "field", "input", "popover"],
    dependencies: ["date-fns", "lucide-react@^0.577.0", "react-day-picker@^9.14.0"],
  },
  {
    name: "booked-dates",
    title: "Booked dates",
    component: DatePickerBookedDatesDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/date-picker/booked-dates.tsx",
    registryDependencies: ["button", "field", "input", "popover"],
    dependencies: ["date-fns", "lucide-react@^0.577.0"],
  },
  {
    name: "appointment",
    title: "Appointment picker",
    component: DatePickerAppointmentDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/date-picker/appointment.tsx",
    registryDependencies: ["button", "field", "input", "popover", "scroll-area"],
    dependencies: ["date-fns", "lucide-react@^0.577.0"],
  },
  {
    name: "birthday",
    title: "Birthday picker",
    component: DatePickerBirthdayDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/date-picker/birthday.tsx",
    registryDependencies: ["button", "field", "input", "popover", "select"],
    dependencies: ["date-fns", "lucide-react@^0.577.0"],
  },
  {
    name: "localized",
    title: "Localized",
    component: DatePickerLocalizedDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/date-picker/localized.tsx",
    registryDependencies: ["button", "dropdown-menu", "field", "input", "popover"],
    dependencies: ["date-fns", "lucide-react@^0.577.0"],
  },
  {
    name: "advanced-due-date",
    title: "Advanced due date",
    component: DatePickerAdvancedDueDateDemo,
    componentSlug: "date-selector",
    sourcePath: "src/demos/date-picker/advanced-due-date.tsx",
    registryDependencies: ["button", "field", "input", "popover", "separator"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "dialog",
    title: "Dialog date picker",
    component: DatePickerDialogDemo,
    componentSlug: "calendar",
    sourcePath: "src/demos/date-picker/dialog.tsx",
    registryDependencies: ["button", "dialog", "field", "input"],
    dependencies: ["date-fns", "lucide-react@^0.577.0"],
  },
  {
    name: "advanced-dialog",
    title: "Advanced dialog picker",
    component: DatePickerAdvancedDialogDemo,
    componentSlug: "date-selector",
    sourcePath: "src/demos/date-picker/advanced-dialog.tsx",
    registryDependencies: ["button", "dialog", "field", "input", "separator"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
