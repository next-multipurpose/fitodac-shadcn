import { Alert, AlertDescription } from "@/registry/primitives/alert"
import { Button } from "@/registry/primitives/button"
import { XIcon } from "lucide-react"

export default function AlertDismissActionDemo() {
  return (
    <Alert className="grid-cols-[auto_1fr_auto]! items-center">
      <AlertDescription>A friend request has been sent.</AlertDescription>
      <Button variant="ghost" size="icon-sm">
        <XIcon />
      </Button>
    </Alert>
  )
}
