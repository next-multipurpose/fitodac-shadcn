import type { DemoEntry } from "@/demos/types"

import CommandCategoriesDemo from "./categories"
import CommandNavigationDemo from "./navigation"
import CommandFileSearchDemo from "./file-search"
import CommandUserSearchDemo from "./user-search"
import CommandSettingsSearchDemo from "./settings-search"
import CommandQuickActionsDemo from "./quick-actions"
import CommandFilteredSearchDemo from "./filtered-search"
import CommandSmartSearchDemo from "./smart-search"
import CommandPeopleDirectoryDemo from "./people-directory"

export const commandDemos: DemoEntry[] = [
  {
    name: "categories",
    title: "Category search",
    component: CommandCategoriesDemo,
    componentSlug: "command",
    sourcePath: "src/demos/command/categories.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "navigation",
    title: "Navigation commands",
    component: CommandNavigationDemo,
    componentSlug: "command",
    sourcePath: "src/demos/command/navigation.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "file-search",
    title: "File search",
    component: CommandFileSearchDemo,
    componentSlug: "command",
    sourcePath: "src/demos/command/file-search.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "user-search",
    title: "User search",
    component: CommandUserSearchDemo,
    componentSlug: "command",
    sourcePath: "src/demos/command/user-search.tsx",
    registryDependencies: ["avatar"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "settings-search",
    title: "Settings search",
    component: CommandSettingsSearchDemo,
    componentSlug: "command",
    sourcePath: "src/demos/command/settings-search.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "quick-actions",
    title: "Quick actions",
    component: CommandQuickActionsDemo,
    componentSlug: "command",
    sourcePath: "src/demos/command/quick-actions.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "filtered-search",
    title: "Filtered search",
    component: CommandFilteredSearchDemo,
    componentSlug: "command",
    sourcePath: "src/demos/command/filtered-search.tsx",
    registryDependencies: ["toggle-group"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "smart-search",
    title: "Smart search",
    component: CommandSmartSearchDemo,
    componentSlug: "command",
    sourcePath: "src/demos/command/smart-search.tsx",
    registryDependencies: ["avatar", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "people-directory",
    title: "People directory",
    component: CommandPeopleDirectoryDemo,
    componentSlug: "command",
    sourcePath: "src/demos/command/people-directory.tsx",
    registryDependencies: ["avatar", "button", "input", "scroll-area"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
