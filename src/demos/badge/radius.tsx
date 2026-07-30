import { Badge } from "@/registry/primitives/badge"

export function BadgeRadiusDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <Badge radius="default">Default radius</Badge>
      <Badge radius="full">Full radius</Badge>
    </div>
  )
}
