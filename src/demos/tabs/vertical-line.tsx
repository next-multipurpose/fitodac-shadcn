import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsVerticalLineDemo() {
  return (
    <Tabs
      className="flex-1 max-w-lg basis-0"
      defaultValue="tab-1"
      orientation="vertical"
    >
      <TabsList
        className="flex-col rounded-none bg-transparent p-0"
        variant="line"
      >
        <TabsTrigger className="after:right-auto after:left-0" value="tab-1">Overview</TabsTrigger>
        <TabsTrigger className="after:right-auto after:left-0" value="tab-2">Projects</TabsTrigger>
        <TabsTrigger className="after:right-auto after:left-0" value="tab-3">Packages</TabsTrigger>
        <TabsTrigger className="after:right-auto after:left-0" value="tab-4">
          Notifications
        </TabsTrigger>
      </TabsList>
      
      <div className="bg-muted rounded-lg p-4 w-full">
        <TabsContent value="tab-1">
          <h3 className="mb-2 font-semibold text-lg">Overview</h3>
          <p className="text-sm">
            View a comprehensive summary of your account activity, recent updates, and key metrics at a glance.
          </p>
        </TabsContent>
        <TabsContent value="tab-2">
          <h3 className="mb-2 font-semibold text-lg">Projects</h3>
          <p className="text-sm">
            Explore your active projects, track progress, and collaborate with your team on ongoing initiatives.
          </p>
        </TabsContent>
        <TabsContent value="tab-3">
          <h3 className="mb-2 font-semibold text-lg">Packages</h3>
          <p className="text-sm">
            Browse and manage your software packages, dependencies, and published releases across all projects.
          </p>
        </TabsContent>
        <TabsContent value="tab-4">
          <h3 className="mb-2 font-semibold text-lg">Notifications</h3>
          <p className="text-sm">
            Manage your notification preferences and view recent alerts and updates from your account.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
