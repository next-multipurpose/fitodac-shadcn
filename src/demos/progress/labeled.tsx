"use client"

import { Progress } from "@/registry/primitives/progress"
import { Label } from "@/registry/primitives/label"

export default function ProgressLabeledDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="progress">Upload Progress</Label>
        <span className="text-muted-foreground text-sm">75%</span>
      </div>
      <Progress id="progress" value={75} />
    </div>
  )
}

