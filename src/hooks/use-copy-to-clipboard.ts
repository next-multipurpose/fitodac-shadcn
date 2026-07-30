"use client"

import * as React from "react"

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number
  onCopy?: () => void
} = {}) {
  const [isCopied, setIsCopied] = React.useState(false)
  const [copyError, setCopyError] = React.useState(false)
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null)

  const copyToClipboard = async (value: string) => {
    setIsCopied(false)
    setCopyError(false)

    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      setCopyError(true)
      return
    }

    if (!value) return

    try {
      await navigator.clipboard.writeText(value)

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
      setIsCopied(true)

      if (onCopy) {
        onCopy()
      }

      if (timeout !== 0) {
        timeoutIdRef.current = setTimeout(() => {
          setIsCopied(false)
          timeoutIdRef.current = null
        }, timeout)
      }
    } catch {
      setIsCopied(false)
      setCopyError(true)
    }
  }

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [])

  return { copyError, copyToClipboard, isCopied }
}
