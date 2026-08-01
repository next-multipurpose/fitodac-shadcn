import type { DemoEntry } from "@/demos/types"

import SkeletonBasicDemo from "./basic"
import SkeletonProfileCardDemo from "./profile-card"
import SkeletonArticleDemo from "./article"
import SkeletonDashboardCardDemo from "./dashboard-card"
import SkeletonTableDemo from "./table"
import SkeletonListDemo from "./list"
import SkeletonFormDemo from "./form"

export const skeletonDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic",
    component: SkeletonBasicDemo,
    componentSlug: "skeleton",
    sourcePath: "src/demos/skeleton/basic.tsx",
  },
  {
    name: "profile-card",
    title: "Profile Card",
    component: SkeletonProfileCardDemo,
    componentSlug: "skeleton",
    sourcePath: "src/demos/skeleton/profile-card.tsx",
    registryDependencies: ["card"],
  },
  {
    name: "article",
    title: "Article",
    component: SkeletonArticleDemo,
    componentSlug: "skeleton",
    sourcePath: "src/demos/skeleton/article.tsx",
    registryDependencies: ["card"],
  },
  {
    name: "dashboard-card",
    title: "Dashboard Card",
    component: SkeletonDashboardCardDemo,
    componentSlug: "skeleton",
    sourcePath: "src/demos/skeleton/dashboard-card.tsx",
  },
  {
    name: "table",
    title: "Table",
    component: SkeletonTableDemo,
    componentSlug: "skeleton",
    sourcePath: "src/demos/skeleton/table.tsx",
  },
  {
    name: "list",
    title: "List",
    component: SkeletonListDemo,
    componentSlug: "skeleton",
    sourcePath: "src/demos/skeleton/list.tsx",
  },
  {
    name: "form",
    title: "Form",
    component: SkeletonFormDemo,
    componentSlug: "skeleton",
    sourcePath: "src/demos/skeleton/form.tsx",
    registryDependencies: ["table"],
  },
]
