import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsPillDemo() {
  return (
    <Tabs defaultValue="overview" className="flex-1 basis-0">
      <TabsList className="gap-1 bg-transparent">
        <TabsTrigger
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
          value="overview"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
          value="analytics"
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
          value="reports"
        >
          Reports
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
          value="notifications"
        >
          Notifications
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 font-semibold text-lg">Overview</h3>
          <p className="text-muted-foreground text-sm">
            View a comprehensive summary of your account activity, recent updates, and
            key metrics at a glance.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 font-semibold text-lg">Analytics</h3>
          <p className="text-muted-foreground text-sm">
            Dive deep into your data with detailed analytics, trends, and insights to
            help you make informed decisions.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 font-semibold text-lg">Reports</h3>
          <p className="text-muted-foreground text-sm">
            Generate and view comprehensive reports on various aspects of your account
            performance and activity.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-2 font-semibold text-lg">Notifications</h3>
          <p className="text-muted-foreground text-sm">
            Manage your notification preferences and view recent alerts and updates from
            your account.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
