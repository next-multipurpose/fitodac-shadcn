import type { DemoEntry } from "@/demos/types"

import ToggleFavoriteDemo from "./favorite"
import ToggleBookmarkDemo from "./bookmark"
import ToggleOutlineIconDemo from "./outline-icon"
import ToggleIconLabelDemo from "./icon-label"
import ToggleFormattingGroupDemo from "./formatting-group"
import ToggleSingleFormatDemo from "./single-format"
import ToggleActionsGroupDemo from "./actions-group"
import ToggleThemeModeDemo from "./theme-mode"

export const toggleDemos: DemoEntry[] = [
  {
    name: "favorite",
    title: "Favorite toggle",
    component: ToggleFavoriteDemo,
    componentSlug: "toggle",
    sourcePath: "src/demos/toggle/favorite.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["toggle"],
  },
  {
    name: "bookmark",
    title: "Bookmark toggle",
    component: ToggleBookmarkDemo,
    componentSlug: "toggle",
    sourcePath: "src/demos/toggle/bookmark.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["toggle"],
  },
  {
    name: "outline-icon",
    title: "Outline icon toggle",
    component: ToggleOutlineIconDemo,
    componentSlug: "toggle",
    sourcePath: "src/demos/toggle/outline-icon.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["toggle"],
  },
  {
    name: "icon-label",
    title: "Icon and label",
    component: ToggleIconLabelDemo,
    componentSlug: "toggle",
    sourcePath: "src/demos/toggle/icon-label.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["toggle"],
  },
  {
    name: "formatting-group",
    title: "Multiple formatting controls",
    component: ToggleFormattingGroupDemo,
    componentSlug: "toggle",
    sourcePath: "src/demos/toggle/formatting-group.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["toggle-group"],
  },
  {
    name: "single-format",
    title: "Single formatting control",
    component: ToggleSingleFormatDemo,
    componentSlug: "toggle",
    sourcePath: "src/demos/toggle/single-format.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["toggle-group"],
  },
  {
    name: "actions-group",
    title: "Spaced action group",
    component: ToggleActionsGroupDemo,
    componentSlug: "toggle",
    sourcePath: "src/demos/toggle/actions-group.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["toggle-group"],
  },
  {
    name: "theme-mode",
    title: "Theme mode toggle",
    component: ToggleThemeModeDemo,
    componentSlug: "toggle",
    sourcePath: "src/demos/toggle/theme-mode.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["toggle"],
  },
]
