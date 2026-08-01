"use client"

import { useId } from "react"

import { Field } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"

export default function LabelLiveStatusDemo() {
  const id = useId()

  return (
    <Field>
      <Label htmlFor={id} className="gap-1.5">
        Server Status
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-green-500" />
        </span>
      </Label>
      <Input id={id} type="text" required disabled />
    </Field>
  )
}
