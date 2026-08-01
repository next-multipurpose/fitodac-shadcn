import type { DemoEntry } from "@/demos/types"

import SelectAvatarOptionsDemo from "./avatar-options"
import SelectFloatingLabelDemo from "./floating-label"
import SelectFrameworkDemo from "./framework"
import SelectFrameworkIconsDemo from "./framework-icons"
import SelectFullWidthDemo from "./full-width"
import SelectGroupedDemo from "./grouped"
import SelectHelperTextDemo from "./helper-text"
import SelectInsetLabelDemo from "./inset-label"
import SelectInvalidDemo from "./invalid"
import SelectListboxGroupsDemo from "./listbox-groups"
import SelectListboxSingleDemo from "./listbox-single"
import SelectNativeMultipleDemo from "./native-multiple"
import SelectOrganizationComboboxDemo from "./organization-combobox"
import SelectPlanDescriptionsDemo from "./plan-descriptions"
import SelectSearchableFrameworkDemo from "./searchable-framework"
import SelectStatusDemo from "./status"
import SelectThemeDemo from "./theme"
import SelectTimeRangeDemo from "./time-range"
import SelectUserProfileDemo from "./user-profile"

export const selectDemos: DemoEntry[] = [
  {
    name: "theme",
    title: "Theme selector",
    component: SelectThemeDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/theme.tsx",
  },
  {
    name: "framework",
    title: "Framework selector",
    component: SelectFrameworkDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/framework.tsx",
  },
  {
    name: "full-width",
    title: "Full-width select",
    component: SelectFullWidthDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/full-width.tsx",
  },
  {
    name: "time-range",
    title: "Select with leading icon",
    component: SelectTimeRangeDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/time-range.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "helper-text",
    title: "Select with helper text",
    component: SelectHelperTextDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/helper-text.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "invalid",
    title: "Invalid select",
    component: SelectInvalidDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/invalid.tsx",
  },
  {
    name: "grouped",
    title: "Grouped options",
    component: SelectGroupedDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/grouped.tsx",
  },
  {
    name: "floating-label",
    title: "Floating label",
    component: SelectFloatingLabelDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/floating-label.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "status",
    title: "Status selector",
    component: SelectStatusDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/status.tsx",
  },
  {
    name: "framework-icons",
    title: "Framework icons",
    component: SelectFrameworkIconsDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/framework-icons.tsx",
    dependencies: ["@remixicon/react"],
  },
  {
    name: "plan-descriptions",
    title: "Options with descriptions",
    component: SelectPlanDescriptionsDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/plan-descriptions.tsx",
  },
  {
    name: "avatar-options",
    title: "Avatar options",
    component: SelectAvatarOptionsDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/avatar-options.tsx",
  },
  {
    name: "user-profile",
    title: "User profile options",
    component: SelectUserProfileDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/user-profile.tsx",
  },
  {
    name: "searchable-framework",
    title: "Searchable framework combobox",
    component: SelectSearchableFrameworkDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/searchable-framework.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button", "command", "popover", "utils"],
  },
  {
    name: "organization-combobox",
    title: "Organization combobox",
    component: SelectOrganizationComboboxDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/organization-combobox.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button", "command", "popover", "utils"],
  },
  {
    name: "inset-label",
    title: "Inset label",
    component: SelectInsetLabelDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/inset-label.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "native-multiple",
    title: "Native multiple select",
    component: SelectNativeMultipleDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/native-multiple.tsx",
    registryDependencies: ["label", "native-select"],
  },
  {
    name: "listbox-single",
    title: "Single-select listbox",
    component: SelectListboxSingleDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/listbox-single.tsx",
    dependencies: ["react-aria-components"],
    registryDependencies: ["label"],
  },
  {
    name: "listbox-groups",
    title: "Grouped multiple-select listbox",
    component: SelectListboxGroupsDemo,
    componentSlug: "select",
    sourcePath: "src/demos/select/listbox-groups.tsx",
    dependencies: ["react-aria-components"],
    registryDependencies: ["label"],
  },
]
