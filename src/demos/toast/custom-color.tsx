"use client"

import type { CSSProperties } from "react"
import { Button } from "@/registry/primitives/button"
import { toast } from "sonner"

export default function ToastCustomColorDemo() {
  const handlePasswordChange = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 2000)
      }),
      {
        style: {
          '--normal-bg': 'var(--info)',
          '--normal-text': 'white',
          '--normal-border': 'var(--info)'
        } as CSSProperties,
        loading: "Changing password...",
        success: "Password changed successfully",
        error: "Failed to change password. Please try again."
      }
    )
  }

  return (
    <Button variant="outline" onClick={handlePasswordChange}>
      Custom Color
    </Button>
  )
}
