"use client"

import { Field, FieldLabel, FieldTitle } from "@/registry/primitives/field"
import { Switch } from "@/registry/primitives/switch"
import { BellIcon, MailIcon, SmartphoneIcon } from "lucide-react"

export default function SwitchNotificationSettingsDemo() {
  return (
    <div className="w-full divide-y rounded-lg border [&>div]:first:[&>label]:rounded-t-lg [&>div]:last:[&>label]:rounded-b-lg">
      <Field>
        <FieldLabel className="justify-between px-4 py-3">
          <FieldTitle className="flex items-center gap-2">
            <BellIcon aria-hidden="true" className="size-4 opacity-60" />
            Push notifications
          </FieldTitle>
          <Switch defaultChecked />
        </FieldLabel>
      </Field>

      <Field>
        <FieldLabel className="justify-between px-4 py-3">
          <FieldTitle className="flex items-center gap-2">
            <MailIcon aria-hidden="true" className="size-4 opacity-60" />
            Email notifications
          </FieldTitle>
          <Switch />
        </FieldLabel>
      </Field>

      <Field>
        <FieldLabel className="justify-between px-4 py-3">
          <FieldTitle className="flex items-center gap-2">
            <SmartphoneIcon aria-hidden="true" className="size-4 opacity-60" />
            SMS notifications
          </FieldTitle>
          <Switch />
        </FieldLabel>
      </Field>
    </div>
  )
}
