"use client"

import { useId } from "react"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/registry/primitives/field"
import { Switch } from "@/registry/primitives/switch"

export default function SwitchDestructiveSettingDemo() {
  const id = useId()

  return (
    <div className="w-full">
      <FieldLabel htmlFor={id}>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle className="text-destructive">
              Delete all data on sign out
            </FieldTitle>
            <FieldDescription>
              When enabled, all local data will be permanently removed when you
              sign out. This action cannot be undone.
            </FieldDescription>
          </FieldContent>

          <Switch id={id} className="data-[state=checked]:bg-destructive!" />
        </Field>
      </FieldLabel>
    </div>
  )
}
