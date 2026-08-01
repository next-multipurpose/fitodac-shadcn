"use client"

import { useId } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/primitives/select"

export default function SelectInvalidDemo() {
  const id = useId()

  return (
    <div className="w-full max-w-xs">
      <Select defaultValue="1">
        <SelectTrigger id={id} className="w-full" aria-invalid>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">React</SelectItem>
          <SelectItem value="2">Next.js</SelectItem>
          <SelectItem value="3">Astro</SelectItem>
          <SelectItem value="4">Gatsby</SelectItem>
        </SelectContent>
      </Select>
      <p
        aria-live="polite"
        className="mt-2 text-xs text-destructive"
        role="alert"
      >
        Selected option is invalid
      </p>
    </div>
  )
}
