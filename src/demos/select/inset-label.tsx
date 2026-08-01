"use client"

import { useId } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/primitives/select"
import { Label } from "@/registry/primitives/label"

export default function SelectInsetLabelDemo() {
  const id = useId()

  return (
    <div className="group relative w-full max-w-xs rounded-md border border-input bg-background shadow-xs transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 has-[input:is(:disabled)]:*:pointer-events-none dark:has-aria-invalid:ring-destructive/40">
      <Label
        htmlFor={id}
        className="block px-3 pt-1 text-xs font-medium text-foreground dark:bg-input/30 dark:group-hover:bg-input/50"
      >
        Select with inset label
      </Label>
      <Select>
        <SelectTrigger
          id={id}
          className="w-full rounded-t-none border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:group-hover:bg-input/50"
        >
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Credit Card</SelectItem>
          <SelectItem value="2">Google Pay</SelectItem>
          <SelectItem value="3">PayPal</SelectItem>
          <SelectItem value="4">Bitcoin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

