import type { DemoEntry } from "@/demos/types"

import ScrollAreaChatDemo from "./chat"
import ScrollAreaHorizontalProfilesDemo from "./horizontal-profiles"
import ScrollAreaNotificationsDemo from "./notifications"
import ScrollAreaPrivacySheetDemo from "./privacy-sheet"
import ScrollAreaTagsDemo from "./tags"
import ScrollAreaUsersDemo from "./users"

export const scrollAreaDemos: DemoEntry[] = [
  {
    name: "tags",
    title: "Scrollable tags",
    component: ScrollAreaTagsDemo,
    componentSlug: "scroll-area",
    sourcePath: "src/demos/scroll-area/tags.tsx",
    registryDependencies: ["separator"],
  },
  {
    name: "privacy-sheet",
    title: "Privacy policy sheet",
    component: ScrollAreaPrivacySheetDemo,
    componentSlug: "scroll-area",
    sourcePath: "src/demos/scroll-area/privacy-sheet.tsx",
    registryDependencies: ["button", "sheet"],
  },
  {
    name: "users",
    title: "Scrollable users",
    component: ScrollAreaUsersDemo,
    componentSlug: "scroll-area",
    sourcePath: "src/demos/scroll-area/users.tsx",
    registryDependencies: ["avatar"],
  },
  {
    name: "notifications",
    title: "Grouped notifications",
    component: ScrollAreaNotificationsDemo,
    componentSlug: "scroll-area",
    sourcePath: "src/demos/scroll-area/notifications.tsx",
  },
  {
    name: "horizontal-profiles",
    title: "Horizontal profiles",
    component: ScrollAreaHorizontalProfilesDemo,
    componentSlug: "scroll-area",
    sourcePath: "src/demos/scroll-area/horizontal-profiles.tsx",
    registryDependencies: ["avatar"],
  },
  {
    name: "chat",
    title: "Scrollable chat",
    component: ScrollAreaChatDemo,
    componentSlug: "scroll-area",
    sourcePath: "src/demos/scroll-area/chat.tsx",
    dependencies: ["date-fns", "lucide-react@^0.577.0"],
    registryDependencies: ["avatar", "button", "input"],
  },
]
