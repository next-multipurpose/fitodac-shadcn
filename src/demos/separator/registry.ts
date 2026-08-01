import type { DemoEntry } from "@/demos/types"

import SeparatorHorizontalDemo from "./horizontal"
import SeparatorSectionsDemo from "./sections"
import SeparatorToolbarDemo from "./toolbar"
import SeparatorVerticalDemo from "./vertical"

export const separatorDemos: DemoEntry[] = [
  {
    name: "horizontal",
    title: "Horizontal separator",
    component: SeparatorHorizontalDemo,
    componentSlug: "separator",
    sourcePath: "src/demos/separator/horizontal.tsx",
  },
  {
    name: "vertical",
    title: "Vertical separator",
    component: SeparatorVerticalDemo,
    componentSlug: "separator",
    sourcePath: "src/demos/separator/vertical.tsx",
  },
  {
    name: "sections",
    title: "Section separators",
    component: SeparatorSectionsDemo,
    componentSlug: "separator",
    sourcePath: "src/demos/separator/sections.tsx",
  },
  {
    name: "toolbar",
    title: "Toolbar separator",
    component: SeparatorToolbarDemo,
    componentSlug: "separator",
    sourcePath: "src/demos/separator/toolbar.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button"],
  },
]
