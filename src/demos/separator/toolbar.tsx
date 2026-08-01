import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { Button } from "@/registry/primitives/button"
import { Separator } from "@/registry/primitives/separator"

export default function SeparatorToolbarDemo() {
  return (
    <div className="flex items-center rounded-md border p-1">
      <Button aria-label="Bold" size="icon-sm" variant="ghost">
        <BoldIcon />
      </Button>
      <Button aria-label="Italic" size="icon-sm" variant="ghost">
        <ItalicIcon />
      </Button>
      <Button aria-label="Underline" size="icon-sm" variant="ghost">
        <UnderlineIcon />
      </Button>
      <Separator className="mx-1 h-6" orientation="vertical" />
      <span className="px-2 text-sm text-muted-foreground">Formatting</span>
    </div>
  )
}
