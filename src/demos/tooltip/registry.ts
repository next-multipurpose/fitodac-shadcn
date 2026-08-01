import type { DemoEntry } from "@/demos/types"

import TooltipBasicDemo from "./basic"
import TooltipRichContentDemo from "./rich-content"
import TooltipStatsDemo from "./stats"
import TooltipPlacementsDemo from "./placements"
import TooltipIconTriggerDemo from "./icon-trigger"
import TooltipMediaPreviewDemo from "./media-preview"
import TooltipNoArrowDemo from "./no-arrow"
import TooltipLightThemeDemo from "./light-theme"

export const tooltipDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic tooltip",
    component: TooltipBasicDemo,
    componentSlug: "tooltip",
    sourcePath: "src/demos/tooltip/basic.tsx",
    registryDependencies: ["tooltip", "button"],
  },
  {
    name: "rich-content",
    title: "Rich content",
    component: TooltipRichContentDemo,
    componentSlug: "tooltip",
    sourcePath: "src/demos/tooltip/rich-content.tsx",
    registryDependencies: ["tooltip", "button"],
  },
  {
    name: "stats",
    title: "Statistics tooltip",
    component: TooltipStatsDemo,
    componentSlug: "tooltip",
    sourcePath: "src/demos/tooltip/stats.tsx",
    registryDependencies: ["tooltip", "button"],
  },
  {
    name: "placements",
    title: "Tooltip placements",
    component: TooltipPlacementsDemo,
    componentSlug: "tooltip",
    sourcePath: "src/demos/tooltip/placements.tsx",
    registryDependencies: ["tooltip", "button"],
  },
  {
    name: "icon-trigger",
    title: "Icon trigger",
    component: TooltipIconTriggerDemo,
    componentSlug: "tooltip",
    sourcePath: "src/demos/tooltip/icon-trigger.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["tooltip"],
  },
  {
    name: "media-preview",
    title: "Media preview",
    component: TooltipMediaPreviewDemo,
    componentSlug: "tooltip",
    sourcePath: "src/demos/tooltip/media-preview.tsx",
    registryDependencies: ["tooltip", "button"],
  },
  {
    name: "no-arrow",
    title: "Tooltip without arrow",
    component: TooltipNoArrowDemo,
    componentSlug: "tooltip",
    sourcePath: "src/demos/tooltip/no-arrow.tsx",
    registryDependencies: ["tooltip", "button"],
  },
  {
    name: "light-theme",
    title: "Always-light tooltip",
    component: TooltipLightThemeDemo,
    componentSlug: "tooltip",
    sourcePath: "src/demos/tooltip/light-theme.tsx",
    registryDependencies: ["tooltip", "button"],
  },
]
