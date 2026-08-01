import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from "@/registry/components/timeline"

import { Avatar, AvatarFallback } from "@/registry/primitives/avatar"

const activities = [
  {
    id: 1,
    user: "Alex Johnson",
    action: "pushed 3 commits to",
    target: "main",
    date: "5 minutes ago",
  },
  {
    id: 2,
    user: "Sarah Chen",
    action: "opened pull request",
    target: "#284 — Add dark mode",
    date: "20 minutes ago",
  },
  {
    id: 3,
    user: "David Kim",
    action: "commented on",
    target: "Issue #142",
    date: "1 hour ago",
  },
  {
    id: 4,
    user: "Emma Wilson",
    action: "deployed to",
    target: "production",
    date: "2 hours ago",
  },
  {
    id: 5,
    user: "Michael Rodriguez",
    action: "merged branch",
    target: "feat/notifications",
    date: "3 hours ago",
  },
]

export default function TimelineActivityFeedDemo() {
  return (
    <div className="w-full max-w-md">
      <Timeline defaultValue={5}>
        {activities.map((activity) => (
          <TimelineItem
            key={activity.id}
            step={activity.id}
            className="group-data-[orientation=vertical]/timeline:ms-10"
          >
            <TimelineHeader>
              <TimelineSeparator className="bg-input! group-data-[orientation=vertical]/timeline:top-2 group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:h-[calc(100%-2.5rem)] group-data-[orientation=vertical]/timeline:translate-y-7" />
              <TimelineIndicator className="size-8 overflow-hidden rounded-full border-none group-data-[orientation=vertical]/timeline:-left-8">
                <Avatar className="size-8">
                  <AvatarFallback className="text-[10px]">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent>
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <span className="font-medium">{activity.target}</span>
              </p>
              <TimelineDate className="mt-0.5 mb-0">
                {activity.date}
              </TimelineDate>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
