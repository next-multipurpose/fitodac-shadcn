import type { DemoEntry } from "@/demos/types"

import BreadcrumbDefaultDemo from "./default"
import BreadcrumbEllipsisMenuDemo from "./ellipsis-menu"
import BreadcrumbHomeIconDemo from "./home-icon"
import BreadcrumbSlashSeparatorDemo from "./slash-separator"
import BreadcrumbDotSeparatorDemo from "./dot-separator"
import BreadcrumbBorderedDemo from "./bordered"

export const breadcrumbDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: BreadcrumbDefaultDemo,
    componentSlug: "breadcrumb",
    sourcePath: "src/demos/breadcrumb/default.tsx",
  },
  {
    name: "ellipsis-menu",
    title: "Ellipsis menu",
    component: BreadcrumbEllipsisMenuDemo,
    componentSlug: "breadcrumb",
    sourcePath: "src/demos/breadcrumb/ellipsis-menu.tsx",
    registryDependencies: ["dropdown-menu"],
  },
  {
    name: "home-icon",
    title: "Home icon",
    component: BreadcrumbHomeIconDemo,
    componentSlug: "breadcrumb",
    sourcePath: "src/demos/breadcrumb/home-icon.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "slash-separator",
    title: "Slash separator",
    component: BreadcrumbSlashSeparatorDemo,
    componentSlug: "breadcrumb",
    sourcePath: "src/demos/breadcrumb/slash-separator.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "dot-separator",
    title: "Dot separator",
    component: BreadcrumbDotSeparatorDemo,
    componentSlug: "breadcrumb",
    sourcePath: "src/demos/breadcrumb/dot-separator.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "bordered",
    title: "Bordered",
    component: BreadcrumbBorderedDemo,
    componentSlug: "breadcrumb",
    sourcePath: "src/demos/breadcrumb/bordered.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
]
