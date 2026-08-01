"use client"

import { Button } from "@/registry/primitives/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/primitives/tooltip"

export default function TooltipMediaPreviewDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Product preview</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs p-0">
        <div className="flex flex-col gap-2 p-3">
          <div
            aria-hidden="true"
            className="flex aspect-video w-full items-end rounded-md bg-gradient-to-br from-primary/20 via-accent to-muted p-3"
          >
            <span className="rounded bg-background/90 px-2 py-1 text-[10px] font-medium text-foreground shadow-sm">
              Dashboard UI kit
            </span>
          </div>
          <div>
            <p className="font-semibold">Product preview</p>
            <p className="text-xs text-muted-foreground">
              View the complete component details and implementation notes.
            </p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
