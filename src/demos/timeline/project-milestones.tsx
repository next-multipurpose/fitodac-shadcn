import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/registry/components/timeline"

export default function TimelineProjectMilestonesDemo() {
  return (
    <Timeline defaultValue={2} className="w-full max-w-md">
      <TimelineItem step={1}>
        <TimelineHeader>
          <TimelineDate dateTime="2024-03">March 2024</TimelineDate>
          <TimelineTitle>Project Initialized</TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineContent>
          Successfully set up the project repository and initial architecture.
        </TimelineContent>
      </TimelineItem>

      <TimelineItem step={2}>
        <TimelineHeader>
          <TimelineDate dateTime="2024-04">April 2024</TimelineDate>
          <TimelineTitle>Beta Release</TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineContent>
          Launched the beta version for early testers and feedback.
        </TimelineContent>
      </TimelineItem>

      <TimelineItem step={3}>
        <TimelineHeader>
          <TimelineDate dateTime="2024-06">June 2024</TimelineDate>
          <TimelineTitle>Official Launch</TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineContent>
          The platform is now live for all users worldwide.
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
