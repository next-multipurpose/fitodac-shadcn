import type { DemoEntry } from "@/demos/types"

import MenubarDefaultDemo from "./default"

export const menubarDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Menubar",
    component: MenubarDefaultDemo,
    componentSlug: "menubar",
    sourcePath: "src/demos/menubar/default.tsx",
  },
]
