import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"
import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react"

export default function TabsVerticalPillDemo() {
  return (
    <Tabs
      className="flex-1 max-w-md basis-0"
      defaultValue="tab-1"
      orientation="vertical"
    >
      <TabsList className="flex-col gap-1 bg-transparent">
        <TabsTrigger
          className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none!"
          value="tab-1"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none!"
          value="tab-2"
        >
          Projects
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none!"
          value="tab-3"
        >
          Packages
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none!"
          value="tab-4"
        >
          Notifications
        </TabsTrigger>
      </TabsList>

      <div className="grow rounded-md bg-muted">
        <TabsContent value="tab-1" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Overview</h3>
          <p className="text-sm text-muted-foreground">
            View a comprehensive summary of your account activity, recent updates, and key metrics at a glance.
          </p>
        </TabsContent>
        <TabsContent value="tab-2" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Projects</h3>
          <p className="text-sm text-muted-foreground">
            Explore your active projects, track progress, and collaborate with your team on ongoing initiatives.
          </p>
        </TabsContent>
        <TabsContent value="tab-3" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Packages</h3>
          <p className="text-sm text-muted-foreground">
            Browse and manage your software packages, dependencies, and published releases across all projects.
          </p>
        </TabsContent>
        <TabsContent value="tab-4" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Manage your notification preferences and view recent alerts and updates from your account.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
