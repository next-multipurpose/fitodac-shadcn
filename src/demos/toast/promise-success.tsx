"use client"

import { Button } from "@/registry/primitives/button"
import { toast } from "sonner"

export default function ToastPromiseSuccessDemo() {
  const upload = new Promise<{ name: string }>((resolve) =>
    setTimeout(() => resolve({ name: "document.pdf" }), 2000)
  )

  const handleFileUpload = () => {
    toast.promise(upload, {
      loading: "Uploading file...",
      success: "File uploaded successfully",
      error: "Failed to upload file"
    })
  }

  return (
    <Button variant="outline" onClick={handleFileUpload}>
      Upload File
    </Button>
  )
}
