import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

export default function TabsBasicDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
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