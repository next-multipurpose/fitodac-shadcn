import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsIndicatorColorDemo() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="overview">
      <TabsList className="gap-1">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:text-primary [--tabs-indicator-bg:theme(colors.primary)] [--tabs-indicator-bg-dark:theme(colors.primary)]"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          className="data-[state=active]:text-primary [--tabs-indicator-bg:theme(colors.primary)] [--tabs-indicator-bg-dark:theme(colors.primary)]"
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          value="reports"
          className="data-[state=active]:text-primary [--tabs-indicator-bg:theme(colors.primary)] [--tabs-indicator-bg-dark:theme(colors.primary)]"
        >
          Reports
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="data-[state=active]:text-primary [--tabs-indicator-bg:theme(colors.primary)] [--tabs-indicator-bg-dark:theme(colors.primary)]"
        >
          Notifications
        </TabsTrigger>
      </TabsList>
      <div className="bg-muted rounded-lg">
        <TabsContent value="overview" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Overview</h3>
          <p className="text-sm text-muted-foreground">
            View a comprehensive summary of your account activity, recent updates, and key metrics at a glance.
          </p>
        </TabsContent>
        <TabsContent value="analytics" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Dive deep into your data with detailed analytics, trends, and insights to help you make informed decisions.
          </p>
        </TabsContent>
        <TabsContent value="reports" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Reports</h3>
          <p className="text-sm text-muted-foreground">
            Generate and view comprehensive reports on various aspects of your account performance and activity.
          </p>
        </TabsContent>
        <TabsContent value="notifications" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Manage your notification preferences and view recent alerts and updates from your account.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
