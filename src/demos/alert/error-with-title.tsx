import { Alert, AlertTitle } from "@/registry/primitives/alert"
import { XCircleIcon } from "lucide-react"

export default function ErrorWithTitleDemo() {
  return (
    <Alert variant="destructive">
      <XCircleIcon />
      <AlertTitle>There was an error processing your request.</AlertTitle>
    </Alert>
  )
}
