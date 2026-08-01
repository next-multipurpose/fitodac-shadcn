import type { DemoEntry } from "@/demos/types"

import FileUploadImageButtonDemo from "./image-button"
import FileUploadAvatarDemo from "./avatar"
import FileUploadLogoDemo from "./logo"
import FileUploadCompactDemo from "./compact"
import FileUploadGalleryDemo from "./gallery"
import FileUploadProgressListDemo from "./progress-list"
import FileUploadTableDemo from "./table"
import FileUploadImageGridDemo from "./image-grid"
import FileUploadSortableGalleryDemo from "./sortable-gallery"
import FileUploadFileGridDemo from "./file-grid"
import FileUploadCoverImageDemo from "./cover-image"
import FileUploadWorkspaceImportDemo from "./workspace-import"
import FileUploadCloudStorageDemo from "./cloud-storage"
import FileUploadSpreadsheetProgressDemo from "./spreadsheet-progress"
import FileUploadCompletedFileDemo from "./completed-file"
import FileUploadQueueDemo from "./upload-queue"

export const fileUploadDemos: DemoEntry[] = [
  {
    name: "image-button",
    title: "Image upload button",
    component: FileUploadImageButtonDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/image-button.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "avatar",
    title: "Avatar upload",
    component: FileUploadAvatarDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/avatar.tsx",
    registryDependencies: ["alert", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "logo",
    title: "Logo upload",
    component: FileUploadLogoDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/logo.tsx",
    registryDependencies: ["alert", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "compact",
    title: "Compact upload",
    component: FileUploadCompactDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/compact.tsx",
    registryDependencies: ["alert", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "gallery",
    title: "Image gallery",
    component: FileUploadGalleryDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/gallery.tsx",
    registryDependencies: ["alert", "button", "dialog"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "progress-list",
    title: "Upload progress list",
    component: FileUploadProgressListDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/progress-list.tsx",
    registryDependencies: ["alert", "badge", "button", "progress"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "table",
    title: "Upload table",
    component: FileUploadTableDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/table.tsx",
    registryDependencies: ["alert", "badge", "button", "table"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "image-grid",
    title: "Image grid",
    component: FileUploadImageGridDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/image-grid.tsx",
    registryDependencies: ["alert", "button", "progress"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "sortable-gallery",
    title: "Sortable image gallery",
    component: FileUploadSortableGalleryDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/sortable-gallery.tsx",
    registryDependencies: ["alert", "button", "card"],
    dependencies: ["@dnd-kit/core@^6.3.1", "@dnd-kit/sortable@^10.0.0", "@dnd-kit/utilities@^3.2.2", "lucide-react@^0.577.0", "sonner@^2.0.7"],
  },
  {
    name: "file-grid",
    title: "File grid",
    component: FileUploadFileGridDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/file-grid.tsx",
    registryDependencies: ["alert", "button", "tooltip"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "cover-image",
    title: "Cover image",
    component: FileUploadCoverImageDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/cover-image.tsx",
    registryDependencies: ["alert", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "workspace-import",
    title: "Workspace import",
    component: FileUploadWorkspaceImportDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/workspace-import.tsx",
    registryDependencies: ["button", "card", "label"],
  },
  {
    name: "cloud-storage",
    title: "Cloud storage upload",
    component: FileUploadCloudStorageDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/cloud-storage.tsx",
    registryDependencies: ["button", "card", "input", "label", "select", "separator"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "spreadsheet-progress",
    title: "Spreadsheet upload progress",
    component: FileUploadSpreadsheetProgressDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/spreadsheet-progress.tsx",
    registryDependencies: ["button", "card"],
    dependencies: ["lucide-react@^0.577.0", "sonner@^2.0.7"],
  },
  {
    name: "completed-file",
    title: "Completed file",
    component: FileUploadCompletedFileDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/completed-file.tsx",
    registryDependencies: ["label"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "upload-queue",
    title: "Upload queue",
    component: FileUploadQueueDemo,
    componentSlug: "file-upload",
    sourcePath: "src/demos/file-upload/upload-queue.tsx",
    registryDependencies: ["button", "card", "separator"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
