import type { DemoEntry } from "@/demos/types"

import AutocompleteBasicDemo from "./basic"
import AutocompleteControlledClearDemo from "./controlled-clear"
import AutocompleteGroupedUsersDemo from "./grouped-users"
import AutocompleteAsyncSearchDemo from "./async-search"
import AutocompleteAutoHighlightDemo from "./auto-highlight"

export const autocompleteDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic",
    component: AutocompleteBasicDemo,
    componentSlug: "autocomplete",
    sourcePath: "src/demos/autocomplete/basic.tsx",
  },
  {
    name: "controlled-clear",
    title: "Controlled with clear",
    component: AutocompleteControlledClearDemo,
    componentSlug: "autocomplete",
    sourcePath: "src/demos/autocomplete/controlled-clear.tsx",
  },
  {
    name: "grouped-users",
    title: "Grouped users",
    component: AutocompleteGroupedUsersDemo,
    componentSlug: "autocomplete",
    sourcePath: "src/demos/autocomplete/grouped-users.tsx",
    registryDependencies: ["avatar"],
  },
  {
    name: "async-search",
    title: "Async search",
    component: AutocompleteAsyncSearchDemo,
    componentSlug: "autocomplete",
    sourcePath: "src/demos/autocomplete/async-search.tsx",
    registryDependencies: ["avatar"],
  },
  {
    name: "auto-highlight",
    title: "Auto highlight",
    component: AutocompleteAutoHighlightDemo,
    componentSlug: "autocomplete",
    sourcePath: "src/demos/autocomplete/auto-highlight.tsx",
  },
]
