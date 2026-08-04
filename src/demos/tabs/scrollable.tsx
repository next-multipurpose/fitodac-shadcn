import { ScrollArea, ScrollBar } from "@/registry/primitives/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const monthData = months.map((month) => ({
  label: month,
  value: month.toLowerCase(),
  total: Math.floor(Math.random() * 50) + 10,
  completed: Math.floor(Math.random() * 40) + 5,
}))

export default function TabsScrollableDemo() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="january">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <TabsList>
          {months.map((month) => (
            <TabsTrigger key={month} value={month.toLowerCase()}>
              {month}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {monthData.map((month) => (
        <TabsContent key={month.value} value={month.value}>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <h3 className="mb-2 font-semibold text-lg">{month.label} 2024</h3>
            <p className="text-muted-foreground text-sm">
              View statistics and activity for {month.label}. Track your progress, goals,
              and achievements throughout the month.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-md border p-3">
                <p className="text-muted-foreground text-xs">Total Tasks</p>
                <p className="mt-1 font-semibold text-2xl">{month.total}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-muted-foreground text-xs">Completed</p>
                <p className="mt-1 font-semibold text-2xl">{month.completed}</p>
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
