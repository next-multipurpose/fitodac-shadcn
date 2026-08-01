"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/primitives/card"
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/registry/components/sortable"

import { Switch } from "@/registry/primitives/switch"
import { GripVerticalIcon } from "lucide-react"

interface NotificationChannel {
  id: string
  name: string
  description: string
  enabled: boolean
}

const defaultChannels: NotificationChannel[] = [
  {
    id: "1",
    name: "Email",
    description: "Send notifications via email",
    enabled: true,
  },
  {
    id: "2",
    name: "Push Notifications",
    description: "Browser and mobile push",
    enabled: true,
  },
  { id: "3", name: "SMS", description: "Text message alerts", enabled: false },
  {
    id: "4",
    name: "Slack",
    description: "Post to Slack channels",
    enabled: true,
  },
  {
    id: "5",
    name: "Webhook",
    description: "Send to custom endpoint",
    enabled: false,
  },
]

export default function SortableNotificationPriorityDemo() {
  const [channels, setChannels] =
    useState<NotificationChannel[]>(defaultChannels)

  const toggleChannel = (id: string) => {
    setChannels((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, enabled: !ch.enabled } : ch))
    )
  }

  return (
    <Card className="mx-auto w-full max-w-md shadow-none">
      <CardHeader>
        <CardTitle>Notification Priority</CardTitle>
        <CardDescription>
          Drag to reorder by priority. Top channels are tried first.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Sortable
          value={channels}
          onValueChange={setChannels}
          getItemValue={(item) => item.id}
          strategy="vertical"
          className="space-y-1 px-6 pb-6"
        >
          {channels.map((channel) => (
            <SortableItem key={channel.id} value={channel.id}>
              <div className="flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2.5 transition-colors hover:bg-accent/50">
                <SortableItemHandle className="text-muted-foreground hover:text-foreground">
                  <GripVerticalIcon className="size-4" />
                </SortableItemHandle>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{channel.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {channel.description}
                  </p>
                </div>
                <Switch
                  checked={channel.enabled}
                  onCheckedChange={() => toggleChannel(channel.id)}
                />
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </CardContent>
    </Card>
  )
}
