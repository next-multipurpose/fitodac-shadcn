import type { DemoEntry } from "@/demos/types"

import InputPhoneDefaultDemo from "./default"

export const inputPhoneDemos: DemoEntry[] = [
  {
    name: "default",
    title: "International phone input",
    component: InputPhoneDefaultDemo,
    componentSlug: "input-phone",
    sourcePath: "src/demos/input-phone/default.tsx",
  },
]
