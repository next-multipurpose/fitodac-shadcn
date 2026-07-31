import type { DemoEntry } from "@/demos/types"

import { BadgeDefaultDemo } from "./default"
import { BadgeSizesDemo } from "./sizes"
import { BadgeRadiusDemo } from "./radius"
import { BadgeVariantsDemo } from "./variants"
import BadgeIconDemo from "./icon"
import BadgeNumericCountersDemo from "./numeric-counters"
import BadgeGradientDemo from "./gradient"
import BadgeChatCountDemo from "./chat-count"
import BadgeCompletedIconDemo from "./completed-icon"
import BadgePendingStatusDemo from "./pending-status"
import BadgeErrorStatusDemo from "./error-status"
import BadgeDismissibleDemo from "./dismissible"
import BadgeRemovableTagsDemo from "./removable-tags"
import BadgeUserChipsDemo from "./user-chips"
import BadgeTrendDemo from "./trend"
import BadgeGradientOutlineDemo from "./gradient-outline"
import BadgeInProgressDemo from "./in-progress"
import BadgeBlockedDemo from "./blocked"
import BadgeCompletedStatusDemo from "./completed-status"
import BadgeCartCountDemo from "./cart-count"
import BadgeAvatarOnlineStatusDemo from "./avatar-online-status"

export const badgeDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: BadgeDefaultDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/default.tsx",
  },
  {
    name: "sizes",
    title: "Sizes",
    component: BadgeSizesDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/sizes.tsx",
  },
  {
    name: "radius",
    title: "Radius",
    component: BadgeRadiusDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/radius.tsx",
  },
  {
    name: "variants",
    title: "Variants",
    component: BadgeVariantsDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/variants.tsx",
  },
  {
    name: "icon",
    title: "With icon",
    component: BadgeIconDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/icon.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "numeric-counters",
    title: "Numeric counters",
    component: BadgeNumericCountersDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/numeric-counters.tsx",
  },
  {
    name: "gradient",
    title: "Gradient",
    component: BadgeGradientDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/gradient.tsx",
  },
  {
    name: "chat-count",
    title: "Chat count",
    component: BadgeChatCountDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/chat-count.tsx",
  },
  {
    name: "completed-icon",
    title: "Completed with icon",
    component: BadgeCompletedIconDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/completed-icon.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "pending-status",
    title: "Pending status",
    component: BadgePendingStatusDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/pending-status.tsx",
  },
  {
    name: "error-status",
    title: "Error status",
    component: BadgeErrorStatusDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/error-status.tsx",
  },
  {
    name: "dismissible",
    title: "Dismissible",
    component: BadgeDismissibleDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/dismissible.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "removable-tags",
    title: "Removable tags",
    component: BadgeRemovableTagsDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/removable-tags.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "user-chips",
    title: "User chips",
    component: BadgeUserChipsDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/user-chips.tsx",
    registryDependencies: ["avatar"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "trend",
    title: "Trend indicators",
    component: BadgeTrendDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/trend.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "gradient-outline",
    title: "Gradient outline",
    component: BadgeGradientOutlineDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/gradient-outline.tsx",
  },
  {
    name: "in-progress",
    title: "In progress",
    component: BadgeInProgressDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/in-progress.tsx",
  },
  {
    name: "blocked",
    title: "Blocked",
    component: BadgeBlockedDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/blocked.tsx",
  },
  {
    name: "completed-status",
    title: "Completed status",
    component: BadgeCompletedStatusDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/completed-status.tsx",
  },
  {
    name: "cart-count",
    title: "Cart count",
    component: BadgeCartCountDemo,
    componentSlug: "badge",
    sourcePath: "src/demos/badge/cart-count.tsx",
    registryDependencies: ["avatar"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "avatar-online-status",
    title: "Avatar online status",
    component: BadgeAvatarOnlineStatusDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/badge/avatar-online-status.tsx",
  },
]
