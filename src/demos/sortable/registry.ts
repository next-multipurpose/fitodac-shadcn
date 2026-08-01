import type { DemoEntry } from "@/demos/types"

import SortableFileListDemo from "./file-list"
import SortableMediaGridDemo from "./media-grid"
import SortableMediaLibraryDemo from "./media-library"
import SortableMusicQueueDemo from "./music-queue"
import SortableNavigationDemo from "./navigation"
import SortableNestedOptionsDemo from "./nested-options"
import SortableNotificationPriorityDemo from "./notification-priority"

export const sortableDemos: DemoEntry[] = [
  {
    name: "file-list",
    title: "Sortable file list",
    component: SortableFileListDemo,
    componentSlug: "sortable",
    sourcePath: "src/demos/sortable/file-list.tsx",
    dependencies: [
      "lucide-react@^0.577.0",
      "sonner",
    ],
    registryDependencies: ["badge"],
  },
  {
    name: "media-grid",
    title: "Sortable media grid",
    component: SortableMediaGridDemo,
    componentSlug: "sortable",
    sourcePath: "src/demos/sortable/media-grid.tsx",
    dependencies: [
      "lucide-react@^0.577.0",
      "sonner",
    ],
    registryDependencies: ["badge", "utils"],
  },
  {
    name: "nested-options",
    title: "Nested sortable options",
    component: SortableNestedOptionsDemo,
    componentSlug: "sortable",
    sourcePath: "src/demos/sortable/nested-options.tsx",
    dependencies: [
      "lucide-react@^0.577.0",
      "sonner",
    ],
    registryDependencies: ["card"],
  },
  {
    name: "music-queue",
    title: "Music queue",
    component: SortableMusicQueueDemo,
    componentSlug: "sortable",
    sourcePath: "src/demos/sortable/music-queue.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "card"],
  },
  {
    name: "notification-priority",
    title: "Notification priority",
    component: SortableNotificationPriorityDemo,
    componentSlug: "sortable",
    sourcePath: "src/demos/sortable/notification-priority.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["card", "switch"],
  },
  {
    name: "navigation",
    title: "Sortable navigation",
    component: SortableNavigationDemo,
    componentSlug: "sortable",
    sourcePath: "src/demos/sortable/navigation.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "card"],
  },
  {
    name: "media-library",
    title: "Sortable media library",
    component: SortableMediaLibraryDemo,
    componentSlug: "sortable",
    sourcePath: "src/demos/sortable/media-library.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["card"],
  },
]
