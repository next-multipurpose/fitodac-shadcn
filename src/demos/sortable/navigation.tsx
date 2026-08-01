"use client"

import { useState, type ReactNode } from "react"
import { Badge } from "@/registry/primitives/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/primitives/card"
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/registry/components/sortable"
import {
  BarChart3Icon,
  CalendarIcon,
  FolderIcon,
  GripVerticalIcon,
  InboxIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: ReactNode
  count?: number
}

const defaultItems: NavItem[] = [
  {
    id: "1",
    label: "Dashboard",
    icon: <LayoutDashboardIcon className="size-4 text-muted-foreground" />,
  },
  {
    id: "2",
    label: "Inbox",
    icon: <InboxIcon className="size-4 text-muted-foreground" />,
    count: 5,
  },
  {
    id: "3",
    label: "Projects",
    icon: <FolderIcon className="size-4 text-muted-foreground" />,
    count: 12,
  },
  {
    id: "4",
    label: "Calendar",
    icon: <CalendarIcon className="size-4 text-muted-foreground" />,
  },
  {
    id: "5",
    label: "Analytics",
    icon: <BarChart3Icon className="size-4 text-muted-foreground" />,
  },
  {
    id: "6",
    label: "Settings",
    icon: <SettingsIcon className="size-4 text-muted-foreground" />,
  },
]

export default function SortableNavigationDemo() {
  const [items, setItems] = useState<NavItem[]>(defaultItems)

  return (
    <Card className="mx-auto w-full max-w-xs shadow-none">
      <CardHeader>
        <CardTitle>Navigation</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <Sortable
          value={items}
          onValueChange={setItems}
          getItemValue={(item) => item.id}
          strategy="vertical"
          className="space-y-0.5"
        >
          {items.map((item) => (
            <SortableItem key={item.id} value={item.id}>
              <div className="group flex items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors hover:bg-accent">
                <SortableItemHandle className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground [div:hover>&]:opacity-100">
                  <GripVerticalIcon className="size-3.5" />
                </SortableItemHandle>
                {item.icon}
                <span className="flex-1 text-sm">{item.label}</span>
                {item.count !== undefined && (
                  <Badge
                    variant="outline"
                    className="rounded-full px-1.5 py-0 text-[10px]"
                  >
                    {item.count}
                  </Badge>
                )}
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </CardContent>
    </Card>
  )
}
