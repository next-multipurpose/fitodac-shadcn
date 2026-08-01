import type { DemoEntry } from "@/demos/types"

import StatsFinancialSummaryDemo from "./financial-summary"
import StatsPeriodComparisonDemo from "./period-comparison"
import StatsAnalyticsOverviewDemo from "./analytics-overview"
import StatsTrendBadgesDemo from "./trend-badges"
import StatsLinkedMetricsDemo from "./linked-metrics"
import StatsRegionalGoalsDemo from "./regional-goals"
import StatsPlanOverviewDemo from "./plan-overview"
import StatsBudgetUtilizationDemo from "./budget-utilization"
import StatsQuotaProgressDemo from "./quota-progress"
import StatsMarketTrendsDemo from "./market-trends"
import StatsEditableLimitsDemo from "./editable-limits"
import StatsUsageBreakdownDemo from "./usage-breakdown"
import StatsStorageBreakdownDemo from "./storage-breakdown"
import StatsMonthlyCostsDemo from "./monthly-costs"
import StatsInvestmentGrowthDemo from "./investment-growth"

export const statsDemos: DemoEntry[] = [
  {
    name: "financial-summary",
    title: "Financial summary",
    component: StatsFinancialSummaryDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/financial-summary.tsx",
    registryDependencies: ["card", "utils"],
  },
  {
    name: "period-comparison",
    title: "Period comparison",
    component: StatsPeriodComparisonDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/period-comparison.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "card", "utils"],
  },
  {
    name: "analytics-overview",
    title: "Analytics overview",
    component: StatsAnalyticsOverviewDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/analytics-overview.tsx",
    registryDependencies: ["card", "utils"],
  },
  {
    name: "trend-badges",
    title: "Trend badges",
    component: StatsTrendBadgesDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/trend-badges.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["badge", "card", "utils"],
  },
  {
    name: "linked-metrics",
    title: "Linked metrics",
    component: StatsLinkedMetricsDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/linked-metrics.tsx",
    registryDependencies: ["card", "utils"],
  },
  {
    name: "regional-goals",
    title: "Regional goals",
    component: StatsRegionalGoalsDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/regional-goals.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["card", "utils"],
  },
  {
    name: "plan-overview",
    title: "Plan overview",
    component: StatsPlanOverviewDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/plan-overview.tsx",
    dependencies: ["lucide-react@^0.577.0", "recharts"],
    registryDependencies: ["card", "chart"],
  },
  {
    name: "budget-utilization",
    title: "Budget utilization",
    component: StatsBudgetUtilizationDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/budget-utilization.tsx",
    dependencies: ["recharts"],
    registryDependencies: ["card", "chart"],
  },
  {
    name: "quota-progress",
    title: "Quota progress",
    component: StatsQuotaProgressDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/quota-progress.tsx",
    registryDependencies: ["card", "progress"],
  },
  {
    name: "market-trends",
    title: "Market trends",
    component: StatsMarketTrendsDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/market-trends.tsx",
    dependencies: ["recharts"],
    registryDependencies: ["card", "chart", "utils"],
  },
  {
    name: "editable-limits",
    title: "Editable resource limits",
    component: StatsEditableLimitsDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/editable-limits.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button", "card", "dialog", "input", "label"],
  },
  {
    name: "usage-breakdown",
    title: "Usage breakdown",
    component: StatsUsageBreakdownDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/usage-breakdown.tsx",
    dependencies: ["recharts"],
    registryDependencies: ["button", "card", "chart"],
  },
  {
    name: "storage-breakdown",
    title: "Storage breakdown",
    component: StatsStorageBreakdownDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/storage-breakdown.tsx",
    registryDependencies: ["card", "utils"],
  },
  {
    name: "monthly-costs",
    title: "Monthly cost breakdown",
    component: StatsMonthlyCostsDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/monthly-costs.tsx",
    registryDependencies: ["badge", "card"],
  },
  {
    name: "investment-growth",
    title: "Investment growth",
    component: StatsInvestmentGrowthDemo,
    componentSlug: "stats",
    sourcePath: "src/demos/stats/investment-growth.tsx",
    registryDependencies: ["utils"],
  },
]
