import type { DemoEntry } from "@/demos/types"

import StepperBasicDemo from "./basic"
import StepperSuccessStatesDemo from "./success-states"
import StepperLoadingDotDemo from "./loading-dot"
import StepperControlledNavigationDemo from "./controlled-navigation"
import StepperTitlesBelowDemo from "./titles-below"
import StepperProgressLabelsDemo from "./progress-labels"
import StepperStatusBadgesDemo from "./status-badges"
import StepperDescriptionsDemo from "./descriptions"
import StepperInlineTitlesDemo from "./inline-titles"
import StepperInlineDescriptionsDemo from "./inline-descriptions"
import StepperProgressBarsDemo from "./progress-bars"
import StepperCompactProgressNavigationDemo from "./compact-progress-navigation"
import StepperVerticalDescriptionsDemo from "./vertical-descriptions"
import StepperVerticalLoadingDemo from "./vertical-loading"
import StepperVerticalTitlesDemo from "./vertical-titles"

export const stepperDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic stepper",
    component: StepperBasicDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/basic.tsx",
  },
  {
    name: "success-states",
    title: "Success states",
    component: StepperSuccessStatesDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/success-states.tsx",
  },
  {
    name: "loading-dot",
    title: "Loading indicator",
    component: StepperLoadingDotDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/loading-dot.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "controlled-navigation",
    title: "Controlled navigation",
    component: StepperControlledNavigationDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/controlled-navigation.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "titles-below",
    title: "Titles below indicators",
    component: StepperTitlesBelowDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/titles-below.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "progress-labels",
    title: "Progress labels",
    component: StepperProgressLabelsDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/progress-labels.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "status-badges",
    title: "Status badges",
    component: StepperStatusBadgesDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/status-badges.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "button"],
  },
  {
    name: "descriptions",
    title: "Titles and descriptions",
    component: StepperDescriptionsDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/descriptions.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "inline-titles",
    title: "Inline titles",
    component: StepperInlineTitlesDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/inline-titles.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "inline-descriptions",
    title: "Inline descriptions",
    component: StepperInlineDescriptionsDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/inline-descriptions.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "progress-bars",
    title: "Progress bars",
    component: StepperProgressBarsDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/progress-bars.tsx",
  },
  {
    name: "compact-progress-navigation",
    title: "Compact progress navigation",
    component: StepperCompactProgressNavigationDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/compact-progress-navigation.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button", "utils"],
  },
  {
    name: "vertical-descriptions",
    title: "Vertical descriptions",
    component: StepperVerticalDescriptionsDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/vertical-descriptions.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "vertical-loading",
    title: "Vertical loading state",
    component: StepperVerticalLoadingDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/vertical-loading.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "vertical-titles",
    title: "Vertical titles",
    component: StepperVerticalTitlesDemo,
    componentSlug: "stepper",
    sourcePath: "src/demos/stepper/vertical-titles.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
]
