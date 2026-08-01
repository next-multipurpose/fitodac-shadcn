"use client"

import { Progress } from "@/registry/primitives/progress"
import { useEffect, useState } from "react"

export default function ProgressAnimatedDemo() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-full max-w-sm" />
}
