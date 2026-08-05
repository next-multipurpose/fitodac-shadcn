import { Badge } from "@/registry/primitives/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsBadgeStatsDemo() {
  return (
    <Tabs defaultValue="tab-1" className="gap-2 flex-1 max-w-md basis-0">
      <TabsList className="flex w-full basis-0 gap-2 rounded-none bg-transparent h-auto! p-0">
        <TabsTrigger
          className="group data-[state=active]:bg-muted flex-1 flex-col p-3 text-xs data-[state=active]:shadow-none!"
          value="tab-1"
        >
          <Badge className="mb-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50">
            3
          </Badge>
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="group data-[state=active]:bg-muted flex-1 flex-col p-3 text-xs data-[state=active]:shadow-none!"
          value="tab-2"
        >
          <Badge className="mb-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50">
            0
          </Badge>
          Projects
        </TabsTrigger>
        <TabsTrigger
          className="group data-[state=active]:bg-muted flex-1 flex-col p-3 text-xs data-[state=active]:shadow-none!"
          value="tab-3"
        >
          <Badge className="mb-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50">
            7
          </Badge>
          Packages
        </TabsTrigger>
         <TabsTrigger
          className="group data-[state=active]:bg-muted flex-1 flex-col p-3 text-xs data-[state=active]:shadow-none!"
          value="tab-4"
        >
          <Badge className="mb-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50">
            5
          </Badge>
          Notifications
        </TabsTrigger>
      </TabsList>
      <div className="bg-muted rounded-lg p-4">
        <TabsContent value="tab-1">
          <h3 className="mb-2 font-semibold text-lg">Overview</h3>
          <p className="text-xs">
            View a comprehensive summary of your account activity, recent updates, and
            key metrics at a glance.
          </p>
        </TabsContent>
        <TabsContent value="tab-2">
          <h3 className="mb-2 font-semibold text-lg">Projects</h3>
          <p className="text-xs">
            Explore your active projects, track progress, and collaborate with your team
            on ongoing initiatives.
          </p>
        </TabsContent>
        <TabsContent value="tab-3">
          <h3 className="mb-2 font-semibold text-lg">Packages</h3>
          <p className="text-xs">
            Browse and manage your software packages, dependencies, and published
            releases across all projects.
          </p>
        </TabsContent>
        <TabsContent value="tab-4">
          <h3 className="mb-2 font-semibold text-lg">Notifications</h3>
          <p className="text-xs">
            Manage your notification preferences and view recent alerts and updates from
            your account.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
