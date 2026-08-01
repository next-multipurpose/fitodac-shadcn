import type { DemoEntry } from "@/demos/types"

import PopoverAboutDemo from "./about"
import PopoverDeleteConfirmationDemo from "./delete-confirmation"
import PopoverDimensionsDemo from "./dimensions"
import PopoverDownloadDemo from "./download"
import PopoverFeedbackDemo from "./feedback"
import PopoverFiltersDemo from "./filters"
import PopoverGuidedTipsDemo from "./guided-tips"
import PopoverLocationCardDemo from "./location-card"
import PopoverNotificationsDemo from "./notifications"
import PopoverProfileDemo from "./profile"
import PopoverRatingsDemo from "./ratings"
import PopoverShareDemo from "./share"
import PopoverSlideBottomDemo from "./slide-bottom"
import PopoverSlideLeftDemo from "./slide-left"

export const popoverDemos: DemoEntry[] = [
  {
    name: "dimensions",
    title: "Dimensions form",
    component: PopoverDimensionsDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/dimensions.tsx",
    registryDependencies: ["button", "input", "label"],
  },
  {
    name: "notifications",
    title: "Notifications",
    component: PopoverNotificationsDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/notifications.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "button"],
  },
  {
    name: "guided-tips",
    title: "Guided tips",
    component: PopoverGuidedTipsDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/guided-tips.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "share",
    title: "Share popover",
    component: PopoverShareDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/share.tsx",
    dependencies: [
      "@remixicon/react",
      "lucide-react@^0.577.0",
    ],
    registryDependencies: ["button", "input", "tooltip", "utils"],
  },
  {
    name: "feedback",
    title: "Feedback form",
    component: PopoverFeedbackDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/feedback.tsx",
    registryDependencies: ["button", "textarea"],
  },
  {
    name: "profile",
    title: "Profile card",
    component: PopoverProfileDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/profile.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["avatar", "button"],
  },
  {
    name: "ratings",
    title: "Ratings summary",
    component: PopoverRatingsDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/ratings.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "button", "progress", "separator"],
  },
  {
    name: "about",
    title: "About card",
    component: PopoverAboutDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/about.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button"],
  },
  {
    name: "download",
    title: "Download progress",
    component: PopoverDownloadDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/download.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button", "progress", "utils"],
  },
  {
    name: "delete-confirmation",
    title: "Delete confirmation",
    component: PopoverDeleteConfirmationDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/delete-confirmation.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button"],
  },
  {
    name: "filters",
    title: "Filters",
    component: PopoverFiltersDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/filters.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button", "checkbox", "label", "slider"],
  },
  {
    name: "location-card",
    title: "Location card",
    component: PopoverLocationCardDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/location-card.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button"],
  },
  {
    name: "slide-left",
    title: "Slide in from left",
    component: PopoverSlideLeftDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/slide-left.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button", "input", "separator", "utils"],
  },
  {
    name: "slide-bottom",
    title: "Slide in from bottom",
    component: PopoverSlideBottomDemo,
    componentSlug: "popover",
    sourcePath: "src/demos/popover/slide-bottom.tsx",
    registryDependencies: ["avatar", "button", "checkbox", "input", "label"],
  },
]
