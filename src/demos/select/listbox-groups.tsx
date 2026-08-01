"use client"

import {
  Header,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Separator,
} from "react-aria-components"

import { Label } from "@/registry/primitives/label"

export default function SelectListboxGroupsDemo() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Listbox with option groups</Label>
      <div className="overflow-hidden rounded-md border border-input">
        <ListBox
          className="max-h-65 min-h-20 space-y-2 overflow-auto bg-background p-1 text-sm shadow-xs transition-[color,box-shadow]"
          aria-label="Select some foods"
          selectionMode="multiple"
          defaultSelectedKeys={["english", "japanese"]}
        >
          <ListBoxSection className="space-y-1">
            <Header className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              European Languages
            </Header>
            <ListBoxItem
              id="english"
              className="relative rounded px-2 py-1.5 outline-none data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50"
            >
              English
            </ListBoxItem>
            <ListBoxItem
              id="french"
              className="relative rounded px-2 py-1.5 outline-none data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50"
            >
              French
            </ListBoxItem>
            <ListBoxItem
              id="spanish"
              className="relative rounded px-2 py-1.5 outline-none data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50"
            >
              Spanish
            </ListBoxItem>
          </ListBoxSection>
          <Separator className="-mx-1 my-2 h-px bg-border" />
          <ListBoxSection className="space-y-1">
            <Header className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Asian Languages
            </Header>
            <ListBoxItem
              id="hindi"
              className="relative rounded px-2 py-1.5 outline-none data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50"
            >
              Hindi
            </ListBoxItem>
            <ListBoxItem
              id="japanese"
              className="relative rounded px-2 py-1.5 outline-none data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50"
            >
              Japanese
            </ListBoxItem>
            <ListBoxItem
              id="mandarin"
              className="relative rounded px-2 py-1.5 outline-none data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50"
            >
              Mandarin
            </ListBoxItem>
          </ListBoxSection>
          <Separator className="-mx-1 my-2 h-px bg-border" />
          <ListBoxSection className="space-y-1">
            <Header className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Other Languages
            </Header>
            <ListBoxItem
              id="swahili"
              className="relative rounded px-2 py-1.5 outline-none data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50"
            >
              Swahili
            </ListBoxItem>
            <ListBoxItem
              id="arabic"
              className="relative rounded px-2 py-1.5 outline-none data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50"
            >
              Arabic
            </ListBoxItem>
            <ListBoxItem
              id="russian"
              className="relative rounded px-2 py-1.5 outline-none data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50"
            >
              Russian
            </ListBoxItem>
          </ListBoxSection>
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

