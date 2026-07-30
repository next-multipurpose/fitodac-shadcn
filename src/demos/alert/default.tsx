import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/primitives/alert"

export function AlertDefaultDemo() {
  return (
    <Alert>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        This is a default alert with a title and description.
      </AlertDescription>
    </Alert>
  )
}
