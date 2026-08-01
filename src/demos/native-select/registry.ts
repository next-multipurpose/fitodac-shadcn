import type { DemoEntry } from "@/demos/types"

import NativeSelectDefaultDemo from "./default"
import NativeSelectFloatingLabelDemo from "./floating-label"
import NativeSelectHelperTextDemo from "./helper-text"
import NativeSelectInsetLabelDemo from "./inset-label"
import NativeSelectInvalidDemo from "./invalid"
import NativeSelectLabelDemo from "./label"
import NativeSelectLeadingIconDemo from "./leading-icon"
import NativeSelectOptionGroupsDemo from "./option-groups"
import NativeSelectPlaceholderDemo from "./placeholder"

export const nativeSelectDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default native select",
    component: NativeSelectDefaultDemo,
    componentSlug: "native-select",
    sourcePath: "src/demos/native-select/default.tsx",
  },
  {
    name: "placeholder",
    title: "Placeholder",
    component: NativeSelectPlaceholderDemo,
    componentSlug: "native-select",
    sourcePath: "src/demos/native-select/placeholder.tsx",
  },
  {
    name: "leading-icon",
    title: "Leading icon",
    component: NativeSelectLeadingIconDemo,
    componentSlug: "native-select",
    sourcePath: "src/demos/native-select/leading-icon.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "helper-text",
    title: "Helper text",
    component: NativeSelectHelperTextDemo,
    componentSlug: "native-select",
    sourcePath: "src/demos/native-select/helper-text.tsx",
  },
  {
    name: "invalid",
    title: "Invalid state",
    component: NativeSelectInvalidDemo,
    componentSlug: "native-select",
    sourcePath: "src/demos/native-select/invalid.tsx",
  },
  {
    name: "label",
    title: "With label",
    component: NativeSelectLabelDemo,
    componentSlug: "native-select",
    sourcePath: "src/demos/native-select/label.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "option-groups",
    title: "Option groups",
    component: NativeSelectOptionGroupsDemo,
    componentSlug: "native-select",
    sourcePath: "src/demos/native-select/option-groups.tsx",
  },
  {
    name: "floating-label",
    title: "Floating label",
    component: NativeSelectFloatingLabelDemo,
    componentSlug: "native-select",
    sourcePath: "src/demos/native-select/floating-label.tsx",
  },
  {
    name: "inset-label",
    title: "Inset label",
    component: NativeSelectInsetLabelDemo,
    componentSlug: "native-select",
    sourcePath: "src/demos/native-select/inset-label.tsx",
  },
]
