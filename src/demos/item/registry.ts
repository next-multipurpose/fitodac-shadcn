import type { DemoEntry } from "@/demos/types"

import ItemAvatarActionDemo from "./avatar-action"
import ItemBasicDemo from "./basic"
import ItemDropdownSelectionDemo from "./dropdown-selection"
import ItemLinkItemsDemo from "./link-items"
import ItemModelCardsDemo from "./model-cards"
import ItemMusicListDemo from "./music-list"
import ItemPeopleListDemo from "./people-list"
import ItemSecurityAlertDemo from "./security-alert"
import ItemTeamInviteDemo from "./team-invite"
import ItemVariantsDemo from "./variants"

export const itemDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic item",
    component: ItemBasicDemo,
    componentSlug: "item",
    sourcePath: "src/demos/item/basic.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "variants",
    title: "Variants",
    component: ItemVariantsDemo,
    componentSlug: "item",
    sourcePath: "src/demos/item/variants.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "security-alert",
    title: "Security alert",
    component: ItemSecurityAlertDemo,
    componentSlug: "item",
    sourcePath: "src/demos/item/security-alert.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "avatar-action",
    title: "Avatar with action",
    component: ItemAvatarActionDemo,
    componentSlug: "item",
    sourcePath: "src/demos/item/avatar-action.tsx",
    registryDependencies: ["avatar", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "team-invite",
    title: "Team invite",
    component: ItemTeamInviteDemo,
    componentSlug: "item",
    sourcePath: "src/demos/item/team-invite.tsx",
    registryDependencies: ["avatar", "button"],
  },
  {
    name: "music-list",
    title: "Music list",
    component: ItemMusicListDemo,
    componentSlug: "item",
    sourcePath: "src/demos/item/music-list.tsx",
  },
  {
    name: "people-list",
    title: "People list",
    component: ItemPeopleListDemo,
    componentSlug: "item",
    sourcePath: "src/demos/item/people-list.tsx",
    registryDependencies: ["avatar", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "model-cards",
    title: "Model cards",
    component: ItemModelCardsDemo,
    componentSlug: "item",
    sourcePath: "src/demos/item/model-cards.tsx",
  },
  {
    name: "link-items",
    title: "Link items",
    component: ItemLinkItemsDemo,
    componentSlug: "item",
    sourcePath: "src/demos/item/link-items.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "dropdown-selection",
    title: "Dropdown selection",
    component: ItemDropdownSelectionDemo,
    componentSlug: "item",
    sourcePath: "src/demos/item/dropdown-selection.tsx",
    registryDependencies: ["avatar", "button", "dropdown-menu"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
