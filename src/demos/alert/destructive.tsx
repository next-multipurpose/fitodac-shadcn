import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/primitives/alert"

export function AlertDestructiveDemo() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Unable to save changes</AlertTitle>
      <AlertDescription>
        Check the highlighted fields and try again.
      </AlertDescription>
    </Alert>
  )
}
