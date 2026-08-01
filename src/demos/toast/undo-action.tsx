"use client"

import { Button } from "@/registry/primitives/button"
import { toast } from "sonner"

export default function ToastUndoActionDemo() {
  const handleProfileUpdate = () => {
    toast.success("Profile updated", {
      description: "Your changes have been saved successfully.",
      action: {
        label: "Undo",
        onClick: () => {
          toast.info("Changes reverted", {
            description: "Your profile has been restored to previous state."
          })
        }
      }
    })
  }

  return (
    <Button variant="outline" onClick={handleProfileUpdate}>
      Save Changes
    </Button>
  )
}
