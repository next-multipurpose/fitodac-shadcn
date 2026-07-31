import type { DemoEntry } from "@/demos/types"

import DataTableDefaultDemo from "./default"
import DataTableExpandableOrdersDemo from "./expandable-orders"
import DataTableScrollableDemo from "./scrollable"
import DataTableDraggableRowsDemo from "./draggable-rows"
import DataTableDraggableColumnsDemo from "./draggable-columns"
import DataTableInlineActionsDemo from "./inline-actions"

export const dataTableDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: DataTableDefaultDemo,
    componentSlug: "data-table",
    sourcePath: "src/demos/data-table/default.tsx",
    registryDependencies: ["button", "checkbox", "dropdown-menu", "input"],
    dependencies: ["@tanstack/react-table", "lucide-react@^0.577.0"],
  },
  {
    name: "expandable-orders",
    title: "Expandable orders",
    component: DataTableExpandableOrdersDemo,
    componentSlug: "data-table",
    sourcePath: "src/demos/data-table/expandable-orders.tsx",
    registryDependencies: ["button", "checkbox", "dropdown-menu", "input"],
    dependencies: ["@tanstack/react-table", "lucide-react@^0.577.0"],
  },
  {
    name: "scrollable",
    title: "Scrollable",
    component: DataTableScrollableDemo,
    componentSlug: "data-table",
    sourcePath: "src/demos/data-table/scrollable.tsx",
    registryDependencies: ["button", "checkbox", "dropdown-menu", "input", "scroll-area"],
    dependencies: ["@tanstack/react-table", "lucide-react@^0.577.0"],
  },
  {
    name: "draggable-rows",
    title: "Draggable rows",
    component: DataTableDraggableRowsDemo,
    componentSlug: "data-table",
    sourcePath: "src/demos/data-table/draggable-rows.tsx",
    registryDependencies: ["button", "checkbox", "dropdown-menu", "input"],
    dependencies: ["@tanstack/react-table", "lucide-react@^0.577.0", "@dnd-kit/core@^6.3.1", "@dnd-kit/sortable@^10.0.0", "@dnd-kit/utilities@^3.2.2"],
  },
  {
    name: "draggable-columns",
    title: "Draggable columns",
    component: DataTableDraggableColumnsDemo,
    componentSlug: "data-table",
    sourcePath: "src/demos/data-table/draggable-columns.tsx",
    registryDependencies: ["button", "checkbox", "dropdown-menu", "input"],
    dependencies: ["@tanstack/react-table", "lucide-react@^0.577.0", "@dnd-kit/core@^6.3.1", "@dnd-kit/sortable@^10.0.0", "@dnd-kit/utilities@^3.2.2"],
  },
  {
    name: "inline-actions",
    title: "Inline actions",
    component: DataTableInlineActionsDemo,
    componentSlug: "data-table",
    sourcePath: "src/demos/data-table/inline-actions.tsx",
    registryDependencies: ["button", "checkbox", "dropdown-menu", "input"],
    dependencies: ["@tanstack/react-table", "lucide-react@^0.577.0"],
  },
]
