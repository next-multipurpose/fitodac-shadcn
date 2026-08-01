"use client"

import { ClockIcon } from "lucide-react"
import { useId } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/primitives/select"

export default function SelectTimeRangeDemo() {
  const id = useId()

  return (
    <div className="w-full">
      <Select defaultValue="1">
        <SelectTrigger id={id} className="relative w-full ps-9">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 group-has-[select[disabled]]:opacity-50">
            <ClockIcon aria-hidden="true" size={16} />
          </div>
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">00:00 AM - 11:59 PM</SelectItem>
          <SelectItem value="2">01:00 AM - 12:59 PM</SelectItem>
          <SelectItem value="3">02:00 AM - 01:59 PM</SelectItem>
          <SelectItem value="4">03:00 AM - 02:59 PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
