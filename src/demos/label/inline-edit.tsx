"use client"

import { useId, useState } from "react"
import { CheckIcon, PencilIcon } from "lucide-react"

import { Button } from "@/registry/primitives/button"
import {
  Field,
  FieldDescription,
} from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"

export default function LabelInlineEditDemo() {
  const id = useId()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState("My Awesome Project")

  return (
    <Field>
      <Label htmlFor={id} className="gap-2">
        Project Name
        <Button
          type="button"
          size="icon-xs"
          variant="ghost"
          aria-label={isEditing ? "Save project name" : "Edit project name"}
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <PencilIcon className="size-3.5" />
          )}
        </Button>
      </Label>

      {isEditing ? (
        <Input
          id={id}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoFocus
          onKeyUp={(event) => {
            if (event.key === "Enter") setIsEditing(false)
          }}
        />
      ) : (
        <FieldDescription>{value}</FieldDescription>
      )}
    </Field>
  )
}
