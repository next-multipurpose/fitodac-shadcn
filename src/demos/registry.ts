import type { ComponentType } from "react"

import AccordionDefaultDemo from "@/demos/accordion/default"
import AccordionPlusToggleDemo from "@/demos/accordion/plus-toggle"
import AccordionLeftChevronDemo from "@/demos/accordion/left-chevron"
import AccordionLeftPlusToggleDemo from "@/demos/accordion/left-plus-toggle"
import AccordionLeadingIconsDemo from "@/demos/accordion/leading-icons"
import AccordionSubtitlesDemo from "@/demos/accordion/subtitles"
import AccordionIconSubtitlesDemo from "@/demos/accordion/icon-subtitles"
import AccordionBorderedCardsDemo from "@/demos/accordion/bordered-cards"
import AccordionBorderedLeftChevronDemo from "@/demos/accordion/bordered-left-chevron"
import AccordionConnectedCardsDemo from "@/demos/accordion/connected-cards"
import AccordionNestedCollapsiblesDemo from "@/demos/accordion/nested-collapsibles"
import AccordionHighlightedOpenDemo from "@/demos/accordion/highlighted-open"
import { AlertDefaultDemo } from "@/demos/alert/default"
import { AlertDestructiveDemo } from "@/demos/alert/destructive"
import AlertDescriptionOnlyDemo from "@/demos/alert/description-only"
import AlertInfoIconDemo from "@/demos/alert/info-icon"
import AlertSuccessWithDescriptionDemo from "@/demos/alert/success-with-description"
import AlertDestructiveIconTitleDemo from "@/demos/alert/destructive-icon-title"
import AlertSuccessColoredDemo from "@/demos/alert/success-colored"
import AlertWarningColoredDemo from "@/demos/alert/warning-colored"
import AlertDestructiveForegroundTitleDemo from "@/demos/alert/destructive-foreground-title"
import AlertSuccessIconColorDemo from "@/demos/alert/success-icon-color"
import AlertWarningIconColorDemo from "@/demos/alert/warning-icon-color"
import AlertPasswordRequirementsDestructiveDemo from "@/demos/alert/password-requirements-destructive"
import AlertPasswordRequirementsIconDemo from "@/demos/alert/password-requirements-icon"
import AlertPasswordRequirementsPartialSuccessDemo from "@/demos/alert/password-requirements-partial-success"
import AlertUndoActionDemo from "@/demos/alert/undo-action"
import AlertFriendRequestActionsDemo from "@/demos/alert/friend-request-actions"
import AlertDismissActionDemo from "@/demos/alert/dismiss-action"
import { BadgeDefaultDemo } from "@/demos/badge/default"
import { BadgeRadiusDemo } from "@/demos/badge/radius"
import { BadgeSizesDemo } from "@/demos/badge/sizes"
import { BadgeVariantsDemo } from "@/demos/badge/variants"
import { ButtonDefaultDemo } from "@/demos/button/default"
import { ButtonSizesDemo } from "@/demos/button/sizes"
import { ButtonVariantsDemo } from "@/demos/button/variants"
import ButtonRippleEffectDemo from "@/demos/button/ripple-effect"
import ButtonResponsiveAddDemo from "@/demos/button/responsive-add"
import ButtonDestructiveIconDemo from "@/demos/button/destructive-icon"
import ButtonCancelSaveDemo from "@/demos/button/cancel-save"
import ButtonMessagesCountDemo from "@/demos/button/messages-count"
import ButtonKeyboardShortcutDemo from "@/demos/button/keyboard-shortcut"
import ButtonLoadingDisabledDemo from "@/demos/button/loading-disabled"
import ButtonLoadingStateDemo from "@/demos/button/loading-state"
import ButtonProfilePillDemo from "@/demos/button/profile-pill"
import ButtonRoundIconDemo from "@/demos/button/round-icon"
import ButtonNotificationBadgeDemo from "@/demos/button/notification-badge"
import ButtonCopyFeedbackDemo from "@/demos/button/copy-feedback"
import ButtonVerticalGroupDemo from "@/demos/button/vertical-group"
import ButtonTapAnimationDemo from "@/demos/button/tap-animation"
import ButtonSplitDropdownDemo from "@/demos/button/split-dropdown"
import ButtonPermissionsDemo from "@/demos/button/permissions"
import ButtonMergeOptionsDemo from "@/demos/button/merge-options"
import ButtonPreviousGroupDemo from "@/demos/button/previous-group"
import ButtonNextGroupDemo from "@/demos/button/next-group"
import ButtonStarCountDemo from "@/demos/button/star-count"
import ButtonLikeCountDemo from "@/demos/button/like-count"
import ButtonSocialIconButtonsDemo from "@/demos/button/social-icon-buttons"
import ButtonSocialOutlineButtonsDemo from "@/demos/button/social-outline-buttons"
import ButtonSocialFilledButtonsDemo from "@/demos/button/social-filled-buttons"
import ButtonTooltipIconDemo from "@/demos/button/tooltip-icon"
import ButtonGhostArrowDemo from "@/demos/button/ghost-arrow"
import ButtonAnimatedLinkDemo from "@/demos/button/animated-link"
import ButtonHeartbeatDemo from "@/demos/button/heartbeat"
import ButtonCraftButtonDemo from "@/demos/button/craft-button"

