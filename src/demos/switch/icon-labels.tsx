"use client"

import { useId, useState } from "react"

import { MoonIcon, SunIcon } from "lucide-react"
import { Field } from "@/registry/primitives/field"
import { Switch } from "@/registry/primitives/switch"

export default function SwitchIconLabelsDemo() {
  const id = useId()
  const [checked, setChecked] = useState(false)

    return (
    <Field
      orientation="horizontal"
      className="group inline-flex items-center gap-2"
      data-state={checked ? "checked" : "unchecked"}
    >
      <span
        aria-controls={id}
        className="flex-1 cursor-pointer text-right text-sm font-medium group-data-[state=checked]:text-muted-foreground/70"
        id={`${id}-off`}
        onClick={() => setChecked(false)}
      >
        <MoonIcon aria-hidden="true" size={16} />
      </span>
      <Switch
        aria-label="Toggle between dark and light mode"
        aria-labelledby={`${id}-off ${id}-on`}
        checked={checked}
        id={id}
        onCheckedChange={setChecked}
      />
      <span
        aria-controls={id}
        className="flex-1 cursor-pointer text-left text-sm font-medium group-data-[state=unchecked]:text-muted-foreground/70"
        id={`${id}-on`}
        onClick={() => setChecked(true)}
      >
        <SunIcon aria-hidden="true" size={16} />
      </span>
    </Field>
  )
}
