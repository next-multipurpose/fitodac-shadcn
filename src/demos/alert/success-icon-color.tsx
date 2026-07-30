import { Alert, AlertTitle } from "@/registry/primitives/alert"
import { CheckCircle2Icon } from "lucide-react"

export default function AlertSuccessIconColorDemo() {
  return (
    <Alert>
      <CheckCircle2Icon className="text-green-600! size-4" />
      <AlertTitle>Payment successful</AlertTitle>
    </Alert>
  )
}
