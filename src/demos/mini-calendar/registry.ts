import type { DemoEntry } from "@/demos/types"

import MiniCalendarDefaultDemo from "./default"
import MiniCalendarControlledDemo from "./controlled"
import MiniCalendarSevenDaysDemo from "./seven-days"
import MiniCalendarCustomLayoutDemo from "./custom-layout"

export const miniCalendarDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: MiniCalendarDefaultDemo,
    componentSlug: "mini-calendar",
    sourcePath: "src/demos/mini-calendar/default.tsx",
    registryDependencies: ["mini-calendar"],
  },
  {
    name: "controlled",
    title: "Controlled",
    component: MiniCalendarControlledDemo,
    componentSlug: "mini-calendar",
    sourcePath: "src/demos/mini-calendar/controlled.tsx",
    dependencies: ["date-fns"],
    registryDependencies: ["mini-calendar"],
  },
  {
    name: "seven-days",
    title: "Seven days",
    component: MiniCalendarSevenDaysDemo,
    componentSlug: "mini-calendar",
    sourcePath: "src/demos/mini-calendar/seven-days.tsx",
    registryDependencies: ["mini-calendar"],
  },
  {
    name: "custom-layout",
    title: "Custom layout",
    component: MiniCalendarCustomLayoutDemo,
    componentSlug: "mini-calendar",
    sourcePath: "src/demos/mini-calendar/custom-layout.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["mini-calendar"],
  },
]
