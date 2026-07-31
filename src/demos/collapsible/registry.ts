import type { DemoEntry } from "@/demos/types"

import CollapsibleStarredRepositoriesDemo from "./starred-repositories"
import CollapsibleFileTreeDemo from "./file-tree"
import CollapsibleOrderCardDemo from "./order-card"
import CollapsibleReplyFormDemo from "./reply-form"
import CollapsibleNestedCommentsDemo from "./nested-comments"
import CollapsibleDropdownSectionsDemo from "./dropdown-sections"
import CollapsibleFaqListDemo from "./faq-list"
import CollapsibleCodeRevealDemo from "./code-reveal"
import CollapsibleFiltersDemo from "./filters"
import CollapsibleShowMoreDemo from "./show-more"
import CollapsibleTaskListDemo from "./task-list"
import CollapsibleProfileListDemo from "./profile-list"
import CollapsibleCheckoutFormDemo from "./checkout-form"

export const collapsibleDemos: DemoEntry[] = [
  {
    name: "starred-repositories",
    title: "Starred repositories",
    component: CollapsibleStarredRepositoriesDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/starred-repositories.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "file-tree",
    title: "File tree",
    component: CollapsibleFileTreeDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/file-tree.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "order-card",
    title: "Order tracking card",
    component: CollapsibleOrderCardDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/order-card.tsx",
    registryDependencies: ["button", "card"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "reply-form",
    title: "Reply form",
    component: CollapsibleReplyFormDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/reply-form.tsx",
    registryDependencies: ["avatar", "button", "input-group"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "nested-comments",
    title: "Nested comments",
    component: CollapsibleNestedCommentsDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/nested-comments.tsx",
    registryDependencies: ["avatar", "badge", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "dropdown-sections",
    title: "Dropdown sections",
    component: CollapsibleDropdownSectionsDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/dropdown-sections.tsx",
    registryDependencies: ["button", "dropdown-menu"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "faq-list",
    title: "FAQ list",
    component: CollapsibleFaqListDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/faq-list.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "code-reveal",
    title: "Code reveal",
    component: CollapsibleCodeRevealDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/code-reveal.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "filters",
    title: "Filters",
    component: CollapsibleFiltersDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/filters.tsx",
    registryDependencies: ["button", "checkbox", "input", "label", "separator"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "show-more",
    title: "Show more answers",
    component: CollapsibleShowMoreDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/show-more.tsx",
  },
  {
    name: "task-list",
    title: "Task list",
    component: CollapsibleTaskListDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/task-list.tsx",
    registryDependencies: ["avatar", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "profile-list",
    title: "Profile list",
    component: CollapsibleProfileListDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/profile-list.tsx",
    registryDependencies: ["avatar", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "checkout-form",
    title: "Checkout form",
    component: CollapsibleCheckoutFormDemo,
    componentSlug: "collapsible",
    sourcePath: "src/demos/collapsible/checkout-form.tsx",
    registryDependencies: ["button", "input", "label", "radio-group", "separator", "textarea"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
