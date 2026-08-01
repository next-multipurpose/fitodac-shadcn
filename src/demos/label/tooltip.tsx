"use client"

import { useId } from "react"
import { InfoIcon } from "lucide-react"

import { Field } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/primitives/tooltip"

export default function LabelTooltipDemo() {
  const id = useId()

  return (
    <Field>
      <Label htmlFor={id} className="gap-1">
        API Key
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="inline-flex items-center">
              <span className="inline-flex cursor-help text-muted-foreground">
                <InfoIcon className="size-3.5" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your API key can be found in the developer settings.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Label>
      <Input id={id} type="text" required disabled />
    </Field>
  )
}
