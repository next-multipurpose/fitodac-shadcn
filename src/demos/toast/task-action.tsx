"use client"

import { Button } from "@/registry/primitives/button"
import { toast } from "sonner"

export default function ToastTaskActionDemo() {
  const handleMultipleActions = () => {
    toast("Task completed", {
      duration: 4000,
      action: {
        label: "View Tasks",
        onClick: () => {
          toast.info("Opening task list...")
        }
      }
    })
  }

  return (
    <Button variant="outline" onClick={handleMultipleActions}>
      Complete Task
    </Button>
  )
}
