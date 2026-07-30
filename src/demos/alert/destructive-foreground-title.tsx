import { Alert, AlertTitle } from "@/registry/primitives/alert"
import { XCircleIcon } from "lucide-react"

export default function AlertDestructiveForegroundTitleDemo() {
  return (
    <Alert variant="destructive">
      <XCircleIcon className="size-4" />
      <AlertTitle className="text-foreground">Unable to process your payment.</AlertTitle>
    </Alert>
  )
}
