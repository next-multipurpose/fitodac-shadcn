import { Alert, AlertTitle } from "@/registry/primitives/alert"
import { TriangleAlert } from "lucide-react"

export default function AlertWarningIconColorDemo() {
  return (
    <Alert>
      <TriangleAlert className="size-4 text-amber-600!" />
      <AlertTitle>Hey! You are about to exceed your data limit.</AlertTitle>
    </Alert>
  )
}
