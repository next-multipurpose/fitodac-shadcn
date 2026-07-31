import type { DemoEntry } from "@/demos/types"

import ContextMenuDefaultDemo from "./default"

export const contextMenuDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: ContextMenuDefaultDemo,
    componentSlug: "context-menu",
    sourcePath: "src/demos/context-menu/default.tsx",
  },
]
