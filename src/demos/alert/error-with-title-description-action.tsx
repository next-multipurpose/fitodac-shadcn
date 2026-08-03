import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/primitives/alert"
import { Button } from "@/registry/primitives/button"
import { XCircleIcon } from "lucide-react"

export default function ErrorWithTitleDescriptionActionDemo() {
  return (
    <Alert
      variant="destructive"
      className="grid-cols-[auto_1fr_auto]! items-center"
    >
      <XCircleIcon />
      <div className="flex flex-col gap-0.5">
        <AlertTitle>Unable to save changes</AlertTitle>
        <AlertDescription>
          Check the highlighted fields and try again.
        </AlertDescription>
      </div>
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
