import { BellIcon, BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsStackedIconsDemo() {
  return (
    <Tabs defaultValue="tab-1" className="gap-2 flex-1 max-w-md basis-0">
      <TabsList className="flex w-full basis-0 gap-2 rounded-none bg-transparent h-auto! p-0">
        <TabsTrigger
          className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-border relative h-auto flex-col p-4 text-xs data-[state=active]:shadow-none!"
          value="tab-1"
        >
          <HouseIcon
            aria-hidden="true"
            className="mb-1.5 opacity-60"
            size={16}
          />
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-border relative h-auto flex-col p-4 text-xs data-[state=active]:shadow-none!"
          value="tab-2"
        >
          <PanelsTopLeftIcon
            aria-hidden="true"
            className="mb-1.5 opacity-60"
            size={16}
          />
          Projects
        </TabsTrigger>
        <TabsTrigger
          className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-border relative h-auto flex-col p-4 text-xs data-[state=active]:shadow-none!"
          value="tab-3"
        >
          <BoxIcon aria-hidden="true" className="mb-1.5 opacity-60" size={16} />
          Packages
        </TabsTrigger>
           <TabsTrigger
          className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-border relative h-auto flex-col p-4 text-xs data-[state=active]:shadow-none!"
          value="tab-4"
        >
          <BellIcon
            aria-hidden="true"
            className="mb-1.5 opacity-60"
            size={16}
          />
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
