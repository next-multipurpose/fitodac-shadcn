import { Alert, AlertTitle } from "@/registry/primitives/alert"
import { CheckCircle2Icon } from "lucide-react"

export default function AlertSuccessColoredDemo() {
  return (
    <Alert className="text-green-600">
      <CheckCircle2Icon className="size-4" />
      <AlertTitle className="text-green-600">Payment successful</AlertTitle>
    </Alert>
  )
}
