"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/primitives/button"
import { Badge } from "@/registry/primitives/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/registry/primitives/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/primitives/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js"
  },
  {
    value: "sveltekit",
    label: "SvelteKit"
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js"
  },
  {
    value: "remix",
    label: "Remix"
  },
  {
    value: "astro",
    label: "Astro"
  },
  {
    value: "gatsby",
    label: "Gatsby"
  }
]

export default function ComboboxMultiSelectDemo() {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([])

  const handleSelect = (currentValue: string) => {
    if (selected.includes(currentValue)) {
      setSelected(selected.filter((s) => s !== currentValue))
    } else {
      setSelected([...selected, currentValue])
    }
  }

  return (
    <div className="w-full max-w-xs">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-10 h-auto">
            <div className="flex gap-1 flex-wrap">
              {selected.length === 0 && (
                <span className="text-muted-foreground">Select frameworks...</span>
              )}
              {selected.map((item) => (
                <Badge variant="secondary" key={item} className="mr-1 mb-1">
                  {frameworks.find((f) => f.value === item)?.label}
                </Badge>
              ))}
            </div>
            <ChevronsUpDown className="opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={() => handleSelect(framework.value)}>
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        selected.includes(framework.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

