import { Progress } from "@/registry/primitives/progress"

export default function ProgressCustomColorDemo() {
  return <Progress value={75} className="bg-yellow-500/20 [&>div]:bg-yellow-500 w-full max-w-sm" />
}
