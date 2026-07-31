import type { DemoEntry } from "@/demos/types"

import ButtonGroupPreviousNextDemo from "./previous-next"
import ButtonGroupSaveActionsMenuDemo from "./save-actions-menu"
import ButtonGroupPeriodSelectorDemo from "./period-selector"
import ButtonGroupIconNavigationDemo from "./icon-navigation"
import ButtonGroupPaginationDemo from "./pagination"
import ButtonGroupDownloadCountDemo from "./download-count"
import ButtonGroupFormattingToolbarDemo from "./formatting-toolbar"
import ButtonGroupVerticalStepperDemo from "./vertical-stepper"
import ButtonGroupStarActionsDemo from "./star-actions"
import ButtonGroupSearchDemo from "./search"
import ButtonGroupEmailAddDemo from "./email-add"
import ButtonGroupCopilotPopoverDemo from "./copilot-popover"
import ButtonGroupCurrencyInputDemo from "./currency-input"
import ButtonGroupQuantitySelectorDemo from "./quantity-selector"
import ButtonGroupTaskStatusDemo from "./task-status"
import ButtonGroupAssigneeSelectDemo from "./assignee-select"
import ButtonGroupSearchMenuDemo from "./search-menu"
import ButtonGroupLoadingSearchDemo from "./loading-search"
import ButtonGroupMergeOptionsDemo from "./merge-options"
import ButtonGroupAlignmentControlsDemo from "./alignment-controls"

export const buttonGroupDemos: DemoEntry[] = [
  {
    name: "previous-next",
    title: "Previous and next",
    component: ButtonGroupPreviousNextDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/previous-next.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "save-actions-menu",
    title: "Save actions menu",
    component: ButtonGroupSaveActionsMenuDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/save-actions-menu.tsx",
    registryDependencies: ["button", "dropdown-menu"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "period-selector",
    title: "Period selector",
    component: ButtonGroupPeriodSelectorDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/period-selector.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "icon-navigation",
    title: "Icon navigation",
    component: ButtonGroupIconNavigationDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/icon-navigation.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "pagination",
    title: "Pagination",
    component: ButtonGroupPaginationDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/pagination.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "download-count",
    title: "Download count",
    component: ButtonGroupDownloadCountDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/download-count.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "formatting-toolbar",
    title: "Formatting toolbar",
    component: ButtonGroupFormattingToolbarDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/formatting-toolbar.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "vertical-stepper",
    title: "Vertical stepper",
    component: ButtonGroupVerticalStepperDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/vertical-stepper.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "star-actions",
    title: "Star actions",
    component: ButtonGroupStarActionsDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/star-actions.tsx",
    registryDependencies: ["badge", "button", "dropdown-menu"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "search",
    title: "Search",
    component: ButtonGroupSearchDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/search.tsx",
    registryDependencies: ["button", "input"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "email-add",
    title: "Email add",
    component: ButtonGroupEmailAddDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/email-add.tsx",
    registryDependencies: ["button", "input-group"],
  },
  {
    name: "copilot-popover",
    title: "Copilot popover",
    component: ButtonGroupCopilotPopoverDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/copilot-popover.tsx",
    registryDependencies: ["button", "field", "popover", "textarea"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "currency-input",
    title: "Currency input",
    component: ButtonGroupCurrencyInputDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/currency-input.tsx",
    registryDependencies: ["input", "select"],
  },
  {
    name: "quantity-selector",
    title: "Quantity selector",
    component: ButtonGroupQuantitySelectorDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/quantity-selector.tsx",
    registryDependencies: ["button", "input"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "task-status",
    title: "Task status",
    component: ButtonGroupTaskStatusDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/task-status.tsx",
    registryDependencies: ["button", "input", "select", "tooltip"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "assignee-select",
    title: "Assignee select",
    component: ButtonGroupAssigneeSelectDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/assignee-select.tsx",
    registryDependencies: ["avatar", "button", "select"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "search-menu",
    title: "Search menu",
    component: ButtonGroupSearchMenuDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/search-menu.tsx",
    registryDependencies: ["button", "dropdown-menu", "input-group"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "loading-search",
    title: "Loading search",
    component: ButtonGroupLoadingSearchDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/loading-search.tsx",
    registryDependencies: ["button", "input-group"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "merge-options",
    title: "Merge options",
    component: ButtonGroupMergeOptionsDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/merge-options.tsx",
    registryDependencies: ["button", "dropdown-menu"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "alignment-controls",
    title: "Alignment controls",
    component: ButtonGroupAlignmentControlsDemo,
    componentSlug: "button-group",
    sourcePath: "src/demos/button-group/alignment-controls.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
