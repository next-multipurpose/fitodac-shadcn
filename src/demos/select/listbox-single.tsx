"use client"

import { ListBox, ListBoxItem } from "react-aria-components"

import { Label } from "@/registry/primitives/label"

const listitems = [
  { id: "usd", label: "USD (United States Dollar)" },
  { id: "eur", label: "EUR (Euro)" },
  { id: "gbp", label: "GBP (British Pound)", isDisabled: true },
  { id: "jpy", label: "JPY (Japanese Yen)" },
]

export default function SelectListboxSingleDemo() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Listbox with single option selectable</Label>

      <div className="overflow-hidden rounded-md border border-input">
        <ListBox
          className="space-y-1 bg-background p-1 text-sm shadow-xs transition-[color,box-shadow]"
          aria-label="Select framework"
          selectionMode="single"
          defaultSelectedKeys={["usd"]}
        >
          {listitems.map((item) => (
            <ListBoxItem
              key={item.id}
              className="flex items-center justify-between rounded-sm px-2 py-1.5 data-[disabled]:text-muted-foreground data-[selected]:bg-accent data-[selected]:text-accent-foreground"
              textValue={item.label}
              isDisabled={item.isDisabled}
            >
              {item.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </div>
      <p
        className="text-xs text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Built using{" "}
        <a
          href="https://react-spectrum.adobe.com/react-aria/ListBox.html"
          className="underline hover:text-primary"
          target="_blank"
        >
          React Aria
        </a>
      </p>
    </div>
  )
}

