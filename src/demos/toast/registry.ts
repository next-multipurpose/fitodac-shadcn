import type { DemoEntry } from "@/demos/types"

import ToastEventActionDemo from "./event-action"
import ToastSuccessDemo from "./success"
import ToastErrorDemo from "./error"
import ToastPromiseSuccessDemo from "./promise-success"
import ToastUndoActionDemo from "./undo-action"
import ToastOrderActionDemo from "./order-action"
import ToastCustomColorDemo from "./custom-color"
import ToastPromiseErrorDemo from "./promise-error"
import ToastWarningActionsDemo from "./warning-actions"
import ToastCustomMessageDemo from "./custom-message"
import ToastTaskActionDemo from "./task-action"
import ToastTopCenterDemo from "./top-center"
import ToastSoftInfoDemo from "./soft-info"
import ToastSoftSuccessDemo from "./soft-success"
import ToastSoftWarningDemo from "./soft-warning"
import ToastSoftDestructiveDemo from "./soft-destructive"
import ToastSolidInfoDemo from "./solid-info"
import ToastSolidSuccessDemo from "./solid-success"
import ToastSolidWarningDemo from "./solid-warning"
import ToastSolidDestructiveDemo from "./solid-destructive"

export const toastDemos: DemoEntry[] = [
  {
    name: "event-action",
    title: "Toast with action",
    component: ToastEventActionDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/event-action.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "success",
    title: "Success toast",
    component: ToastSuccessDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/success.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "error",
    title: "Error toast",
    component: ToastErrorDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/error.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "promise-success",
    title: "Promise success",
    component: ToastPromiseSuccessDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/promise-success.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "undo-action",
    title: "Undo action",
    component: ToastUndoActionDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/undo-action.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "order-action",
    title: "Order action",
    component: ToastOrderActionDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/order-action.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "custom-color",
    title: "Custom color",
    component: ToastCustomColorDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/custom-color.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "promise-error",
    title: "Promise error",
    component: ToastPromiseErrorDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/promise-error.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "warning-actions",
    title: "Warning with actions",
    component: ToastWarningActionsDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/warning-actions.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "custom-message",
    title: "Custom message toast",
    component: ToastCustomMessageDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/custom-message.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["avatar", "button", "sonner"],
  },
  {
    name: "task-action",
    title: "Task action",
    component: ToastTaskActionDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/task-action.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "top-center",
    title: "Top-center position",
    component: ToastTopCenterDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/top-center.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "soft-info",
    title: "Soft info toast",
    component: ToastSoftInfoDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/soft-info.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "soft-success",
    title: "Soft success toast",
    component: ToastSoftSuccessDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/soft-success.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "soft-warning",
    title: "Soft warning toast",
    component: ToastSoftWarningDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/soft-warning.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "soft-destructive",
    title: "Soft destructive toast",
    component: ToastSoftDestructiveDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/soft-destructive.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "solid-info",
    title: "Solid info toast",
    component: ToastSolidInfoDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/solid-info.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "solid-success",
    title: "Solid success toast",
    component: ToastSolidSuccessDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/solid-success.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "solid-warning",
    title: "Solid warning toast",
    component: ToastSolidWarningDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/solid-warning.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
  {
    name: "solid-destructive",
    title: "Solid destructive toast",
    component: ToastSolidDestructiveDemo,
    componentSlug: "toast",
    sourcePath: "src/demos/toast/solid-destructive.tsx",
    dependencies: ["sonner"],
    registryDependencies: ["button", "sonner"],
  },
]
