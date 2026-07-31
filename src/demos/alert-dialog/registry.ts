import type { DemoEntry } from "@/demos/types"

import AlertDialogConfirmDemo from "./confirm"
import AlertDialogConfirmIconDemo from "./confirm-icon"
import AlertDialogFullscreenProductDemo from "./fullscreen-product"
import AlertDialogScrollableCustomDemo from "./scrollable-custom"
import AlertDialogStickyHeaderDemo from "./sticky-header"
import AlertDialogStickyFooterDemo from "./sticky-footer"
import AlertDialogTermsConditionsDemo from "./terms-conditions"
import AlertDialogNewsletterDemo from "./newsletter"
import AlertDialogFeedbackDemo from "./feedback"
import AlertDialogOtpVerificationDemo from "./otp-verification"
import AlertDialogSignInDemo from "./sign-in"
import AlertDialogCheckoutDemo from "./checkout"
import AlertDialogChangePlanDemo from "./change-plan"
import AlertDialogEditProfileDemo from "./edit-profile"
import AlertDialogOnboardingDemo from "./onboarding"
import AlertDialogDestructiveConfirmationDemo from "./destructive-confirmation"
import AlertDialogRatingFeedbackDemo from "./rating-feedback"
import AlertDialogInviteFriendsDemo from "./invite-friends"

export const alertDialogDemos: DemoEntry[] = [
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
    registryDependencies: [
      "button",
      "input",
      "label",
      "textarea",
      "use-character-limit",
      "use-file-upload",
    ],
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
    registryDependencies: [
      "button",
      "checkbox",
      "label",
      "radio-group",
      "textarea",
    ],
  },
  {
    name: "invite-friends",
    title: "Invite friends",
    component: AlertDialogInviteFriendsDemo,
    componentSlug: "dialog",
    sourcePath: "src/demos/alert-dialog/invite-friends.tsx",
    registryDependencies: ["avatar", "button", "input", "label"],
  },
]
