import { Badge } from "@/registry/primitives/badge"
import { Spinner } from "@/registry/primitives/spinner"

export default function SpinnerBadgeDemo() {
  return (
    <div className="flex items-center">
      <Badge>
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
    </div>
  )
}
