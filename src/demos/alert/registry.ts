import type { DemoEntry } from "@/demos/types"

import { AlertDefaultDemo } from "./default"
import { AlertDestructiveDemo } from "./destructive"
import AlertDescriptionOnlyDemo from "./description-only"
import AlertInfoIconDemo from "./info-icon"
import AlertSuccessWithDescriptionDemo from "./success-with-description"
import AlertDestructiveIconTitleDemo from "./destructive-icon-title"
import AlertSuccessColoredDemo from "./success-colored"
import AlertWarningColoredDemo from "./warning-colored"
import AlertDestructiveForegroundTitleDemo from "./destructive-foreground-title"
import AlertSuccessIconColorDemo from "./success-icon-color"
import AlertWarningIconColorDemo from "./warning-icon-color"
import AlertPasswordRequirementsDestructiveDemo from "./password-requirements-destructive"
import AlertPasswordRequirementsIconDemo from "./password-requirements-icon"
import AlertPasswordRequirementsPartialSuccessDemo from "./password-requirements-partial-success"
import AlertUndoActionDemo from "./undo-action"
import AlertFriendRequestActionsDemo from "./friend-request-actions"
import AlertDismissActionDemo from "./dismiss-action"

export const alertDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: AlertDefaultDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/default.tsx",
  },
  {
    name: "destructive",
    title: "Destructive",
    component: AlertDestructiveDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/destructive.tsx",
  },
  {
    name: "description-only",
    title: "Description only",
    component: AlertDescriptionOnlyDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/description-only.tsx",
  },
  {
    name: "info-icon",
    title: "Info icon",
    component: AlertInfoIconDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/info-icon.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "success-with-description",
    title: "Success with description",
    component: AlertSuccessWithDescriptionDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/success-with-description.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "destructive-icon-title",
    title: "Destructive icon and title",
    component: AlertDestructiveIconTitleDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/destructive-icon-title.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "success-colored",
    title: "Success colored",
    component: AlertSuccessColoredDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/success-colored.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "warning-colored",
    title: "Warning colored",
    component: AlertWarningColoredDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/warning-colored.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "destructive-foreground-title",
    title: "Destructive with foreground title",
    component: AlertDestructiveForegroundTitleDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/destructive-foreground-title.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "success-icon-color",
    title: "Success icon color",
    component: AlertSuccessIconColorDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/success-icon-color.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "warning-icon-color",
    title: "Warning icon color",
    component: AlertWarningIconColorDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/warning-icon-color.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "password-requirements-destructive",
    title: "Password requirements destructive",
    component: AlertPasswordRequirementsDestructiveDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/password-requirements-destructive.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "password-requirements-icon",
    title: "Password requirements icon",
    component: AlertPasswordRequirementsIconDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/password-requirements-icon.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "password-requirements-partial-success",
    title: "Password requirements partial success",
    component: AlertPasswordRequirementsPartialSuccessDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/password-requirements-partial-success.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "undo-action",
    title: "Undo action",
    component: AlertUndoActionDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/undo-action.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "friend-request-actions",
    title: "Friend request actions",
    component: AlertFriendRequestActionsDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/friend-request-actions.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "dismiss-action",
    title: "Dismiss action",
    component: AlertDismissActionDemo,
    componentSlug: "alert",
    sourcePath: "src/demos/alert/dismiss-action.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
