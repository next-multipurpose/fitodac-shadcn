import type { DemoEntry } from "@/demos/types"

import ProgressAnimatedDemo from "./animated"
import ProgressCustomColorDemo from "./custom-color"
import ProgressInlinePercentageDemo from "./inline-percentage"
import ProgressInteractiveUploadDemo from "./interactive-upload"
import ProgressLabeledDemo from "./labeled"
import ProgressProjectStatusDemo from "./project-status"
import ProgressStepsDemo from "./steps"
import ProgressSystemResourcesDemo from "./system-resources"
import ProgressThickDemo from "./thick"
import ProgressUsageStatusDemo from "./usage-status"

export const progressDemos: DemoEntry[] = [
  {
    name: "animated",
    title: "Animated progress",
    component: ProgressAnimatedDemo,
    componentSlug: "progress",
    sourcePath: "src/demos/progress/animated.tsx",
  },
  {
    name: "custom-color",
    title: "Custom color",
    component: ProgressCustomColorDemo,
    componentSlug: "progress",
    sourcePath: "src/demos/progress/custom-color.tsx",
  },
  {
    name: "labeled",
    title: "Labeled progress",
    component: ProgressLabeledDemo,
    componentSlug: "progress",
    sourcePath: "src/demos/progress/labeled.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "system-resources",
    title: "System resources",
    component: ProgressSystemResourcesDemo,
    componentSlug: "progress",
    sourcePath: "src/demos/progress/system-resources.tsx",
  },
  {
    name: "steps",
    title: "Setup steps",
    component: ProgressStepsDemo,
    componentSlug: "progress",
    sourcePath: "src/demos/progress/steps.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "project-status",
    title: "Project status",
    component: ProgressProjectStatusDemo,
    componentSlug: "progress",
    sourcePath: "src/demos/progress/project-status.tsx",
    registryDependencies: ["card"],
  },
  {
    name: "usage-status",
    title: "Usage status",
    component: ProgressUsageStatusDemo,
    componentSlug: "progress",
    sourcePath: "src/demos/progress/usage-status.tsx",
    registryDependencies: ["badge"],
  },
  {
    name: "thick",
    title: "Thick progress bar",
    component: ProgressThickDemo,
    componentSlug: "progress",
    sourcePath: "src/demos/progress/thick.tsx",
  },
  {
    name: "interactive-upload",
    title: "Interactive upload",
    component: ProgressInteractiveUploadDemo,
    componentSlug: "progress",
    sourcePath: "src/demos/progress/interactive-upload.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "inline-percentage",
    title: "Inline percentage",
    component: ProgressInlinePercentageDemo,
    componentSlug: "progress",
    sourcePath: "src/demos/progress/inline-percentage.tsx",
  },
]
