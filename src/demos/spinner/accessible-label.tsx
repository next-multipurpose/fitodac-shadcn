import { Spinner } from "@/registry/primitives/spinner"

export default function SpinnerAccessibleLabelDemo() {
  return (
    <div className="flex items-center gap-4">
      <Spinner aria-label="Loading content" />
    </div>
  )
}
