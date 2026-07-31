"use client"

import { useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/primitives/avatar"
import { Button } from "@/registry/primitives/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"
import { Switch } from "@/registry/primitives/switch"

const avatars = [
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png",
    fallback: "OS",
    name: "Olivia Sparks",
  },
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png",
    fallback: "HL",
    name: "Howard Lloyd",
  },
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png",
    fallback: "HR",
    name: "Hallie Richards",
  },
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png",
    fallback: "JW",
    name: "Jenny Wilson",
  },
]

export default function DropdownMenuMeetingScheduleDemo() {
  const [privacy, setPrivacy] = useState({
    review: false,
    sprint: true,
    status: false,
    performance: true,
    feedback: false,
  })

  const meetings = [
    {
      id: "review",
      time: "08:30",
      title: "Daily Project Review",
      subtitle: "Team organization",
      avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png",
    },
    {
      id: "sprint",
      time: "09:00",
      title: "Sprint Surge",
      subtitle: "Daily Boost for Agile Progress",
      avatars,
    },
    {
      id: "status",
      time: "11:45",
      title: "Project Status Update",
      subtitle: "Progress Overview Update",
      avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png",
    },
    {
      id: "performance",
      time: "06:30",
      title: "Team Performance",
      subtitle: "Team Metrics Evaluation",
      avatars,
    },
    {
      id: "feedback",
      time: "10:50",
      title: "Stakeholder Feedback",
      subtitle: "Feedback from Stakeholders",
      avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png",
    },
  ] as const

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Meetings Schedule</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:w-124">
        <DropdownMenuLabel>Today&apos;s meetings</DropdownMenuLabel>
        <DropdownMenuGroup>
          {meetings.map((meeting) => {
            const checked = privacy[meeting.id]

            return (
              <DropdownMenuItem
                key={meeting.id}
                className="justify-between gap-3.5"
                onSelect={(event) => {
                  event.preventDefault()
                  setPrivacy((current) => ({
                    ...current,
                    [meeting.id]: !current[meeting.id],
                  }))
                }}
              >
                <span className="font-medium text-popover-foreground">
                  {meeting.time}
                </span>

                <span className="flex flex-1 flex-col">
                  <span className="text-popover-foreground">
                    {meeting.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {meeting.subtitle}
                  </span>
                </span>

                {"avatars" in meeting ? (
                  <span className="flex -space-x-3 max-sm:hidden">
                    {meeting.avatars.map((avatar) => (
                      <Avatar key={avatar.name} className="ring-2 ring-background">
                        <AvatarImage src={avatar.src} alt={avatar.name} />
                        <AvatarFallback className="text-xs">
                          {avatar.fallback}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </span>
                ) : (
                  <Avatar className="max-sm:hidden">
                    <AvatarImage
                      src={meeting.avatar}
                      alt={`${meeting.title} participant`}
                    />
                    <AvatarFallback className="text-xs">A</AvatarFallback>
                  </Avatar>
                )}

                <span className="flex items-center gap-2">
                  <span className="text-sm text-popover-foreground">
                    Privacy
                  </span>
                  <Switch
                    checked={checked}
                    aria-hidden="true"
                    tabIndex={-1}
                    className="pointer-events-none"
                  />
                </span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
