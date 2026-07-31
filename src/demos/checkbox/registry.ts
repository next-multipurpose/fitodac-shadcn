import type { DemoEntry } from "@/demos/types"

import CheckboxTermsDemo from "./terms"
import CheckboxCustomColorDemo from "./custom-color"
import CheckboxTodoDemo from "./todo"
import CheckboxRoundTodoDemo from "./round-todo"
import CheckboxInlineGroupDemo from "./inline-group"
import CheckboxVerticalGroupDemo from "./vertical-group"
import CheckboxDescriptionDemo from "./description"
import CheckboxExpandableInputDemo from "./expandable-input"
import CheckboxSelectableCardDemo from "./selectable-card"
import CheckboxAvatarCardDemo from "./avatar-card"
import CheckboxNotificationOptionsDemo from "./notification-options"
import CheckboxPermissionTreeDemo from "./permission-tree"
import CheckboxPlatformListDemo from "./platform-list"
import CheckboxCompactOptionsDemo from "./compact-options"
import CheckboxFeatureGridDemo from "./feature-grid"
import CheckboxUserSelectionDemo from "./user-selection"
import CheckboxPaymentMethodDemo from "./payment-method"

export const checkboxDemos: DemoEntry[] = [
  {
    name: "terms",
    title: "Terms of service",
    component: CheckboxTermsDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/terms.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "custom-color",
    title: "Custom color",
    component: CheckboxCustomColorDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/custom-color.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "todo",
    title: "Todo item",
    component: CheckboxTodoDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/todo.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "round-todo",
    title: "Round todo item",
    component: CheckboxRoundTodoDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/round-todo.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "inline-group",
    title: "Inline group",
    component: CheckboxInlineGroupDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/inline-group.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "vertical-group",
    title: "Vertical group",
    component: CheckboxVerticalGroupDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/vertical-group.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "description",
    title: "Label and description",
    component: CheckboxDescriptionDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/description.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "expandable-input",
    title: "Expandable input",
    component: CheckboxExpandableInputDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/expandable-input.tsx",
    registryDependencies: ["field", "input"],
  },
  {
    name: "selectable-card",
    title: "Selectable card",
    component: CheckboxSelectableCardDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/selectable-card.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "avatar-card",
    title: "Avatar card",
    component: CheckboxAvatarCardDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/avatar-card.tsx",
    registryDependencies: ["avatar", "field"],
  },
  {
    name: "notification-options",
    title: "Notification options",
    component: CheckboxNotificationOptionsDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/notification-options.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "permission-tree",
    title: "Permission tree",
    component: CheckboxPermissionTreeDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/permission-tree.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "platform-list",
    title: "Platform list",
    component: CheckboxPlatformListDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/platform-list.tsx",
    registryDependencies: ["field"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "compact-options",
    title: "Compact options",
    component: CheckboxCompactOptionsDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/compact-options.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "feature-grid",
    title: "Feature grid",
    component: CheckboxFeatureGridDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/feature-grid.tsx",
    registryDependencies: ["field"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "user-selection",
    title: "User selection",
    component: CheckboxUserSelectionDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/user-selection.tsx",
    registryDependencies: ["avatar", "field"],
  },
  {
    name: "payment-method",
    title: "Payment method",
    component: CheckboxPaymentMethodDemo,
    componentSlug: "checkbox",
    sourcePath: "src/demos/checkbox/payment-method.tsx",
    registryDependencies: ["field"],
  },
]
