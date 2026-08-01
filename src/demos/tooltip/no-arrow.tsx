"use client"

import { Button } from "@/registry/primitives/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/primitives/tooltip"

export default function TooltipNoArrowDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">No arrow</Button>
      </TooltipTrigger>
      <TooltipContent className="[&_svg]:invisible">
        <p>This tooltip doesn&apos;t have an arrow</p>
      </TooltipContent>
    </Tooltip>
  )
}
