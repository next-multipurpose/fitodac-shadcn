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
  componentSlug: string
  sourcePath: string
}

const demoRegistry: Record<string, DemoEntry[]> = {
  alert: [
    {
      name: "default",
      title: "Default",
      component: AlertDefaultDemo,
      componentSlug: "alert",
      sourcePath: "src/demos/alert/default.tsx",
    },
    {
      name: "destructive",
      title: "Destructive",
      component: AlertDestructiveDemo,
      componentSlug: "alert",
      sourcePath: "src/demos/alert/destructive.tsx",
    },
  ],
  badge: [
    {
      name: "default",
      title: "Default",
      component: BadgeDefaultDemo,
      componentSlug: "badge",
      sourcePath: "src/demos/badge/default.tsx",
    },
    {
      name: "variants",
      title: "Variants",
      component: BadgeVariantsDemo,
      componentSlug: "badge",
      sourcePath: "src/demos/badge/variants.tsx",
    },
    {
      name: "sizes",
      title: "Sizes",
      component: BadgeSizesDemo,
      componentSlug: "badge",
      sourcePath: "src/demos/badge/sizes.tsx",
    },
    {
      name: "radius",
      title: "Radius",
      component: BadgeRadiusDemo,
      componentSlug: "badge",
      sourcePath: "src/demos/badge/radius.tsx",
    },
  ],
  button: [
    {
      name: "default",
      title: "Default",
      component: ButtonDefaultDemo,
      componentSlug: "button",
      sourcePath: "src/demos/button/default.tsx",
    },
    {
      name: "variants",
      title: "Variants",
      component: ButtonVariantsDemo,
      componentSlug: "button",
      sourcePath: "src/demos/button/variants.tsx",
    },
    {
      name: "sizes",
      title: "Sizes",
      component: ButtonSizesDemo,
      componentSlug: "button",
      sourcePath: "src/demos/button/sizes.tsx",
    },
  ],
}

export function getDemosForComponent(slug: string) {
  return demoRegistry[slug] ?? []
}
