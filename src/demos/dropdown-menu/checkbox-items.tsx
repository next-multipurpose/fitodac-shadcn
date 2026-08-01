"use client"

import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/registry/primitives/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"

type Checked = boolean

export default function DropdownMenuCheckboxItemsDemo() {
  const [nextjs, setNextjs] = useState<Checked>(false)
  const [sveltekit, setSveltekit] = useState<Checked>(true)
  const [astro, setAstro] = useState<Checked>(false)
  const [remix, setRemix] = useState<Checked>(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Checkbox items
          <ChevronDownIcon
            aria-hidden="true"
            className="-me-1 opacity-60 size-4"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem checked={nextjs} onCheckedChange={setNextjs}>
          Next.js
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sveltekit}
          onCheckedChange={setSveltekit}
        >
          SvelteKit
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={remix}
          disabled
          onCheckedChange={setRemix}
        >
          Remix
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={astro} onCheckedChange={setAstro}>
          Astro
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
