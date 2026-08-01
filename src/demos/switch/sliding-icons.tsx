"use client"

import { useId, useState } from "react"

import { MoonIcon, SunIcon } from "lucide-react"
import { Field, FieldLabel } from "@/registry/primitives/field"
import { Switch } from "@/registry/primitives/switch"
import { cn } from "@/lib/utils"

export default function SwitchSlidingIconsDemo() {
  const id = useId()
  const [checked, setChecked] = useState<boolean>(true)

  return (
    <Field>
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          checked={checked}
          className={cn(
            "peer absolute inset-0 h-[inherit] w-auto",
            "data-[state=unchecked]:bg-input/50",
            "[&_span]:transition-transform [&_span]:duration-300 [&>span]:size-8.5! [&>span]:ease-[cubic-bezier(0.16,1,0.3,1)]"
          )}
          id={id}
          onCheckedChange={setChecked}
        />
        <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
          <MoonIcon aria-hidden="true" size={16} />
        </span>
        <span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
          <SunIcon aria-hidden="true" size={16} />
        </span>
      </div>

      <FieldLabel className="sr-only" htmlFor={id}>
        Labeled switch
      </FieldLabel>
    </Field>
  )
}
