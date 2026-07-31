import type { DemoEntry } from "@/demos/types"

import AvatarDefaultDemo from "./default"
import AvatarInitialsFallbackDemo from "./initials-fallback"
import AvatarIconFallbackDemo from "./icon-fallback"
import AvatarOnlineStatusDemo from "./online-status"
import AvatarVerifiedBadgeDemo from "./verified-badge"
import AvatarNotificationBadgeDemo from "./notification-badge"
import AvatarStackDemo from "./stack"
import AvatarStackOverflowDemo from "./stack-overflow"
import AvatarSocialProofDemo from "./social-proof"
import AvatarColoredFallbackDemo from "./colored-fallback"
import AvatarSquareDemo from "./square"
import AvatarTooltipStackDemo from "./tooltip-stack"
import AvatarTooltipSingleDemo from "./tooltip-single"
import AvatarOverflowMenuDemo from "./overflow-menu"
import AvatarProfilePopoverDemo from "./profile-popover"
import AvatarUploadOverlayDemo from "./upload-overlay"
import AvatarLoadingOverlayDemo from "./loading-overlay"
import AvatarStatusRingDemo from "./status-ring"
import AvatarProfileLabelDemo from "./profile-label"
import AvatarEmptyCollaboratorsDemo from "./empty-collaborators"
import AvatarAccountMenuDemo from "./account-menu"

export const avatarDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: AvatarDefaultDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/default.tsx",
  },
  {
    name: "initials-fallback",
    title: "Initials fallback",
    component: AvatarInitialsFallbackDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/initials-fallback.tsx",
  },
  {
    name: "icon-fallback",
    title: "Icon fallback",
    component: AvatarIconFallbackDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/icon-fallback.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "online-status",
    title: "Online status",
    component: AvatarOnlineStatusDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/online-status.tsx",
  },
  {
    name: "verified-badge",
    title: "Verified badge",
    component: AvatarVerifiedBadgeDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/verified-badge.tsx",
  },
  {
    name: "notification-badge",
    title: "Notification badge",
    component: AvatarNotificationBadgeDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/notification-badge.tsx",
    registryDependencies: ["badge"],
  },
  {
    name: "stack",
    title: "Avatar stack",
    component: AvatarStackDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/stack.tsx",
  },
  {
    name: "stack-overflow",
    title: "Stack with overflow",
    component: AvatarStackOverflowDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/stack-overflow.tsx",
  },
  {
    name: "social-proof",
    title: "Social proof",
    component: AvatarSocialProofDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/social-proof.tsx",
  },
  {
    name: "colored-fallback",
    title: "Colored fallback",
    component: AvatarColoredFallbackDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/colored-fallback.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "square",
    title: "Square avatar",
    component: AvatarSquareDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/square.tsx",
  },
  {
    name: "tooltip-stack",
    title: "Tooltip stack",
    component: AvatarTooltipStackDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/tooltip-stack.tsx",
    registryDependencies: ["tooltip"],
  },
  {
    name: "tooltip-single",
    title: "Tooltip avatar",
    component: AvatarTooltipSingleDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/tooltip-single.tsx",
    registryDependencies: ["tooltip"],
  },
  {
    name: "overflow-menu",
    title: "Overflow menu",
    component: AvatarOverflowMenuDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/overflow-menu.tsx",
    registryDependencies: ["dropdown-menu"],
  },
  {
    name: "profile-popover",
    title: "Profile popover",
    component: AvatarProfilePopoverDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/profile-popover.tsx",
    registryDependencies: ["button", "popover"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "upload-overlay",
    title: "Upload overlay",
    component: AvatarUploadOverlayDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/upload-overlay.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "loading-overlay",
    title: "Loading overlay",
    component: AvatarLoadingOverlayDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/loading-overlay.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "status-ring",
    title: "Status ring",
    component: AvatarStatusRingDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/status-ring.tsx",
  },
  {
    name: "profile-label",
    title: "Profile label",
    component: AvatarProfileLabelDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/profile-label.tsx",
  },
  {
    name: "empty-collaborators",
    title: "Empty collaborators",
    component: AvatarEmptyCollaboratorsDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/empty-collaborators.tsx",
  },
  {
    name: "account-menu",
    title: "Account menu",
    component: AvatarAccountMenuDemo,
    componentSlug: "avatar",
    sourcePath: "src/demos/avatar/account-menu.tsx",
    registryDependencies: ["button", "dropdown-menu"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
