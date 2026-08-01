import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsAttachedDemo() {
  return (
    <Tabs defaultValue="overview" className="gap-0">
      <TabsList className="relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
        <TabsTrigger
          className="data-[state=active]:bg-muted! overflow-hidden rounded-b-none border-0 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none!"
          value="overview"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-muted! overflow-hidden rounded-b-none border-0 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none!"
          value="analytics"
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-muted! overflow-hidden rounded-b-none border-0 py-2 data-[state=active]:z-10 data-[state=active]:shadow-none!"
          value="reports"
        >
          Reports
        </TabsTrigger>
      </TabsList>
      <div className="bg-muted rounded-br-lg rounded-bl-lg p-4 -mt-px">
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
