import { Progress } from "@/registry/primitives/progress"

export default function ProgressInlinePercentageDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Progress value={75} className="bg-green-500/20 [&>div]:bg-green-500" />
      <span className="text-muted-foreground text-sm">75%</span>
    </div>
  )
}
