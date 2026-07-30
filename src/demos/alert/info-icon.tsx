import { Alert, AlertDescription } from "@/registry/primitives/alert"
import { AlertCircleIcon } from "lucide-react"

export default function AlertInfoIconDemo() {
  return (
    <Alert>
      <AlertCircleIcon className="size-4" />
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  )
}
