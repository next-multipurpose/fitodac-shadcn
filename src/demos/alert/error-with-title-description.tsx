import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/primitives/alert"
import { XCircleIcon } from "lucide-react"

export default function ErrorWithTitleDescriptionDemo() {
  return (
    <Alert variant="destructive">
      <XCircleIcon />
      <AlertTitle>Unable to save changes</AlertTitle>
      <AlertDescription>
        Check the highlighted fields and try again.
      </AlertDescription>
    </Alert>
  )
}
