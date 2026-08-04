import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsIndicatorColorDemo() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="overview">
      <TabsList className="gap-1">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:text-primary [--tabs-indicator-bg:theme(colors.primary)] [--tabs-indicator-bg-dark:theme(colors.primary)]"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          className="data-[state=active]:text-primary [--tabs-indicator-bg:theme(colors.primary)] [--tabs-indicator-bg-dark:theme(colors.primary)]"
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          value="reports"
          className="data-[state=active]:text-primary [--tabs-indicator-bg:theme(colors.primary)] [--tabs-indicator-bg-dark:theme(colors.primary)]"
        >
          Reports
        </TabsTrigger>
      </TabsList>
      <div className="bg-muted rounded-lg p-4">
        <TabsContent value="overview">
          <p className="text-xs">Overview content</p>
        </TabsContent>
        <TabsContent value="analytics">
          <p className="text-xs">Analytics content</p>
        </TabsContent>
        <TabsContent value="reports">
          <p className="text-xs">Reports content</p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
