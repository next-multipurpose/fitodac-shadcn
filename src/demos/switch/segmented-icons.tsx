"use client"

import { useId, useState } from "react"

import { MoonIcon, SunIcon } from "lucide-react"
import { Field, FieldLabel } from "@/registry/primitives/field"
import { Switch } from "@/registry/primitives/switch"
import { cn } from "@/lib/utils"

export default function SwitchSegmentedIconsDemo() {
  const id = useId()
  const [checked, setChecked] = useState<boolean>(true)

  return (
    <Field>
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          checked={checked}
          className={cn(
            "peer absolute inset-0 h-[inherit] w-auto",
            "data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50",
            "[&_span]:transition-transform [&_span]:duration-300 [&>span]:size-8.5! [&>span]:ease-[cubic-bezier(0.16,1,0.3,1)]"
          )}
          id={id}
          onCheckedChange={setChecked}
        />
        <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=checked]:text-muted-foreground/70">
          <MoonIcon aria-hidden="true" size={16} />
        </span>
        <span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=unchecked]:text-muted-foreground/70">
          <SunIcon aria-hidden="true" size={16} />
        </span>
      </div>

      <FieldLabel className="sr-only" htmlFor={id}>
        Labeled switch
      </FieldLabel>
    </Field>
  )
}
