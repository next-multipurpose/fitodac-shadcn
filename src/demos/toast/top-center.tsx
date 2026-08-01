"use client"

import { Button } from "@/registry/primitives/button"
import { toast } from "sonner"

export default function ToastTopCenterDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          position: "top-center",
          action: {
            label: "Undo",
            onClick: () => toast.info("Event creation undone")
          }
        })
      }
    >
      Toast at Top Center
    </Button>
  )
}
