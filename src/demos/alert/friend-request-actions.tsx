import { Alert, AlertDescription } from "@/registry/primitives/alert"
import { Button } from "@/registry/primitives/button"
import { CheckIcon, XIcon } from "lucide-react"

export default function AlertFriendRequestActionsDemo() {
  return (
    <Alert className="grid-cols-[auto_1fr_auto]! items-center">
      <AlertDescription>A friend request has been sent.</AlertDescription>
      <div className="flex gap-2">
        <Button variant="outline" size="icon-sm" className="rounded-full">
          <CheckIcon />
        </Button>
        <Button variant="destructive" size="icon-sm" className="rounded-full">
          <XIcon />
        </Button>
      </div>
    </Alert>
  )
}
