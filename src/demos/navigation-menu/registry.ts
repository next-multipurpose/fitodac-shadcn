import type { DemoEntry } from "@/demos/types"

import NavigationMenuCommerceDemo from "./commerce"
import NavigationMenuPlatformDemo from "./platform"
import NavigationMenuSecurityDemo from "./security-platform"

export const navigationMenuDemos: DemoEntry[] = [
  {
    name: "platform",
    title: "Platform navigation",
    component: NavigationMenuPlatformDemo,
    componentSlug: "navigation-menu",
    sourcePath: "src/demos/navigation-menu/platform.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["use-mobile"],
    previewMinHeight: 140,
    previewClassName: "[&>nav]:-translate-y-50 [&>nav]:-translate-x-40"
  },
  {
    name: "security-platform",
    title: "Security platform navigation",
    component: NavigationMenuSecurityDemo,
    componentSlug: "navigation-menu",
    sourcePath: "src/demos/navigation-menu/security-platform.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "use-mobile"],
    previewMinHeight: 140,
    previewClassName: "[&>nav]:-translate-y-50 [&>nav]:-translate-x-40"
  },
  {
    name: "commerce",
    title: "Commerce navigation",
    component: NavigationMenuCommerceDemo,
    componentSlug: "navigation-menu",
    sourcePath: "src/demos/navigation-menu/commerce.tsx",
    registryDependencies: ["use-mobile"],
    previewMinHeight: 140,
    previewClassName: "[&>nav]:-translate-y-50 [&>nav]:-translate-x-40"
  },
]
