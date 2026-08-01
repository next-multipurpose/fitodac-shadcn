import type { DemoEntry } from "@/demos/types"

import SpinnerAccessibleLabelDemo from "./accessible-label"
import SpinnerAvatarOverlayDemo from "./avatar-overlay"
import SpinnerBadgeDemo from "./badge"
import SpinnerBasicDemo from "./basic"
import SpinnerCustomColorDemo from "./custom-color"
import SpinnerDownloadItemDemo from "./download-item"
import SpinnerIconButtonDemo from "./icon-button"
import SpinnerInputAddonDemo from "./input-addon"
import SpinnerLoadingButtonDemo from "./loading-button"
import SpinnerPaymentItemDemo from "./payment-item"
import SpinnerProcessingStateDemo from "./processing-state"
import SpinnerSizesDemo from "./sizes"
import SpinnerTaskProgressDemo from "./task-progress"
import SpinnerTextareaValidationDemo from "./textarea-validation"

export const spinnerDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic spinner",
    component: SpinnerBasicDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/basic.tsx",
  },
  {
    name: "sizes",
    title: "Spinner sizes",
    component: SpinnerSizesDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/sizes.tsx",
  },
  {
    name: "custom-color",
    title: "Custom color",
    component: SpinnerCustomColorDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/custom-color.tsx",
  },
  {
    name: "accessible-label",
    title: "Accessible label",
    component: SpinnerAccessibleLabelDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/accessible-label.tsx",
  },
  {
    name: "loading-button",
    title: "Loading button",
    component: SpinnerLoadingButtonDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/loading-button.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "icon-button",
    title: "Loading icon button",
    component: SpinnerIconButtonDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/icon-button.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "badge",
    title: "Syncing badge",
    component: SpinnerBadgeDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/badge.tsx",
    registryDependencies: ["badge"],
  },
  {
    name: "processing-state",
    title: "Processing empty state",
    component: SpinnerProcessingStateDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/processing-state.tsx",
    registryDependencies: ["button", "empty"],
  },
  {
    name: "input-addon",
    title: "Input loading addon",
    component: SpinnerInputAddonDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/input-addon.tsx",
    registryDependencies: ["input-group"],
  },
  {
    name: "textarea-validation",
    title: "Textarea validation",
    component: SpinnerTextareaValidationDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/textarea-validation.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["input-group"],
  },
  {
    name: "avatar-overlay",
    title: "Avatar loading overlay",
    component: SpinnerAvatarOverlayDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/avatar-overlay.tsx",
    registryDependencies: ["avatar"],
  },
  {
    name: "task-progress",
    title: "Task progress",
    component: SpinnerTaskProgressDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/task-progress.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "download-item",
    title: "Download item",
    component: SpinnerDownloadItemDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/download-item.tsx",
    registryDependencies: ["button", "item"],
  },
  {
    name: "payment-item",
    title: "Payment processing item",
    component: SpinnerPaymentItemDemo,
    componentSlug: "spinner",
    sourcePath: "src/demos/spinner/payment-item.tsx",
    registryDependencies: ["item"],
  },
]
