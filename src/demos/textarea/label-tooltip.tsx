"use client"

import { useId } from "react"

import { Field } from "@/registry/primitives/field"
import { Label } from "@/registry/primitives/label"
import { Textarea } from "@/registry/primitives/textarea"
import { Tooltip } from "@/registry/primitives/tooltip"
import { TooltipTrigger } from "@/registry/primitives/tooltip"
import { InfoIcon } from "lucide-react"
import { TooltipContent } from "@/registry/primitives/tooltip"

export default function TextareaLabelTooltipDemo() {
  const id = useId()

  return (
    <Field>
      <Label htmlFor={id}>
        Your message{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="About this field"
              className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <InfoIcon className="size-3 text-muted-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
      </Label>

      <Textarea
        placeholder="Type your message here."
        id={id}
        className="min-h-30"
      />
    </Field>
  )
}
