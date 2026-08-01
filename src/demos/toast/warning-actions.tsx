"use client"

import { Button } from "@/registry/primitives/button"
import { toast } from "sonner"

export default function ToastWarningActionsDemo() {
  const handleLogout = () => {
    toast.warning("Are you sure you want to logout?", {
      duration: 5000,
      action: {
        label: "Logout",
        onClick: () => {
          toast.success("Logged out successfully", {
            description: "You have been signed out of your account."
          })
        }
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.info("Logout cancelled")
        }
      }
    })
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  )
}
