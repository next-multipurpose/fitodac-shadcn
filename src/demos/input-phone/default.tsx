"use client"

import { useState } from "react"

import { InputPhone } from "@/registry/components/input-phone"

export default function InputPhoneDefaultDemo() {
  const [value, setValue] = useState<string>()

  return (
    <div className="w-full max-w-sm">
      <InputPhone
        defaultCountry="US"
        international
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
