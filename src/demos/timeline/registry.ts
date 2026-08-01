import type { DemoEntry } from "@/demos/types"

import TimelineProjectMilestonesDemo from "./project-milestones"
import TimelineProductRoadmapDemo from "./product-roadmap"
import TimelineOrderTrackingDemo from "./order-tracking"
import TimelineGitActivityDemo from "./git-activity"
import TimelineAlternatingMilestonesDemo from "./alternating-milestones"
import TimelineDeploymentPipelineDemo from "./deployment-pipeline"
import TimelineColoredRoadmapDemo from "./colored-roadmap"
import TimelineHorizontalReleaseCycleDemo from "./horizontal-release-cycle"
import TimelineHorizontalProjectJourneyDemo from "./horizontal-project-journey"
import TimelineDeploymentHistoryDemo from "./deployment-history"
import TimelineActivityFeedDemo from "./activity-feed"
import TimelineReleaseVersionsDemo from "./release-versions"

export const timelineDemos: DemoEntry[] = [
  {
    name: "project-milestones",
    title: "Project milestones",
    component: TimelineProjectMilestonesDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/project-milestones.tsx",
  },
  {
    name: "product-roadmap",
    title: "Product roadmap",
    component: TimelineProductRoadmapDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/product-roadmap.tsx",
  },
  {
    name: "order-tracking",
    title: "Order tracking",
    component: TimelineOrderTrackingDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/order-tracking.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "git-activity",
    title: "Git activity",
    component: TimelineGitActivityDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/git-activity.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "alternating-milestones",
    title: "Alternating milestones",
    component: TimelineAlternatingMilestonesDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/alternating-milestones.tsx",
    registryDependencies: ["utils"],
  },
  {
    name: "deployment-pipeline",
    title: "Deployment pipeline",
    component: TimelineDeploymentPipelineDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/deployment-pipeline.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["avatar", "badge", "card", "collapsible", "spinner", "utils"],
  },
  {
    name: "colored-roadmap",
    title: "Colored roadmap",
    component: TimelineColoredRoadmapDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/colored-roadmap.tsx",
    registryDependencies: ["utils"],
  },
  {
    name: "horizontal-release-cycle",
    title: "Horizontal release cycle",
    component: TimelineHorizontalReleaseCycleDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/horizontal-release-cycle.tsx",
  },
  {
    name: "horizontal-project-journey",
    title: "Horizontal project journey",
    component: TimelineHorizontalProjectJourneyDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/horizontal-project-journey.tsx",
  },
  {
    name: "deployment-history",
    title: "Deployment history",
    component: TimelineDeploymentHistoryDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/deployment-history.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "utils"],
  },
  {
    name: "activity-feed",
    title: "Activity feed",
    component: TimelineActivityFeedDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/activity-feed.tsx",
    registryDependencies: ["avatar"],
  },
  {
    name: "release-versions",
    title: "Release versions",
    component: TimelineReleaseVersionsDemo,
    componentSlug: "timeline",
    sourcePath: "src/demos/timeline/release-versions.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "utils"],
  },
]
