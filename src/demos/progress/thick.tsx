import { Progress } from "@/registry/primitives/progress"

export default function ProgressThickDemo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Progress value={50} className="h-4" />
    </div>
  )
}
