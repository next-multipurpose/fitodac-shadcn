import { Badge } from "@/registry/primitives/badge"

export function BadgeVariantsDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary">Secondary</Badge>
    </div>
  )
}
