import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsPillDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="gap-1 bg-transparent">
        <TabsTrigger
          className="[--tabs-indicator-radius:100%] [--tabs-indicator-bg:var(--primary)] [--tabs-indicator-bg-dark:var(--primary)] data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
          value="overview"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="[--tabs-indicator-radius:100%] [--tabs-indicator-bg:var(--primary)] [--tabs-indicator-bg-dark:var(--primary)] data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
          value="analytics"
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          className="[--tabs-indicator-radius:100%] [--tabs-indicator-bg:var(--primary)] [--tabs-indicator-bg-dark:var(--primary)] data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
          value="reports"
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
