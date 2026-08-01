"use client"

import { useId } from "react"

import { DatabaseIcon } from "lucide-react"
import { Label } from "@/registry/primitives/label"
import { Switch } from "@/registry/primitives/switch"

export default function SwitchOptionCardsDemo() {
  const id = useId()

  return (
    <div className="w-full space-y-2">
      <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50">
        <Switch
          id={id}
          className="data-[state=checked]:[&_span]:translate-x-2.7 order-1 after:absolute after:inset-0 data-[size=default]:h-4 data-[size=default]:w-6 [&_span]:group-data-[size=default]/switch:size-3 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
          aria-describedby={`${id}-backup-description`}
        />
        <div className="flex grow items-center gap-3">
          <DatabaseIcon />
          <div className="grid grow gap-2">
            <Label htmlFor={`${id}-backup`}>Backup</Label>
            <p
              id={`${id}-backup-description`}
              className="text-xs text-muted-foreground"
            >
              Backup every file from your project.
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50">
        <Switch
          id={id}
          className="data-[state=checked]:[&_span]:translate-x-2.7 order-1 after:absolute after:inset-0 data-[size=default]:h-4 data-[size=default]:w-6 [&_span]:group-data-[size=default]/switch:size-3 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
          aria-describedby={`${id}-google-description`}
        />
        <div className="flex grow gap-3">
          <div
            aria-hidden="true"
            className="flex size-5 items-center justify-center rounded-full border text-xs font-semibold"
          >
            G
          </div>
          <div className="grid grow gap-2">
            <Label htmlFor={`${id}-google`}>Google Cloud Backup</Label>
            <p
              id={`${id}-google-description`}
              className="text-xs text-muted-foreground"
            >
              Backup every picture, video and PDFs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
