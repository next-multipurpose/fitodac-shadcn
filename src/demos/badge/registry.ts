import type { DemoEntry } from "@/demos/types"

import { BadgeDefaultDemo } from "./default"
import { BadgeRadiusDemo } from "./radius"
import { BadgeSizesDemo } from "./sizes"
import { BadgeVariantsDemo } from "./variants"

export const badgeDemos: DemoEntry[] = [
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
]
