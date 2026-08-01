import type { DemoEntry } from "@/demos/types"

import SheetAccountFormDemo from "./account-form"
import SheetBottomActionsDemo from "./bottom-actions"
import SheetDefaultDemo from "./default"
import SheetEditProfileDemo from "./edit-profile"
import SheetLeftNavigationDemo from "./left-navigation"
import SheetScrollableTermsDemo from "./scrollable-terms"
import SheetTopNotificationsDemo from "./top-notifications"

export const sheetDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default sheet",
    component: SheetDefaultDemo,
    componentSlug: "sheet",
    sourcePath: "src/demos/sheet/default.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "scrollable-terms",
    title: "Scrollable terms",
    component: SheetScrollableTermsDemo,
    componentSlug: "sheet",
    sourcePath: "src/demos/sheet/scrollable-terms.tsx",
    registryDependencies: ["button", "scroll-area"],
  },
  {
    name: "left-navigation",
    title: "Left navigation sheet",
    component: SheetLeftNavigationDemo,
    componentSlug: "sheet",
    sourcePath: "src/demos/sheet/left-navigation.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "account-form",
    title: "Account form",
    component: SheetAccountFormDemo,
    componentSlug: "sheet",
    sourcePath: "src/demos/sheet/account-form.tsx",
    registryDependencies: ["button", "input", "label"],
  },
  {
    name: "top-notifications",
    title: "Top notifications sheet",
    component: SheetTopNotificationsDemo,
    componentSlug: "sheet",
    sourcePath: "src/demos/sheet/top-notifications.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "bottom-actions",
    title: "Bottom quick actions",
    component: SheetBottomActionsDemo,
    componentSlug: "sheet",
    sourcePath: "src/demos/sheet/bottom-actions.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "edit-profile",
    title: "Edit profile",
    component: SheetEditProfileDemo,
    componentSlug: "sheet",
    sourcePath: "src/demos/sheet/edit-profile.tsx",
    registryDependencies: ["avatar", "button", "input", "label"],
  },
]
