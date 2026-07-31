import type { DemoEntry } from "@/demos/types"

import DrawerTopSessionExpiredDemo from "./top-session-expired"
import DrawerScrollableRightDemo from "./scrollable-right"
import DrawerMoreInfoDemo from "./more-info"
import DrawerCookieSettingsDemo from "./cookie-settings"
import DrawerLoginFormDemo from "./login-form"
import DrawerTaskFormDemo from "./task-form"

export const drawerDemos: DemoEntry[] = [
  {
    name: "top-session-expired",
    title: "Top drawer",
    component: DrawerTopSessionExpiredDemo,
    componentSlug: "drawer",
    sourcePath: "src/demos/drawer/top-session-expired.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "scrollable-right",
    title: "Scrollable right drawer",
    component: DrawerScrollableRightDemo,
    componentSlug: "drawer",
    sourcePath: "src/demos/drawer/scrollable-right.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "more-info",
    title: "More info",
    component: DrawerMoreInfoDemo,
    componentSlug: "drawer",
    sourcePath: "src/demos/drawer/more-info.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "cookie-settings",
    title: "Cookie settings",
    component: DrawerCookieSettingsDemo,
    componentSlug: "drawer",
    sourcePath: "src/demos/drawer/cookie-settings.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "login-form",
    title: "Login form",
    component: DrawerLoginFormDemo,
    componentSlug: "drawer",
    sourcePath: "src/demos/drawer/login-form.tsx",
    registryDependencies: ["button", "input", "label"],
  },
  {
    name: "task-form",
    title: "Task form",
    component: DrawerTaskFormDemo,
    componentSlug: "drawer",
    sourcePath: "src/demos/drawer/task-form.tsx",
    registryDependencies: ["avatar", "button", "calendar", "input", "label", "popover", "select"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
