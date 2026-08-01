"use client"

import { Button } from "@/registry/primitives/button"
import { toast } from "sonner"

export default function ToastPromiseErrorDemo() {
  const sync = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Sync failed")), 2000)
  )

  const handleSyncError = () => {
    toast.promise(sync, {
      loading: "Syncing data...",
      success: "Data synced successfully",
      error: "Failed to sync data"
    })
  }

  return (
    <Button variant="outline" onClick={handleSyncError}>
      Sync Error
    </Button>
  )
}
