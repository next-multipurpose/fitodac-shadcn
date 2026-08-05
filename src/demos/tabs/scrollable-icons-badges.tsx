import { BellIcon, BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react"

import { Badge } from "@/registry/primitives/badge"
import { ScrollArea, ScrollBar } from "@/registry/primitives/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsScrollableIconsBadgesDemo() {
  return (
    <Tabs defaultValue="tab-1">
      <ScrollArea>
        <TabsList>
          <TabsTrigger value="tab-1">
            <HouseIcon
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Overview
          </TabsTrigger>
          <TabsTrigger className="group" value="tab-2">
            <PanelsTopLeftIcon
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Projects
            <Badge
              className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
              variant="secondary"
            >
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger className="group" value="tab-3">
            <BoxIcon
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Packages
            <Badge className="ms-1.5 transition-opacity group-data-[state=inactive]:opacity-50">
              New
            </Badge>
          </TabsTrigger>
          <TabsTrigger className="group" value="tab-4">
            <BellIcon
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Notifications
            <Badge
              className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
              variant="secondary"
            >
              5
            </Badge>
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="bg-muted rounded-lg p-4">
        <TabsContent value="tab-1">
          <h3 className="mb-2 font-semibold text-lg">Overview</h3>
          <p className="text-xs">
            View a comprehensive summary of your account activity, recent updates, and
            key metrics at a glance.
          </p>
        </TabsContent>
        <TabsContent value="tab-2">
          <h3 className="mb-2 font-semibold text-lg">Analytics</h3>
          <p className="text-xs">
            Dive deep into your data with detailed analytics, trends, and insights to
            help you make informed decisions.
          </p>
        </TabsContent>
        <TabsContent value="tab-3">
          <h3 className="mb-2 font-semibold text-lg">Reports</h3>
          <p className="text-xs">
            Generate and view comprehensive reports on various aspects of your account
            performance and activity.
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
