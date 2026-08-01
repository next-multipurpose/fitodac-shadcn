import type { DemoEntry } from "@/demos/types"

import SwitchBasicDemo from "./basic"
import SwitchCustomColorDemo from "./custom-color"
import SwitchDisabledDemo from "./disabled"
import SwitchSizesDemo from "./sizes"
import SwitchControlledStateDemo from "./controlled-state"
import SwitchIconLabelsDemo from "./icon-labels"
import SwitchSegmentedIconsDemo from "./segmented-icons"
import SwitchSlidingIconsDemo from "./sliding-icons"
import SwitchOptionCardsDemo from "./option-cards"
import SwitchNotificationSettingsDemo from "./notification-settings"
import SwitchDestructiveSettingDemo from "./destructive-setting"
import SwitchEditorPreferencesDemo from "./editor-preferences"
import SwitchFeatureGridDemo from "./feature-grid"

export const switchDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic switch",
    component: SwitchBasicDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/basic.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "custom-color",
    title: "Custom color",
    component: SwitchCustomColorDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/custom-color.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "disabled",
    title: "Disabled states",
    component: SwitchDisabledDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/disabled.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "sizes",
    title: "Switch sizes",
    component: SwitchSizesDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/sizes.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "controlled-state",
    title: "Controlled state",
    component: SwitchControlledStateDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/controlled-state.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "icon-labels",
    title: "Icon labels",
    component: SwitchIconLabelsDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/icon-labels.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["field"],
  },
  {
    name: "segmented-icons",
    title: "Segmented icon switch",
    component: SwitchSegmentedIconsDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/segmented-icons.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["field", "utils"],
  },
  {
    name: "sliding-icons",
    title: "Sliding icon switch",
    component: SwitchSlidingIconsDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/sliding-icons.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["field", "utils"],
  },
  {
    name: "option-cards",
    title: "Option cards",
    component: SwitchOptionCardsDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/option-cards.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["label"],
  },
  {
    name: "notification-settings",
    title: "Notification settings",
    component: SwitchNotificationSettingsDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/notification-settings.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["field"],
  },
  {
    name: "destructive-setting",
    title: "Destructive setting",
    component: SwitchDestructiveSettingDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/destructive-setting.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "editor-preferences",
    title: "Editor preferences",
    component: SwitchEditorPreferencesDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/editor-preferences.tsx",
    registryDependencies: ["separator"],
  },
  {
    name: "feature-grid",
    title: "Feature grid",
    component: SwitchFeatureGridDemo,
    componentSlug: "switch",
    sourcePath: "src/demos/switch/feature-grid.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["field"],
  },
]
