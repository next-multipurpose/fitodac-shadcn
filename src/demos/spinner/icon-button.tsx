import { Button } from "@/registry/primitives/button"
import { Spinner } from "@/registry/primitives/spinner"

export default function SpinnerIconButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button size="icon" variant="destructive" disabled>
        <Spinner />
      </Button>
    </div>
  )
}
