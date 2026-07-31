import type { DemoEntry } from "@/demos/types"

import EmptyNoProjectsDemo from "./no-projects"
import EmptyNoDesignersDemo from "./no-designers"
import EmptyCloudStorageDemo from "./cloud-storage"
import EmptyNotFoundSearchDemo from "./not-found-search"
import EmptyMaintenanceDemo from "./maintenance"
import EmptyNoItemsDemo from "./no-items"
import EmptyNotFoundDemo from "./not-found"
import EmptyOfflineDemo from "./offline"

export const emptyDemos: DemoEntry[] = [
  {
    name: "no-projects",
    title: "No projects",
    component: EmptyNoProjectsDemo,
    componentSlug: "empty",
    sourcePath: "src/demos/empty/no-projects.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "no-designers",
    title: "No designers",
    component: EmptyNoDesignersDemo,
    componentSlug: "empty",
    sourcePath: "src/demos/empty/no-designers.tsx",
    registryDependencies: ["avatar", "button"],
  },
  {
    name: "cloud-storage",
    title: "Cloud storage",
    component: EmptyCloudStorageDemo,
    componentSlug: "empty",
    sourcePath: "src/demos/empty/cloud-storage.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "not-found-search",
    title: "404 with search",
    component: EmptyNotFoundSearchDemo,
    componentSlug: "empty",
    sourcePath: "src/demos/empty/not-found-search.tsx",
    registryDependencies: ["input-group", "kbd"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "maintenance",
    title: "Maintenance",
    component: EmptyMaintenanceDemo,
    componentSlug: "empty",
    sourcePath: "src/demos/empty/maintenance.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "no-items",
    title: "No items",
    component: EmptyNoItemsDemo,
    componentSlug: "empty",
    sourcePath: "src/demos/empty/no-items.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "not-found",
    title: "404 page",
    component: EmptyNotFoundDemo,
    componentSlug: "empty",
    sourcePath: "src/demos/empty/not-found.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "offline",
    title: "Offline",
    component: EmptyOfflineDemo,
    componentSlug: "empty",
    sourcePath: "src/demos/empty/offline.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
