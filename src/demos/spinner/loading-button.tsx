import { Button } from "@/registry/primitives/button"
import { Spinner } from "@/registry/primitives/spinner"

export default function SpinnerLoadingButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
    </div>
  )
}
