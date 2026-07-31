import type { DemoEntry } from "@/demos/types"

import ComboboxDefaultDemo from "./default"
import ComboboxTriggerWidthDemo from "./trigger-width"
import ComboboxMultiSelectDemo from "./multi-select"
import ComboboxGroupedDemo from "./grouped"
import ComboboxIconsDemo from "./icons"
import ComboboxDescriptionsDemo from "./descriptions"
import ComboboxDisabledOptionsDemo from "./disabled-options"
import ComboboxCountriesDemo from "./countries"
import ComboboxAsyncSearchDemo from "./async-search"
import ComboboxClearableDemo from "./clearable"
import ComboboxRecentDemo from "./recent"
import ComboboxCreateNewDemo from "./create-new"

export const comboboxDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: ComboboxDefaultDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/default.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "trigger-width",
    title: "Match trigger width",
    component: ComboboxTriggerWidthDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/trigger-width.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "multi-select",
    title: "Multi-select",
    component: ComboboxMultiSelectDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/multi-select.tsx",
    registryDependencies: ["badge", "button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "grouped",
    title: "Grouped options",
    component: ComboboxGroupedDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/grouped.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "icons",
    title: "With icons",
    component: ComboboxIconsDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/icons.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "descriptions",
    title: "With descriptions",
    component: ComboboxDescriptionsDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/descriptions.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "disabled-options",
    title: "Disabled options",
    component: ComboboxDisabledOptionsDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/disabled-options.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "countries",
    title: "Country selector",
    component: ComboboxCountriesDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/countries.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "async-search",
    title: "Async search",
    component: ComboboxAsyncSearchDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/async-search.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "clearable",
    title: "Clearable",
    component: ComboboxClearableDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/clearable.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "recent",
    title: "Recent selections",
    component: ComboboxRecentDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/recent.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "create-new",
    title: "Create new option",
    component: ComboboxCreateNewDemo,
    componentSlug: "command",
    sourcePath: "src/demos/combobox/create-new.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
