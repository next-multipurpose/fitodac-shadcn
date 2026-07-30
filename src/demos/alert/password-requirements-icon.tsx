import { Alert, AlertDescription, AlertTitle } from "@/registry/primitives/alert"
import { AlertCircleIcon } from "lucide-react"

export default function AlertPasswordRequirementsIconDemo() {
  return (
    <Alert>
      <AlertCircleIcon className="text-destructive! size-4" />
      <AlertTitle>Password does not meet requirements:</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc text-sm">
          <li>Minimum 8 characters</li>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
        </ul>
      </AlertDescription>
    </Alert>
  )
}