import AlertDialogConfirmDemo from "@/demos/alert-dialog/confirm"
import AlertDialogConfirmIconDemo from "@/demos/alert-dialog/confirm-icon"
import AlertDialogFullscreenProductDemo from "@/demos/alert-dialog/fullscreen-product"
import AlertDialogScrollableCustomDemo from "@/demos/alert-dialog/scrollable-custom"
import AlertDialogStickyHeaderDemo from "@/demos/alert-dialog/sticky-header"
import AlertDialogStickyFooterDemo from "@/demos/alert-dialog/sticky-footer"
import AlertDialogTermsConditionsDemo from "@/demos/alert-dialog/terms-conditions"
import AlertDialogNewsletterDemo from "@/demos/alert-dialog/newsletter"
import AlertDialogFeedbackDemo from "@/demos/alert-dialog/feedback"
import AlertDialogOtpVerificationDemo from "@/demos/alert-dialog/otp-verification"
import AlertDialogSignInDemo from "@/demos/alert-dialog/sign-in"
import AlertDialogCheckoutDemo from "@/demos/alert-dialog/checkout"
import AlertDialogChangePlanDemo from "@/demos/alert-dialog/change-plan"
import AlertDialogEditProfileDemo from "@/demos/alert-dialog/edit-profile"
import AlertDialogOnboardingDemo from "@/demos/alert-dialog/onboarding"
import AlertDialogDestructiveConfirmationDemo from "@/demos/alert-dialog/destructive-confirmation"
import AlertDialogRatingFeedbackDemo from "@/demos/alert-dialog/rating-feedback"
import AlertDialogInviteFriendsDemo from "@/demos/alert-dialog/invite-friends"

import AutocompleteBasicDemo from "@/demos/autocomplete/basic"
import AutocompleteControlledClearDemo from "@/demos/autocomplete/controlled-clear"
import AutocompleteGroupedUsersDemo from "@/demos/autocomplete/grouped-users"
import AutocompleteAsyncSearchDemo from "@/demos/autocomplete/async-search"
import AutocompleteAutoHighlightDemo from "@/demos/autocomplete/auto-highlight"

export type DemoEntry = {
  name: string
  title: string
  component: ComponentType
  componentSlug: string
  sourcePath: string
  dependencies?: string[]
  registryDependencies?: string[]
}

