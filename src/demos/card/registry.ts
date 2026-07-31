import type { DemoEntry } from "@/demos/types"

import CardUpgradeProDemo from "./upgrade-pro"
import CardLoginFormDemo from "./login-form"
import CardBlogPreviewDemo from "./blog-preview"
import CardHelpDemo from "./help-card"
import CardTabsDemo from "./tabs"
import CardMeetingNotesDemo from "./meeting-notes"
import CardCookieSettingsDemo from "./cookie-settings"
import CardTeamMembersEmptyDemo from "./team-members-empty"
import CardTestimonialDemo from "./testimonial"
import CardImageBottomDemo from "./image-bottom"
import CardImageTopDemo from "./image-top"
import CardHorizontalImageDemo from "./horizontal-image"
import CardSocialPostDemo from "./social-post"
import CardProductDemo from "./product"
import CardHoverImageDemo from "./hover-image"
import CardTrendingCtaDemo from "./trending-cta"
import CardAuthorProfileDemo from "./author-profile"
import CardBillingUsageDemo from "./billing-usage"
import CardDeploymentStatusDemo from "./deployment-status"
import CardRevenueStatDemo from "./revenue-stat"
import CardFeatureLinkDemo from "./feature-link"

export const cardDemos: DemoEntry[] = [
  {
    name: "upgrade-pro",
    title: "Upgrade to Pro",
    component: CardUpgradeProDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/upgrade-pro.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "login-form",
    title: "Login form",
    component: CardLoginFormDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/login-form.tsx",
    registryDependencies: ["button", "input", "label"],
  },
  {
    name: "blog-preview",
    title: "Blog preview",
    component: CardBlogPreviewDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/blog-preview.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "help-card",
    title: "Help card",
    component: CardHelpDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/help-card.tsx",
    registryDependencies: ["avatar", "button", "dropdown-menu"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "tabs",
    title: "Tabbed card",
    component: CardTabsDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/tabs.tsx",
    registryDependencies: ["tabs"],
  },
  {
    name: "meeting-notes",
    title: "Meeting notes",
    component: CardMeetingNotesDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/meeting-notes.tsx",
    registryDependencies: ["avatar"],
  },
  {
    name: "cookie-settings",
    title: "Cookie settings",
    component: CardCookieSettingsDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/cookie-settings.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "team-members-empty",
    title: "Team members empty state",
    component: CardTeamMembersEmptyDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/team-members-empty.tsx",
    registryDependencies: ["button", "empty", "input-group"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "testimonial",
    title: "Testimonial",
    component: CardTestimonialDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/testimonial.tsx",
    registryDependencies: ["avatar"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "image-bottom",
    title: "Image bottom",
    component: CardImageBottomDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/image-bottom.tsx",
  },
  {
    name: "image-top",
    title: "Image top",
    component: CardImageTopDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/image-top.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "horizontal-image",
    title: "Horizontal image",
    component: CardHorizontalImageDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/horizontal-image.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "social-post",
    title: "Social post",
    component: CardSocialPostDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/social-post.tsx",
    registryDependencies: ["avatar", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "product",
    title: "Product card",
    component: CardProductDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/product.tsx",
    registryDependencies: ["badge", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "hover-image",
    title: "Hover image",
    component: CardHoverImageDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/hover-image.tsx",
  },
  {
    name: "trending-cta",
    title: "Trending CTA",
    component: CardTrendingCtaDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/trending-cta.tsx",
    registryDependencies: ["badge", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "author-profile",
    title: "Author profile",
    component: CardAuthorProfileDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/author-profile.tsx",
    registryDependencies: ["avatar", "badge"],
  },
  {
    name: "billing-usage",
    title: "Billing usage",
    component: CardBillingUsageDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/billing-usage.tsx",
    registryDependencies: ["button", "progress"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "deployment-status",
    title: "Deployment status",
    component: CardDeploymentStatusDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/deployment-status.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "revenue-stat",
    title: "Revenue stat",
    component: CardRevenueStatDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/revenue-stat.tsx",
    registryDependencies: ["badge", "button", "dropdown-menu", "separator"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "feature-link",
    title: "Feature link",
    component: CardFeatureLinkDemo,
    componentSlug: "card",
    sourcePath: "src/demos/card/feature-link.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
]
