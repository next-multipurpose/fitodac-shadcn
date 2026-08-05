import type { DemoEntry } from "@/demos/types"

import TabsBasicDemo from "./basic"
import TabsMutedActiveDemo from "./muted-active"
import TabsPillDemo from "./pill"
import TabsLineDemo from "./line"
import TabsAttachedDemo from "./attached"
import TabsScrollableIconsBadgesDemo from "./scrollable-icons-badges"
import TabsScrollablePillIconsDemo from "./scrollable-pill-icons"
import TabsScrollableNavigationDemo from "./scrollable-navigation"
import TabsStackedIconsDemo from "./stacked-icons"
import TabsBadgeStatsDemo from "./badge-stats"
import TabsIconTooltipsDemo from "./icon-tooltips"
import TabsVerticalIconTooltipsDemo from "./vertical-icon-tooltips"
import TabsVerticalLineDemo from "./vertical-line"
import TabsVerticalIconsDemo from "./vertical-icons"
import TabsVerticalPillDemo from "./vertical-pill"
import TabsIndicatorColorDemo from "./indicator-color"
import TabsBadgeCountsDemo from "./badge-counts"
import TabsCardsDemo from "./cards"
import TabsControlledDemo from "./controlled"
import TabsFormsDemo from "./forms"
import TabsFullWidthDemo from "./full-width"
import TabsIconsDemo from "./icons"
import TabsNestedDemo from "./nested"
import TabsScrollableDemo from "./scrollable"
import TabsTablesDemo from "./tables"

export const tabsDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic Tabs",
    component: TabsBasicDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/basic.tsx",
  },
  {
    name: "muted-active",
    title: "Muted active tab",
    component: TabsMutedActiveDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/muted-active.tsx",
  },
  {
    name: "pill",
    title: "Pill tabs",
    component: TabsPillDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/pill.tsx",
  },
  {
    name: "line",
    title: "Line tabs",
    component: TabsLineDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/line.tsx",
  },
  {
    name: "attached",
    title: "Attached tabs",
    component: TabsAttachedDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/attached.tsx",
  },
  {
    name: "scrollable-icons-badges",
    title: "Scrollable icons and badges",
    component: TabsScrollableIconsBadgesDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/scrollable-icons-badges.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "scroll-area"],
  },
  {
    name: "scrollable-pill-icons",
    title: "Scrollable pill icons",
    component: TabsScrollablePillIconsDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/scrollable-pill-icons.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["scroll-area"],
  },
  {
    name: "scrollable-navigation",
    title: "Scrollable navigation tabs",
    component: TabsScrollableNavigationDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/scrollable-navigation.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "scroll-area"],
  },
  {
    name: "stacked-icons",
    title: "Stacked icon tabs",
    component: TabsStackedIconsDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/stacked-icons.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "badge-stats",
    title: "Badge statistic tabs",
    component: TabsBadgeStatsDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/badge-stats.tsx",
    registryDependencies: ["badge"],
  },
  {
    name: "icon-tooltips",
    title: "Icon tabs with tooltips",
    component: TabsIconTooltipsDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/icon-tooltips.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "tooltip"],
  },
  {
    name: "vertical-icon-tooltips",
    title: "Vertical icon tabs with tooltips",
    component: TabsVerticalIconTooltipsDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/vertical-icon-tooltips.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "tooltip"],
  },
  {
    name: "vertical-line",
    title: "Vertical line tabs",
    component: TabsVerticalLineDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/vertical-line.tsx",
  },
  {
    name: "vertical-icons",
    title: "Vertical icon tabs",
    component: TabsVerticalIconsDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/vertical-icons.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "vertical-pill",
    title: "Vertical pill tabs",
    component: TabsVerticalPillDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/vertical-pill.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "indicator-color",
    title: "Custom indicator color",
    component: TabsIndicatorColorDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/indicator-color.tsx",
  },
  {
    name: "badge-counts",
    title: "Tabs with Badge Counts",
    component: TabsBadgeCountsDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/badge-counts.tsx",
    registryDependencies: ["badge"],
  },
  {
    name: "controlled",
    title: "Controlled Tabs",
    component: TabsControlledDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/controlled.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "nested",
    title: "Nested Tabs",
    component: TabsNestedDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/nested.tsx",
  },
  {
    name: "forms",
    title: "Tabs with Forms",
    component: TabsFormsDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/forms.tsx",
    registryDependencies: ["button", "input", "label", "textarea"],
  },
  {
    name: "cards",
    title: "Tabs with Cards",
    component: TabsCardsDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/cards.tsx",
    registryDependencies: ["badge", "button"],
  },
  {
    name: "tables",
    title: "Tabs with Tables",
    component: TabsTablesDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/tables.tsx",
    registryDependencies: ["badge", "scroll-area"],
  },
  {
    name: "full-width",
    title: "Full Width Tabs",
    component: TabsFullWidthDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/full-width.tsx",
  },
  {
    name: "scrollable",
    title: "Scrollable Tabs",
    component: TabsScrollableDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/scrollable.tsx",
    registryDependencies: ["scroll-area"],
  },
  {
    name: "icons",
    title: "Tabs with Icons",
    component: TabsIconsDemo,
    componentSlug: "tabs",
    sourcePath: "src/demos/tabs/icons.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
]
