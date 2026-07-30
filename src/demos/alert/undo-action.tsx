import { Alert, AlertDescription } from "@/registry/primitives/alert"
import { Button } from "@/registry/primitives/button"
import { CheckCircle2Icon } from "lucide-react"

export default function AlertUndoActionDemo() {
  return (
    <Alert className="grid-cols-[auto_1fr_auto]! items-center">
      <CheckCircle2Icon className="size-4 shrink-0 translate-y-0! text-green-600!" />
      <AlertDescription>All the files have been moved.</AlertDescription>
      <Button variant="outline" size="sm">
        Undo
      </Button>
    </Alert>
  )
}
