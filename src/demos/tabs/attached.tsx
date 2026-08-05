import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsAttachedDemo() {
  return (
    <Tabs defaultValue="overview"  className="flex-1 basis-0 gap-0">
      <TabsList className="relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
        <TabsTrigger
          className="data-[state=active]:bg-muted! overflow-hidden rounded-b-none border-0 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none!"
          value="overview"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-muted! overflow-hidden rounded-b-none border-0 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none!"
          value="analytics"
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-muted! overflow-hidden rounded-b-none border-0 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none!"
          value="reports"
        >
          Reports
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-muted! overflow-hidden rounded-b-none border-0 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none!"
          value="notifications"
        >
          Notifications
        </TabsTrigger>
      </TabsList>
      <div className="bg-muted rounded-br-lg rounded-bl-lg p-4 -mt-px">
        <TabsContent value="overview">
          <div className="p-2 space-y-2">
            <h3 className="mb-2 font-semibold text-lg">Overview</h3>
            <p className="text-muted-foreground text-sm">
              View a comprehensive summary of your account activity, recent updates, and
              key metrics at a glance.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="p-2 space-y-2">
            <h3 className="mb-2 font-semibold text-lg">Analytics</h3>
            <p className="text-muted-foreground text-sm">
              Dive deep into your data with detailed analytics, trends, and insights to
              help you make informed decisions.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <div className="p-2 space-y-2">
            <h3 className="mb-2 font-semibold text-lg">Reports</h3>
            <p className="text-muted-foreground text-sm">
              Generate and view comprehensive reports on various aspects of your account
              performance and activity.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <div className="p-2 space-y-2">
            <h3 className="mb-2 font-semibold text-lg">Notifications</h3>
            <p className="text-muted-foreground text-sm">
              Manage your notification preferences and view recent alerts and updates from
              your account.
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  )
}
