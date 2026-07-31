import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/registry/primitives/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/primitives/tooltip"
import { InfoIcon } from "lucide-react"

export default function InputGroupUrlPrefixTooltipDemo() {
  const id = useId()

  return (
    <Field>
      <FieldLabel htmlFor={id}>Informative input</FieldLabel>

      <InputGroup>
        <InputGroupInput id={id} placeholder="example.com" className="pl-1!" />

        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>

        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton className="rounded-full" size="icon-xs">
                <InfoIcon />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>This is content in a tooltip.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
