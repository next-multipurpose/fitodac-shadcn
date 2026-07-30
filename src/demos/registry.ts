import type { ComponentType } from "react"

import { AlertDefaultDemo } from "@/demos/alert/default"
import { AlertDestructiveDemo } from "@/demos/alert/destructive"
import { BadgeDefaultDemo } from "@/demos/badge/default"
import { BadgeRadiusDemo } from "@/demos/badge/radius"
import { BadgeSizesDemo } from "@/demos/badge/sizes"
import { BadgeVariantsDemo } from "@/demos/badge/variants"
import { ButtonDefaultDemo } from "@/demos/button/default"
import { ButtonSizesDemo } from "@/demos/button/sizes"
import { ButtonVariantsDemo } from "@/demos/button/variants"

export type DemoEntry = {
  name: string
  title: string
  component: ComponentType
}

const demoRegistry: Record<string, DemoEntry[]> = {
  alert: [
    {
      name: "default",
      title: "Default",
      component: AlertDefaultDemo,
    },
    {
      name: "destructive",
      title: "Destructive",
      component: AlertDestructiveDemo,
    },
  ],
  badge: [
    {
      name: "default",
      title: "Default",
      component: BadgeDefaultDemo,
    },
    {
      name: "variants",
      title: "Variants",
      component: BadgeVariantsDemo,
    },
    {
      name: "sizes",
      title: "Sizes",
      component: BadgeSizesDemo,
    },
    {
      name: "radius",
      title: "Radius",
      component: BadgeRadiusDemo,
    },
  ],
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
