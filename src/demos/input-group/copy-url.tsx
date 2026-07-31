"use client"

import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/primitives/input-group"
import { CopyIcon } from "lucide-react"
import { toast } from "sonner"

export default function InputGroupCopyUrlDemo() {
  const id = useId()

  return (
    <Field>
      <FieldLabel htmlFor={id}>Share URL</FieldLabel>

      <InputGroup>
        <InputGroupInput
          defaultValue="https://reui.com/share"
          readOnly
          id={id}
        />

        <InputGroupAddon align="inline-end">
          <InputGroupButton
            variant="ghost"
            size="icon-xs"
            onClick={() => toast.success("Copied to clipboard")}
          >
            <CopyIcon className="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
