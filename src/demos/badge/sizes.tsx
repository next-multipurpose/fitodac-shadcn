import { Badge } from "@/registry/primitives/badge"

export function BadgeSizesDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <Badge size="xs">Extra small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
      <Badge size="xl">Extra large</Badge>
    </div>
  )
}
