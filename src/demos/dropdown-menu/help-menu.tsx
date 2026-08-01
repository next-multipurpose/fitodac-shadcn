import {
  BookIcon,
  InfoIcon,
  LifeBuoyIcon,
  MessageCircleMoreIcon,
} from "lucide-react"

import { Button } from "@/registry/primitives/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"

export default function DropdownMenuHelpDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Open edit menu"
          className="rounded-full shadow-none"
          size="icon"
          variant="ghost"
        >
          <InfoIcon aria-hidden="true" className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        <DropdownMenuLabel>Need help?</DropdownMenuLabel>
        <DropdownMenuItem
          asChild
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
        >
          <a href="#">
            <BookIcon aria-hidden="true" className="opacity-60 size-4" />
            Documentation
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
        >
          <a href="#">
            <LifeBuoyIcon aria-hidden="true" className="opacity-60 size-4" />
            Support
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
        >
          <a href="#">
            <MessageCircleMoreIcon
              aria-hidden="true"
              className="opacity-60 size-4"
            />
            Contact us
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
