import { PlusIcon } from "lucide-react"

import { Button } from "@/registry/primitives/button"

export function ButtonSizesDemo() {
  return (
    <div className="grid w-full gap-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button aria-label="Add item (extra small)" size="icon-xs">
          <PlusIcon />
        </Button>
        <Button aria-label="Add item (small)" size="icon-sm">
          <PlusIcon />
        </Button>
        <Button aria-label="Add item" size="icon">
          <PlusIcon />
        </Button>
        <Button aria-label="Add item (large)" size="icon-lg">
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}
