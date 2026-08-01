"use client"

import { useId } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/primitives/select"
import { Field, FieldDescription } from "@/registry/primitives/field"

export default function SelectHelperTextDemo() {
  const id = useId()

  return (
    <Field>
      <Select defaultValue="3">
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">React</SelectItem>
          <SelectItem value="2">Next.js</SelectItem>
          <SelectItem value="3">Astro</SelectItem>
          <SelectItem value="4">Gatsby</SelectItem>
        </SelectContent>
      </Select>

      <FieldDescription>
        Tell us what&lsquo;s your favorite Select framework
      </FieldDescription>
    </Field>
  )
}
