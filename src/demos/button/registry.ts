import type { DemoEntry } from "@/demos/types"

import { ButtonDefaultDemo } from "./default"
import { ButtonSizesDemo } from "./sizes"
import { ButtonVariantsDemo } from "./variants"
import ButtonRippleEffectDemo from "./ripple-effect"
import ButtonResponsiveAddDemo from "./responsive-add"
import ButtonDestructiveIconDemo from "./destructive-icon"
import ButtonCancelSaveDemo from "./cancel-save"
import ButtonMessagesCountDemo from "./messages-count"
import ButtonKeyboardShortcutDemo from "./keyboard-shortcut"
import ButtonLoadingDisabledDemo from "./loading-disabled"
import ButtonLoadingStateDemo from "./loading-state"
import ButtonProfilePillDemo from "./profile-pill"
import ButtonRoundIconDemo from "./round-icon"
import ButtonNotificationBadgeDemo from "./notification-badge"
import ButtonCopyFeedbackDemo from "./copy-feedback"
import ButtonVerticalGroupDemo from "./vertical-group"
import ButtonTapAnimationDemo from "./tap-animation"
import ButtonSplitDropdownDemo from "./split-dropdown"
import ButtonPermissionsDemo from "./permissions"
import ButtonMergeOptionsDemo from "./merge-options"
import ButtonPreviousGroupDemo from "./previous-group"
import ButtonNextGroupDemo from "./next-group"
import ButtonStarCountDemo from "./star-count"
import ButtonLikeCountDemo from "./like-count"
import ButtonSocialIconButtonsDemo from "./social-icon-buttons"
import ButtonSocialOutlineButtonsDemo from "./social-outline-buttons"
import ButtonSocialFilledButtonsDemo from "./social-filled-buttons"
import ButtonTooltipIconDemo from "./tooltip-icon"
import ButtonGhostArrowDemo from "./ghost-arrow"
import ButtonAnimatedLinkDemo from "./animated-link"
import ButtonHeartbeatDemo from "./heartbeat"
import ButtonCraftButtonDemo from "./craft-button"

export const buttonDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: ButtonDefaultDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/default.tsx",
  },
  {
    name: "variants",
    title: "Variants",
    component: ButtonVariantsDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/variants.tsx",
  },
  {
    name: "sizes",
    title: "Sizes",
    component: ButtonSizesDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/sizes.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "ripple-effect",
    title: "Ripple effect",
    component: ButtonRippleEffectDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/ripple-effect.tsx",
    registryDependencies: ["ripple-button"],
    dependencies: ["motion@^12.38.0"],
  },
  {
    name: "responsive-add",
    title: "Responsive add",
    component: ButtonResponsiveAddDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/responsive-add.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "destructive-icon",
    title: "Destructive with icon",
    component: ButtonDestructiveIconDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/destructive-icon.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "cancel-save",
    title: "Cancel and save",
    component: ButtonCancelSaveDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/cancel-save.tsx",
  },
  {
    name: "messages-count",
    title: "Messages count",
    component: ButtonMessagesCountDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/messages-count.tsx",
  },
  {
    name: "keyboard-shortcut",
    title: "Keyboard shortcut",
    component: ButtonKeyboardShortcutDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/keyboard-shortcut.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "loading-disabled",
    title: "Loading disabled",
    component: ButtonLoadingDisabledDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/loading-disabled.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "loading-state",
    title: "Loading state",
    component: ButtonLoadingStateDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/loading-state.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "profile-pill",
    title: "Profile pill",
    component: ButtonProfilePillDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/profile-pill.tsx",
  },
  {
    name: "round-icon",
    title: "Round icon",
    component: ButtonRoundIconDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/round-icon.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "notification-badge",
    title: "Notification badge",
    component: ButtonNotificationBadgeDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/notification-badge.tsx",
    registryDependencies: ["badge"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "copy-feedback",
    title: "Copy feedback",
    component: ButtonCopyFeedbackDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/copy-feedback.tsx",
    registryDependencies: ["tooltip"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "vertical-group",
    title: "Vertical button group",
    component: ButtonVerticalGroupDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/vertical-group.tsx",
    registryDependencies: ["button-group"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "tap-animation",
    title: "Tap animation",
    component: ButtonTapAnimationDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/tap-animation.tsx",
    dependencies: ["motion@^12.38.0"],
  },
  {
    name: "split-dropdown",
    title: "Split dropdown",
    component: ButtonSplitDropdownDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/split-dropdown.tsx",
    registryDependencies: ["button-group", "dropdown-menu"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "permissions",
    title: "Permission actions",
    component: ButtonPermissionsDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/permissions.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "merge-options",
    title: "Merge options",
    component: ButtonMergeOptionsDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/merge-options.tsx",
    registryDependencies: ["dropdown-menu"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "previous-group",
    title: "Previous button group",
    component: ButtonPreviousGroupDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/previous-group.tsx",
    registryDependencies: ["button-group"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "next-group",
    title: "Next button group",
    component: ButtonNextGroupDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/next-group.tsx",
    registryDependencies: ["button-group"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "star-count",
    title: "Star count",
    component: ButtonStarCountDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/star-count.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "like-count",
    title: "Like count",
    component: ButtonLikeCountDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/like-count.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "social-icon-buttons",
    title: "Social icon buttons",
    component: ButtonSocialIconButtonsDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/social-icon-buttons.tsx",
  },
  {
    name: "social-outline-buttons",
    title: "Social outline buttons",
    component: ButtonSocialOutlineButtonsDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/social-outline-buttons.tsx",
  },
  {
    name: "social-filled-buttons",
    title: "Social filled buttons",
    component: ButtonSocialFilledButtonsDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/social-filled-buttons.tsx",
  },
  {
    name: "tooltip-icon",
    title: "Tooltip icon button",
    component: ButtonTooltipIconDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/tooltip-icon.tsx",
    registryDependencies: ["tooltip"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "ghost-arrow",
    title: "Ghost arrow",
    component: ButtonGhostArrowDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/ghost-arrow.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "animated-link",
    title: "Animated link",
    component: ButtonAnimatedLinkDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/animated-link.tsx",
  },
  {
    name: "heartbeat",
    title: "Heartbeat effect",
    component: ButtonHeartbeatDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/heartbeat.tsx",
    dependencies: ["motion@^12.38.0"],
  },
  {
    name: "craft-button",
    title: "Craft button",
    component: ButtonCraftButtonDemo,
    componentSlug: "button",
    sourcePath: "src/demos/button/craft-button.tsx",
    registryDependencies: ["craft-button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
