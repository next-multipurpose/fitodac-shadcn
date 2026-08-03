import { Alert, AlertTitle } from "@/registry/primitives/alert"
import { Button } from "@/registry/primitives/button"
import { XCircleIcon } from "lucide-react"

export default function ErrorWithTitleActionDemo() {
  return (
    <Alert
      variant="destructive"
      className="grid-cols-[auto_1fr_auto]! items-center"
    >
      <XCircleIcon />
      <AlertTitle>Unable to save changes</AlertTitle>
      <div className="flex shrink-0 gap-2">
        <Button size="sm" variant="destructive">
          Retry
        </Button>
        <Button size="sm" variant="outline">
          Dismiss
        </Button>
      </div>
    </Alert>
  )
}
