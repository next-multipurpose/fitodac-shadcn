import {
  BoltIcon,
  ChevronDownIcon,
  CopyPlusIcon,
  FilesIcon,
  Layers2Icon,
  TrashIcon,
} from "lucide-react"

import { Button } from "@/registry/primitives/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"

export default function DropdownMenuGroupedDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Grouped items
          <ChevronDownIcon
            aria-hidden="true"
            className="-me-1 opacity-60 size-4"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CopyPlusIcon aria-hidden="true" className="opacity-60 size-4" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BoltIcon aria-hidden="true" className="opacity-60 size-4" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Layers2Icon aria-hidden="true" className="opacity-60 size-4" />
            Group
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FilesIcon aria-hidden="true" className="opacity-60 size-4" />
            Clone
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <TrashIcon aria-hidden="true" className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
