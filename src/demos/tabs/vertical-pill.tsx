import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"
import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react"

export default function TabsVerticalPillDemo() {
  return (
    <Tabs
      className="w-full flex-row"
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
      </TabsList>

      <div className="grow rounded-md bg-muted">
        <TabsContent value="tab-1">
          <p className="px-4 py-3 text-xs text-muted-foreground">
            Overview content
          </p>
        </TabsContent>
        <TabsContent value="tab-2">
          <p className="px-4 py-3 text-xs text-muted-foreground">
            Projects content
          </p>
        </TabsContent>
        <TabsContent value="tab-3">
          <p className="px-4 py-3 text-xs text-muted-foreground">
            Packages content
          </p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
