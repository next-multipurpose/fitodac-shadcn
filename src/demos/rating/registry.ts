import type { DemoEntry } from "@/demos/types"

import RatingBasicDemo from "./basic"
import RatingDecimalDemo from "./decimal"
import RatingEditableDemo from "./editable"
import RatingEmojiFeedbackDemo from "./emoji-feedback"
import RatingReviewDistributionDemo from "./review-distribution"
import RatingReviewFormDemo from "./review-form"
import RatingShowValueDemo from "./show-value"
import RatingSizesDemo from "./sizes"
import RatingToastFeedbackDemo from "./toast-feedback"

export const ratingDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic rating",
    component: RatingBasicDemo,
    componentSlug: "rating",
    sourcePath: "src/demos/rating/basic.tsx",
  },
  {
    name: "decimal",
    title: "Decimal rating",
    component: RatingDecimalDemo,
    componentSlug: "rating",
    sourcePath: "src/demos/rating/decimal.tsx",
  },
  {
    name: "show-value",
    title: "Rating with value",
    component: RatingShowValueDemo,
    componentSlug: "rating",
    sourcePath: "src/demos/rating/show-value.tsx",
  },
  {
    name: "toast-feedback",
    title: "Editable rating with toast",
    component: RatingToastFeedbackDemo,
    componentSlug: "rating",
    sourcePath: "src/demos/rating/toast-feedback.tsx",
    dependencies: ["sonner"],
  },
  {
    name: "sizes",
    title: "Rating sizes",
    component: RatingSizesDemo,
    componentSlug: "rating",
    sourcePath: "src/demos/rating/sizes.tsx",
  },
  {
    name: "review-distribution",
    title: "Review distribution",
    component: RatingReviewDistributionDemo,
    componentSlug: "rating",
    sourcePath: "src/demos/rating/review-distribution.tsx",
    registryDependencies: ["progress", "separator"],
  },
  {
    name: "editable",
    title: "Editable rating",
    component: RatingEditableDemo,
    componentSlug: "rating",
    sourcePath: "src/demos/rating/editable.tsx",
  },
  {
    name: "emoji-feedback",
    title: "Emoji feedback",
    component: RatingEmojiFeedbackDemo,
    componentSlug: "rating",
    sourcePath: "src/demos/rating/emoji-feedback.tsx",
    registryDependencies: ["utils"],
  },
  {
    name: "review-form",
    title: "Review form",
    component: RatingReviewFormDemo,
    componentSlug: "rating",
    sourcePath: "src/demos/rating/review-form.tsx",
    registryDependencies: ["button", "card", "label", "textarea"],
  },
]
