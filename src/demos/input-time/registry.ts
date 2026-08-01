import type { DemoEntry } from "@/demos/types"

import InputTime12HourDemo from "./12-hour"
import InputTime12HourSecondsDemo from "./12-hour-seconds"
import InputTime24HourDemo from "./24-hour"
import InputTime24HourSecondsDemo from "./24-hour-seconds"
import InputTimeClockIconDemo from "./clock-icon"

export const inputTimeDemos: DemoEntry[] = [
  {
    name: "24-hour",
    title: "24-hour format",
    component: InputTime24HourDemo,
    componentSlug: "input-time",
    sourcePath: "src/demos/input-time/24-hour.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "12-hour",
    title: "12-hour format",
    component: InputTime12HourDemo,
    componentSlug: "input-time",
    sourcePath: "src/demos/input-time/12-hour.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "clock-icon",
    title: "Clock icon",
    component: InputTimeClockIconDemo,
    componentSlug: "input-time",
    sourcePath: "src/demos/input-time/clock-icon.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "24-hour-seconds",
    title: "24-hour format with seconds",
    component: InputTime24HourSecondsDemo,
    componentSlug: "input-time",
    sourcePath: "src/demos/input-time/24-hour-seconds.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "12-hour-seconds",
    title: "12-hour format with seconds",
    component: InputTime12HourSecondsDemo,
    componentSlug: "input-time",
    sourcePath: "src/demos/input-time/12-hour-seconds.tsx",
    registryDependencies: ["field"],
  },
]
