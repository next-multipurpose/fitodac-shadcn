import type { DemoEntry } from "@/demos/types"

import PaginationAnimatedButtonsDemo from "./animated-buttons"
import PaginationCompactStatusDemo from "./compact-status"
import PaginationConnectedOutlineDemo from "./connected-outline"
import PaginationFirstLastControlsDemo from "./first-last-controls"
import PaginationGoToPageDemo from "./go-to-page"
import PaginationPageNumbersDemo from "./page-numbers"
import PaginationPageSelectorDemo from "./page-selector"
import PaginationPageStatusOutlineDemo from "./page-status-outline"
import PaginationPreviousNextDemo from "./previous-next"
import PaginationResultsPerPageDemo from "./results-per-page"
import PaginationStatusActionsDemo from "./status-actions"
import PaginationTableControlsDemo from "./table-controls"

export const paginationDemos: DemoEntry[] = [
  {
    name: "previous-next",
    title: "Previous and next",
    component: PaginationPreviousNextDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/previous-next.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button"],
  },
  {
    name: "animated-buttons",
    title: "Animated buttons",
    component: PaginationAnimatedButtonsDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/animated-buttons.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button"],
  },
  {
    name: "page-status-outline",
    title: "Page status with outline controls",
    component: PaginationPageStatusOutlineDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/page-status-outline.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button", "utils"],
  },
  {
    name: "compact-status",
    title: "Compact page status",
    component: PaginationCompactStatusDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/compact-status.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "status-actions",
    title: "Status with actions",
    component: PaginationStatusActionsDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/status-actions.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "page-numbers",
    title: "Page numbers",
    component: PaginationPageNumbersDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/page-numbers.tsx",
    registryDependencies: ["use-pagination"],
  },
  {
    name: "first-last-controls",
    title: "First and last controls",
    component: PaginationFirstLastControlsDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/first-last-controls.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["use-pagination"],
  },
  {
    name: "connected-outline",
    title: "Connected outline pagination",
    component: PaginationConnectedOutlineDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/connected-outline.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button", "use-pagination", "utils"],
  },
  {
    name: "results-per-page",
    title: "Results per page",
    component: PaginationResultsPerPageDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/results-per-page.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["select", "use-pagination"],
  },
  {
    name: "table-controls",
    title: "Table pagination controls",
    component: PaginationTableControlsDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/table-controls.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["label", "select"],
  },
  {
    name: "page-selector",
    title: "Page selector",
    component: PaginationPageSelectorDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/page-selector.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["select"],
  },
  {
    name: "go-to-page",
    title: "Go to page",
    component: PaginationGoToPageDemo,
    componentSlug: "pagination",
    sourcePath: "src/demos/pagination/go-to-page.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["input", "label", "use-pagination"],
  },
]
