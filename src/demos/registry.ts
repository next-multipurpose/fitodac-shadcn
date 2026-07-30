import type { ComponentType } from "react"

import { ButtonDefaultDemo } from "@/demos/button/default"

export type DemoEntry = {
  name: string
  title: string
  component: ComponentType
}

const demoRegistry: Record<string, DemoEntry[]> = {
  button: [
    {
      name: "default",
      title: "Default",
      component: ButtonDefaultDemo,
    },
  ],
}

export function getDemosForComponent(slug: string) {
  return demoRegistry[slug] ?? []
}
