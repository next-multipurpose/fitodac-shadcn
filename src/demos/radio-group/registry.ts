import type { DemoEntry } from "@/demos/types"

import RadioGroupBasicDemo from "./basic"
import RadioGroupColorSwatchesDemo from "./color-swatches"
import RadioGroupComputeResourcesDemo from "./compute-resources"
import RadioGroupCustomThemeDemo from "./custom-theme"
import RadioGroupDataCenterRegionDemo from "./data-center-region"
import RadioGroupExpandableDeliveryDemo from "./expandable-delivery"
import RadioGroupHorizontalDemo from "./horizontal"
import RadioGroupPaymentCardsDemo from "./payment-cards"
import RadioGroupPaymentDescriptionsDemo from "./payment-descriptions"
import RadioGroupPlanCardsDemo from "./plan-cards"
import RadioGroupPricingCardsDemo from "./pricing-cards"
import RadioGroupRatingFilterDemo from "./rating-filter"
import RadioGroupStarRatingDemo from "./star-rating"
import RadioGroupSubscriptionListDemo from "./subscription-list"
import RadioGroupVerticalPlanCardsDemo from "./vertical-plan-cards"

export const radioGroupDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic radio group",
    component: RadioGroupBasicDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/basic.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "horizontal",
    title: "Horizontal radio group",
    component: RadioGroupHorizontalDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/horizontal.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "custom-theme",
    title: "Custom theme",
    component: RadioGroupCustomThemeDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/custom-theme.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "payment-descriptions",
    title: "Payment methods with descriptions",
    component: RadioGroupPaymentDescriptionsDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/payment-descriptions.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "expandable-delivery",
    title: "Expandable delivery options",
    component: RadioGroupExpandableDeliveryDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/expandable-delivery.tsx",
    registryDependencies: ["input", "label"],
  },
  {
    name: "rating-filter",
    title: "Rating filter",
    component: RadioGroupRatingFilterDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/rating-filter.tsx",
    dependencies: ["@remixicon/react"],
    registryDependencies: ["label"],
  },
  {
    name: "color-swatches",
    title: "Color swatches",
    component: RadioGroupColorSwatchesDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/color-swatches.tsx",
  },
  {
    name: "plan-cards",
    title: "Plan cards",
    component: RadioGroupPlanCardsDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/plan-cards.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "payment-cards",
    title: "Payment method cards",
    component: RadioGroupPaymentCardsDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/payment-cards.tsx",
    dependencies: ["@remixicon/react"],
  },
  {
    name: "compute-resources",
    title: "Compute resources",
    component: RadioGroupComputeResourcesDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/compute-resources.tsx",
  },
  {
    name: "data-center-region",
    title: "Data center region",
    component: RadioGroupDataCenterRegionDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/data-center-region.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "subscription-list",
    title: "Subscription list",
    component: RadioGroupSubscriptionListDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/subscription-list.tsx",
    registryDependencies: ["badge", "label"],
  },
  {
    name: "star-rating",
    title: "Interactive star rating",
    component: RadioGroupStarRatingDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/star-rating.tsx",
    dependencies: ["@remixicon/react"],
  },
  {
    name: "vertical-plan-cards",
    title: "Vertical plan cards",
    component: RadioGroupVerticalPlanCardsDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/vertical-plan-cards.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["label"],
  },
  {
    name: "pricing-cards",
    title: "Detailed pricing cards",
    component: RadioGroupPricingCardsDemo,
    componentSlug: "radio-group",
    sourcePath: "src/demos/radio-group/pricing-cards.tsx",
    registryDependencies: ["badge", "label"],
  },
]
