import { Badge } from "@/registry/primitives/badge"
import { Card, CardHeader, CardContent } from "@/registry/primitives/card"
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/registry/components/timeline"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/registry/primitives/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/primitives/collapsible"
import { Spinner } from "@/registry/primitives/spinner"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

const pipelineSteps = [
  {
    id: 1,
    title: "Source Code Checkout",
    duration: "12s",
    status: "completed",
    description: "Successfully fetched latest changes from the main branch.",
    user: {
      name: "Alex Johnson",
    },
  },
  {
    id: 2,
    title: "Dependency Installation",
    duration: "1m 45s",
    status: "completed",
    description: "All npm packages installed and cached for future builds.",
    user: {
      name: "Sarah Chen",
    },
  },
  {
    id: 3,
    title: "Unit & Integration Tests",
    duration: "Running",
    status: "active",
    description: "Running 142 test suites across the entire codebase...",
    user: {
      name: "Michael Rodriguez",
    },
  },
  {
    id: 4,
    title: "Production Build",
    duration: "Pending",
    status: "pending",
    description: "Optimizing assets and generating static site pages.",
    user: {
      name: "Emma Wilson",
    },
  },
]

function StatusIcon({ status }: { status: string }) {
  if (status === "completed") return <CheckIcon className="size-3.5" />
  if (status === "active") return <Spinner className="size-3.5" />
  return <CircleIcon className="size-3.5" />
}

function StatusBadge({
  status,
  duration,
}: {
  status: string
  duration: string
}) {
  const variant =
    status === "completed"
      ? "success-light"
      : status === "active"
        ? "info-light"
        : "warning-light"

  return (
    <Badge variant={variant} size="sm">
      {duration}
    </Badge>
  )
}

export default function TimelineDeploymentPipelineDemo() {
  return (
    <div className="w-full max-w-lg">
      <Timeline defaultValue={3}>
        {pipelineSteps.map((step) => (
          <TimelineItem key={step.id} step={step.id} className="ms-10 pb-10">
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-7" />
              <div className="flex items-center gap-2">
                <TimelineTitle className="text-sm font-semibold">
                  {step.title}
                </TimelineTitle>
                <StatusBadge status={step.status} duration={step.duration} />
              </div>
              <TimelineIndicator
                className={cn(
                  "flex size-6 items-center justify-center border-none bg-muted text-muted-foreground group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7",
                  step.status === "active" && "ring-2 ring-primary/20"
                )}
              >
                <StatusIcon status={step.status} />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent className="mt-2">
              <Card>
                <Collapsible defaultOpen className="group/collapsible">
                  <CollapsibleTrigger className="flex w-full">
                    <CardHeader className="flex grow flex-row items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-5">
                          <AvatarFallback>
                            {step.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-muted-foreground">
                          {step.user.name}
                        </span>
                      </div>
                      <ChevronRightIcon className="size-4 text-muted-foreground transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
