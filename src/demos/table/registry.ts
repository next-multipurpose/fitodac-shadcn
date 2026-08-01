import type { DemoEntry } from "@/demos/types"

import TablePaymentsDemo from "./payments"
import TablePaymentsCardDemo from "./payments-card"
import TableStripedRowsDemo from "./striped-rows"
import TableSelectedRowsDemo from "./selected-rows"
import TableRoundedHeaderDemo from "./rounded-header"
import TableActionsMenuDemo from "./actions-menu"
import TableStickyFirstColumnDemo from "./sticky-first-column"
import TableStickyHeaderDemo from "./sticky-header"
import TableStickyHeaderColumnDemo from "./sticky-header-column"
import TableScrollAreaDemo from "./scroll-area"
import TableSelectedCellsDemo from "./selected-cells"
import TableSelectableRowsDemo from "./selectable-rows"
import TableVerticalDetailsDemo from "./vertical-details"
import TableProductsDemo from "./products"

export const tableDemos: DemoEntry[] = [
  {
    name: "payments",
    title: "Payments table",
    component: TablePaymentsDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/payments.tsx",
    registryDependencies: ["avatar", "badge"],
  },
  {
    name: "payments-card",
    title: "Payments table in card",
    component: TablePaymentsCardDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/payments-card.tsx",
    registryDependencies: ["avatar", "badge", "card"],
  },
  {
    name: "striped-rows",
    title: "Striped rows",
    component: TableStripedRowsDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/striped-rows.tsx",
    registryDependencies: ["avatar", "badge"],
  },
  {
    name: "selected-rows",
    title: "Selected rows",
    component: TableSelectedRowsDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/selected-rows.tsx",
    registryDependencies: ["avatar", "badge"],
  },
  {
    name: "rounded-header",
    title: "Rounded header",
    component: TableRoundedHeaderDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/rounded-header.tsx",
    registryDependencies: ["avatar", "badge"],
  },
  {
    name: "actions-menu",
    title: "Row actions menu",
    component: TableActionsMenuDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/actions-menu.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["avatar", "badge", "button", "dropdown-menu"],
  },
  {
    name: "sticky-first-column",
    title: "Sticky first column",
    component: TableStickyFirstColumnDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/sticky-first-column.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["avatar", "badge", "button", "dropdown-menu"],
  },
  {
    name: "sticky-header",
    title: "Sticky header",
    component: TableStickyHeaderDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/sticky-header.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["avatar", "badge", "button", "dropdown-menu"],
  },
  {
    name: "sticky-header-column",
    title: "Sticky header and column",
    component: TableStickyHeaderColumnDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/sticky-header-column.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["avatar", "badge", "button", "dropdown-menu"],
  },
  {
    name: "scroll-area",
    title: "Scrollable table",
    component: TableScrollAreaDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/scroll-area.tsx",
    registryDependencies: ["avatar", "badge", "scroll-area"],
  },
  {
    name: "selected-cells",
    title: "Selected cells",
    component: TableSelectedCellsDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/selected-cells.tsx",
    registryDependencies: ["avatar", "badge"],
  },
  {
    name: "selectable-rows",
    title: "Selectable rows",
    component: TableSelectableRowsDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/selectable-rows.tsx",
    registryDependencies: ["avatar", "badge", "checkbox"],
  },
  {
    name: "vertical-details",
    title: "Vertical details table",
    component: TableVerticalDetailsDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/vertical-details.tsx",
  },
  {
    name: "products",
    title: "Product table",
    component: TableProductsDemo,
    componentSlug: "table",
    sourcePath: "src/demos/table/products.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["avatar", "button", "checkbox"],
  },
]
