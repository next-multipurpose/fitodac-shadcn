import { BoltIcon, ChevronDownIcon, CopyPlusIcon, FilesIcon, Layers2Icon } from "lucide-react"

import { Button } from "@/registry/primitives/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/registry/primitives/dropdown-menu"

export default function DropdownMenuIconsDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Menu with icons
          <ChevronDownIcon aria-hidden="true" className="-me-1 opacity-60" className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <CopyPlusIcon aria-hidden="true" className="opacity-60" className="size-4" />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BoltIcon aria-hidden="true" className="opacity-60" className="size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Layers2Icon aria-hidden="true" className="opacity-60" className="size-4" />
          Group
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FilesIcon aria-hidden="true" className="opacity-60" className="size-4" />
          Clone
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