const demoRegistry: Record<string, DemoEntry[]> = {
  autocomplete: [
    {
      name: "basic",
      title: "Basic",
      component: AutocompleteBasicDemo,
      componentSlug: "autocomplete",
      sourcePath: "src/demos/autocomplete/basic.tsx",
    },
    {
      name: "controlled-clear",
      title: "Controlled with clear",
      component: AutocompleteControlledClearDemo,
      componentSlug: "autocomplete",
      sourcePath: "src/demos/autocomplete/controlled-clear.tsx",
    },
    {
      name: "grouped-users",
      title: "Grouped users",
      component: AutocompleteGroupedUsersDemo,
      componentSlug: "autocomplete",
      sourcePath: "src/demos/autocomplete/grouped-users.tsx",
      registryDependencies: ["avatar"],
    },
    {
      name: "async-search",
      title: "Async search",
      component: AutocompleteAsyncSearchDemo,
      componentSlug: "autocomplete",
      sourcePath: "src/demos/autocomplete/async-search.tsx",
      registryDependencies: ["avatar"],
    },
    {
      name: "auto-highlight",
      title: "Auto highlight",
      component: AutocompleteAutoHighlightDemo,
      componentSlug: "autocomplete",
      sourcePath: "src/demos/autocomplete/auto-highlight.tsx",
    },
  ],
  "alert-dialog": [
    {
      name: "confirm",
      title: "Confirm action",
      component: AlertDialogConfirmDemo,
      componentSlug: "alert-dialog",
      sourcePath: "src/demos/alert-dialog/confirm.tsx",
    },
    {
      name: "confirm-icon",
      title: "Confirm with icon",
      component: AlertDialogConfirmIconDemo,
      componentSlug: "alert-dialog",
      sourcePath: "src/demos/alert-dialog/confirm-icon.tsx",
      dependencies: ["lucide-react@^0.577.0"],
    },
    {
      name: "fullscreen-product",
      title: "Fullscreen product dialog",
      component: AlertDialogFullscreenProductDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/fullscreen-product.tsx",
      registryDependencies: ["button", "scroll-area"],
    },
    {
      name: "scrollable-custom",
      title: "Scrollable custom scrollbar",
      component: AlertDialogScrollableCustomDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/scrollable-custom.tsx",
      registryDependencies: ["button", "scroll-area"],
    },
    {
      name: "sticky-header",
      title: "Scrollable sticky header",
      component: AlertDialogStickyHeaderDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/sticky-header.tsx",
      registryDependencies: ["button"],
    },
    {
      name: "sticky-footer",
      title: "Scrollable sticky footer",
      component: AlertDialogStickyFooterDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/sticky-footer.tsx",
      registryDependencies: ["button"],
    },
    {
      name: "terms-conditions",
      title: "Terms and conditions",
      component: AlertDialogTermsConditionsDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/terms-conditions.tsx",
      registryDependencies: ["button"],
    },
    {
      name: "newsletter",
      title: "Newsletter signup",
      component: AlertDialogNewsletterDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/newsletter.tsx",
      registryDependencies: ["button", "input"],
    },
    {
      name: "feedback",
      title: "Feedback form",
      component: AlertDialogFeedbackDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/feedback.tsx",
      registryDependencies: ["button", "textarea"],
    },
    {
      name: "otp-verification",
      title: "OTP verification",
      component: AlertDialogOtpVerificationDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/otp-verification.tsx",
      registryDependencies: ["button"],
      dependencies: ["input-otp@^1.4.2"],
    },
    {
      name: "sign-in",
      title: "Sign in",
      component: AlertDialogSignInDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/sign-in.tsx",
      registryDependencies: ["button", "checkbox", "input", "label"],
    },
    {
      name: "checkout",
      title: "Checkout",
      component: AlertDialogCheckoutDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/checkout.tsx",
      registryDependencies: ["badge", "button", "input", "label", "radio-group"],
    },
    {
      name: "change-plan",
      title: "Change plan",
      component: AlertDialogChangePlanDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/change-plan.tsx",
      registryDependencies: ["button", "label", "radio-group"],
    },
    {
      name: "edit-profile",
      title: "Edit profile",
      component: AlertDialogEditProfileDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/edit-profile.tsx",
      registryDependencies: ["button", "input", "label", "textarea", "use-character-limit", "use-file-upload"],
    },
    {
      name: "onboarding",
      title: "Onboarding",
      component: AlertDialogOnboardingDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/onboarding.tsx",
      registryDependencies: ["button"],
    },
    {
      name: "destructive-confirmation",
      title: "Destructive confirmation",
      component: AlertDialogDestructiveConfirmationDemo,
      componentSlug: "alert-dialog",
      sourcePath: "src/demos/alert-dialog/destructive-confirmation.tsx",
      registryDependencies: ["checkbox", "label"],
    },
    {
      name: "rating-feedback",
      title: "Rating feedback",
      component: AlertDialogRatingFeedbackDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/rating-feedback.tsx",
      registryDependencies: ["button", "checkbox", "label", "radio-group", "textarea"],
    },
    {
      name: "invite-friends",
      title: "Invite friends",
      component: AlertDialogInviteFriendsDemo,
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/invite-friends.tsx",
      registryDependencies: ["avatar", "button", "input", "label"],
    },
  ],
  accordion: [
    {
      name: "default",
      title: "Default",
      component: AccordionDefaultDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/default.tsx",
    },
    {
      name: "plus-toggle",
      title: "Plus toggle",
      component: AccordionPlusToggleDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/plus-toggle.tsx",
    },
    {
      name: "left-chevron",
      title: "Left chevron",
      component: AccordionLeftChevronDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/left-chevron.tsx",
    },
    {
      name: "left-plus-toggle",
      title: "Left plus toggle",
      component: AccordionLeftPlusToggleDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/left-plus-toggle.tsx",
    },
    {
      name: "leading-icons",
      title: "Leading icons",
      component: AccordionLeadingIconsDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/leading-icons.tsx",
    },
    {
      name: "subtitles",
      title: "Subtitles",
      component: AccordionSubtitlesDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/subtitles.tsx",
    },
    {
      name: "icon-subtitles",
      title: "Icons and subtitles",
      component: AccordionIconSubtitlesDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/icon-subtitles.tsx",
    },
    {
      name: "bordered-cards",
      title: "Bordered cards",
      component: AccordionBorderedCardsDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/bordered-cards.tsx",
    },
    {
      name: "bordered-left-chevron",
      title: "Bordered with left chevron",
      component: AccordionBorderedLeftChevronDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/bordered-left-chevron.tsx",
    },
    {
      name: "connected-cards",
      title: "Connected cards",
      component: AccordionConnectedCardsDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/connected-cards.tsx",
    },
    {
      name: "nested-collapsibles",
      title: "Nested collapsibles",
      component: AccordionNestedCollapsiblesDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/nested-collapsibles.tsx",
      registryDependencies: ["collapsible"],
    },
    {
      name: "highlighted-open",
      title: "Highlighted open item",
      component: AccordionHighlightedOpenDemo,
      componentSlug: "accordion",
      sourcePath: "src/demos/accordion/highlighted-open.tsx",
    },
  ],
  alert: [
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
  ],
  badge: [
    {
      name: "default",
      title: "Default",
      component: BadgeDefaultDemo,
      componentSlug: "badge",
      sourcePath: "src/demos/badge/default.tsx",
    },
    {
      name: "variants",
      title: "Variants",
      component: BadgeVariantsDemo,
      componentSlug: "badge",
      sourcePath: "src/demos/badge/variants.tsx",
    },
    {
      name: "sizes",
      title: "Sizes",
      component: BadgeSizesDemo,
      componentSlug: "badge",
      sourcePath: "src/demos/badge/sizes.tsx",
    },
    {
      name: "radius",
      title: "Radius",
      component: BadgeRadiusDemo,
      componentSlug: "badge",
      sourcePath: "src/demos/badge/radius.tsx",
    },
  ],
  button: [
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
  ],
}

export function getDemosForComponent(slug: string) {
  return demoRegistry[slug] ?? []
}
