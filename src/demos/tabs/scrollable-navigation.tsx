import {
  BoxIcon,
  ChartLine,
  HouseIcon,
  PanelsTopLeftIcon,
  SettingsIcon,
} from "lucide-react"

import { Badge } from "@/registry/primitives/badge"
import { ScrollArea, ScrollBar } from "@/registry/primitives/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsScrollableNavigationDemo() {
  return (
    <Tabs defaultValue="tab-1" className="min-w-full gap-0">
      <ScrollArea>
        <TabsList className="mb-2 h-auto gap-2 rounded-none bg-transparent px-0 py-1 text-foreground">
          <TabsTrigger
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            value="tab-1"
          >
            <HouseIcon
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Overview
          </TabsTrigger>
          <TabsTrigger
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            value="tab-2"
          >
            <PanelsTopLeftIcon
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Projects
            <Badge
              className="ms-1.5 min-w-5 bg-primary/15 px-1 in-data-[state=active]:bg-muted/20 in-data-[state=active]:text-primary-foreground"
              variant="secondary"
            >
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            value="tab-3"
          >
            <BoxIcon
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Packages
            <Badge className="ms-1.5 in-data-[state=active]:bg-muted/20">
              New
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            value="tab-5"
          >
            <ChartLine
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Insights
          </TabsTrigger>
          <TabsTrigger
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            value="tab-6"
          >
            <SettingsIcon
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Settings
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="rounded-lg bg-muted p-4">
        <TabsContent value="tab-1">
          <p className="text-xs">Overview content</p>
        </TabsContent>
        <TabsContent value="tab-2">
          <p className="text-xs">Analytics content</p>
        </TabsContent>
        <TabsContent value="tab-3">
          <p className="text-xs">Reports content</p>
        </TabsContent>
        <TabsContent value="tab-5">
          <p className="text-xs">Content for Tab 5</p>
        </TabsContent>
        <TabsContent value="tab-6">
          <p className="text-xs">Content for Tab 6</p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
