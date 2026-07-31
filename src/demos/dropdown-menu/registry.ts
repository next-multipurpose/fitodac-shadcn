import type { DemoEntry } from "@/demos/types"

import DropdownMenuDefaultDemo from "./default"
import DropdownMenuIconTriggerDemo from "./icon-trigger"
import DropdownMenuIconsDemo from "./icons"
import DropdownMenuGroupedDemo from "./grouped"
import DropdownMenuLabeledGroupsDemo from "./labeled-groups"
import DropdownMenuCheckboxItemsDemo from "./checkbox-items"
import DropdownMenuRadioItemsDemo from "./radio-items"
import DropdownMenuRichDemo from "./rich-menu"
import DropdownMenuAccountDemo from "./account-menu"
import DropdownMenuHelpDemo from "./help-menu"
import DropdownMenuAddBlockDemo from "./add-block"
import DropdownMenuThemeSelectorDemo from "./theme-selector"
import DropdownMenuUserSwitcherDemo from "./user-switcher"
import DropdownMenuChatListDemo from "./chat-list"
import DropdownMenuContactActionsDemo from "./contact-actions"
import DropdownMenuMeetingScheduleDemo from "./meeting-schedule"

export const dropdownMenuDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: DropdownMenuDefaultDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/default.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "icon-trigger",
    title: "Icon trigger",
    component: DropdownMenuIconTriggerDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/icon-trigger.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "icons",
    title: "Menu with icons",
    component: DropdownMenuIconsDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/icons.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "grouped",
    title: "Grouped items",
    component: DropdownMenuGroupedDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/grouped.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "labeled-groups",
    title: "Labeled groups",
    component: DropdownMenuLabeledGroupsDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/labeled-groups.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "checkbox-items",
    title: "Checkbox items",
    component: DropdownMenuCheckboxItemsDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/checkbox-items.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "radio-items",
    title: "Radio items",
    component: DropdownMenuRadioItemsDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/radio-items.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "rich-menu",
    title: "Rich menu",
    component: DropdownMenuRichDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/rich-menu.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "account-menu",
    title: "Account menu",
    component: DropdownMenuAccountDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/account-menu.tsx",
    registryDependencies: ["avatar", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "help-menu",
    title: "Help menu",
    component: DropdownMenuHelpDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/help-menu.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "add-block",
    title: "Add block",
    component: DropdownMenuAddBlockDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/add-block.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "theme-selector",
    title: "Theme selector",
    component: DropdownMenuThemeSelectorDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/theme-selector.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "user-switcher",
    title: "User switcher",
    component: DropdownMenuUserSwitcherDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/user-switcher.tsx",
    registryDependencies: ["avatar"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "chat-list",
    title: "Chat list",
    component: DropdownMenuChatListDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/chat-list.tsx",
    registryDependencies: ["avatar", "badge", "button"],
  },
  {
    name: "contact-actions",
    title: "Contact actions",
    component: DropdownMenuContactActionsDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/contact-actions.tsx",
    registryDependencies: ["avatar", "button"],
  },
  {
    name: "meeting-schedule",
    title: "Meeting schedule",
    component: DropdownMenuMeetingScheduleDemo,
    componentSlug: "dropdown-menu",
    sourcePath: "src/demos/dropdown-menu/meeting-schedule.tsx",
    registryDependencies: ["avatar", "button", "switch"],
  },
]
