import type { DemoEntry } from "@/demos/types"

import DragAndDropSortableListDemo from "./sortable-list"

export const dragAndDropDemos: DemoEntry[] = [
  {
    name: "sortable-list",
    title: "Sortable list",
    component: DragAndDropSortableListDemo,
    componentSlug: "drag-and-drop",
    sourcePath: "src/demos/drag-and-drop/sortable-list.tsx",
    registryDependencies: ["button"],
    dependencies: [
      "@dnd-kit/core@^6.3.1",
      "@dnd-kit/sortable@^10.0.0",
      "@dnd-kit/utilities@^3.2.2",
      "lucide-react@^0.577.0",
    ],
  },
]
