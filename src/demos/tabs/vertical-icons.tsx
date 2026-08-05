import { BellIcon, BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsVerticalIconsDemo() {
  return (
    <Tabs
      className="flex-1 max-w-md basis-0"
      defaultValue="tab-1"
      orientation="vertical"
    >
      <TabsList className="text-foreground flex-col gap-2">
        <TabsTrigger value="tab-1">
          <HouseIcon
            aria-hidden="true"
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
          />
          Overview
        </TabsTrigger>
        <TabsTrigger value="tab-2">
          <PanelsTopLeftIcon
            aria-hidden="true"
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
          />
          Projects
        </TabsTrigger>
        <TabsTrigger value="tab-3">
          <BoxIcon
            aria-hidden="true"
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
          />
          Packages
        </TabsTrigger>
        <TabsTrigger value="tab-4">
          <BellIcon
            aria-hidden="true"
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
          />
          Notifications
        </TabsTrigger>
      </TabsList>
      
      <div className="grow rounded-md border text-start">
        <TabsContent value="tab-1" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Overview</h3>
          <p className="text-muted-foreground text-sm">
            View a comprehensive summary of your account activity, recent updates, and key metrics at a glance.
          </p>
        </TabsContent>
        <TabsContent value="tab-2" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Projects</h3>
          <p className="text-muted-foreground text-sm">
            Explore your active projects, track progress, and collaborate with your team on ongoing initiatives.
          </p>
        </TabsContent>
        <TabsContent value="tab-3" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Packages</h3>
          <p className="text-muted-foreground text-sm">
            Browse and manage your software packages, dependencies, and published releases across all projects.
          </p>
        </TabsContent>
        <TabsContent value="tab-4" className="p-4 space-y-2">
          <h3 className="mb-2 font-semibold text-lg">Notifications</h3>
          <p className="text-muted-foreground text-sm">
            Manage your notification preferences and view recent alerts and updates from your account.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
