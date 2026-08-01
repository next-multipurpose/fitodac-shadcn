"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/primitives/tooltip"
import { Button } from "@/registry/primitives/button"

export default function TooltipBasicDemo() {
  return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
  )
}
