import { Alert, AlertTitle } from "@/registry/primitives/alert"
import { XCircleIcon } from "lucide-react"

export default function AlertDestructiveIconTitleDemo() {
  return (
    <Alert variant="destructive">
      <XCircleIcon className="size-4" />
      <AlertTitle>Unable to process your payment.</AlertTitle>
    </Alert>
  )
}
