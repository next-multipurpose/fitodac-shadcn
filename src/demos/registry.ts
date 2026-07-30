import type { ComponentType } from "react"

import { ButtonDefaultDemo } from "@/demos/button/default"
import { ButtonSizesDemo } from "@/demos/button/sizes"
import { ButtonVariantsDemo } from "@/demos/button/variants"

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
    {
      name: "variants",
      title: "Variants",
      component: ButtonVariantsDemo,
    },
    {
      name: "sizes",
      title: "Sizes",
      component: ButtonSizesDemo,
    },
  ],
}

export function getDemosForComponent(slug: string) {
  return demoRegistry[slug] ?? []
}
