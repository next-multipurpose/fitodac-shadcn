"use client"

import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/primitives/tooltip"

export default function TooltipIconTriggerDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label="More information"
          className="rounded-full p-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <InfoIcon className="text-muted-foreground size-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>More information</p>
      </TooltipContent>
    </Tooltip>
  )
}
