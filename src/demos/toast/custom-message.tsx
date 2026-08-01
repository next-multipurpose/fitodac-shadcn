"use client"

import { Button } from "@/registry/primitives/button"
import { toast } from "sonner"
import { Avatar, AvatarFallback } from "@/registry/primitives/avatar"

export default function ToastCustomMessageDemo() {
  const handleNotification = () => {
    toast.custom((t) => (
      <div className="flex items-start gap-4 rounded-lg border bg-background p-4 shadow-sm">
        <Avatar className="mt-0.5">
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">New message from Sarah</div>
          <p className="text-muted-foreground text-sm">Hey! Are you available for a quick call?</p>
          <Button className="mt-2" variant="outline" size="sm" onClick={() => toast.dismiss(t)}>
            Reply
          </Button>
        </div>
      </div>
    ))
  }

  return (
    <Button variant="outline" onClick={handleNotification}>
      Custom Toast
    </Button>
  )
}
