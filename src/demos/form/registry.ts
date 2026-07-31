import type { DemoEntry } from "@/demos/types"

import FormAccountWorkspaceSettingsDemo from "./account-workspace-settings"
import FormAddressDemo from "./address"
import FormCheckoutDemo from "./checkout"
import FormComputeEnvironmentDemo from "./compute-environment"
import FormCredentialsDemo from "./credentials"
import FormDesktopPreferencesDemo from "./desktop-preferences"
import FormMultiFactorAuthenticationDemo from "./multi-factor-authentication"
import FormPriceRangeDemo from "./price-range"
import FormProfileSettingsDemo from "./profile-settings"
import FormSubscriptionPlanDemo from "./subscription-plan"

export const formDemos: DemoEntry[] = [
  {
    name: "profile-settings",
    title: "Profile settings",
    component: FormProfileSettingsDemo,
    componentSlug: "form",
    sourcePath: "src/demos/form/profile-settings.tsx",
    registryDependencies: [
      "avatar",
      "button",
      "checkbox",
      "input",
      "input-group",
      "label",
      "radio-group",
      "select",
      "textarea",
      "use-file-upload",
    ],
    dependencies: [
      "@hookform/resolvers@^5.2.2",
      "lucide-react@^0.577.0",
      "zod@^3.25.76",
    ],
  },
  {
    name: "account-workspace-settings",
    title: "Account and workspace settings",
    component: FormAccountWorkspaceSettingsDemo,
    componentSlug: "form",
    sourcePath: "src/demos/form/account-workspace-settings.tsx",
    registryDependencies: [
      "button",
      "checkbox",
      "input",
      "label",
      "radio-group",
      "select",
      "separator",
      "textarea",
    ],
  },
  {
    name: "checkout",
    title: "Checkout",
    component: FormCheckoutDemo,
    componentSlug: "form",
    sourcePath: "src/demos/form/checkout.tsx",
    registryDependencies: [
      "button",
      "checkbox",
      "field",
      "input",
      "select",
      "textarea",
    ],
  },
  {
    name: "credentials",
    title: "Credentials",
    component: FormCredentialsDemo,
    componentSlug: "form",
    sourcePath: "src/demos/form/credentials.tsx",
    registryDependencies: ["field", "input"],
  },
  {
    name: "price-range",
    title: "Price range",
    component: FormPriceRangeDemo,
    componentSlug: "form",
    sourcePath: "src/demos/form/price-range.tsx",
    registryDependencies: ["field", "slider"],
  },
  {
    name: "address",
    title: "Address",
    component: FormAddressDemo,
    componentSlug: "form",
    sourcePath: "src/demos/form/address.tsx",
    registryDependencies: ["field", "input"],
  },
  {
    name: "desktop-preferences",
    title: "Desktop preferences",
    component: FormDesktopPreferencesDemo,
    componentSlug: "form",
    sourcePath: "src/demos/form/desktop-preferences.tsx",
    registryDependencies: ["checkbox", "field"],
  },
  {
    name: "subscription-plan",
    title: "Subscription plan",
    component: FormSubscriptionPlanDemo,
    componentSlug: "form",
    sourcePath: "src/demos/form/subscription-plan.tsx",
    registryDependencies: ["field", "radio-group"],
  },
  {
    name: "multi-factor-authentication",
    title: "Multi-factor authentication",
    component: FormMultiFactorAuthenticationDemo,
    componentSlug: "form",
    sourcePath: "src/demos/form/multi-factor-authentication.tsx",
    registryDependencies: ["field", "switch"],
  },
  {
    name: "compute-environment",
    title: "Compute environment",
    component: FormComputeEnvironmentDemo,
    componentSlug: "form",
    sourcePath: "src/demos/form/compute-environment.tsx",
    registryDependencies: ["field", "radio-group"],
  },
]
