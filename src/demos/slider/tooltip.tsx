import { Slider } from "@/registry/primitives/slider"

export default function SliderTooltipDemo() {
  return (
    <div className="w-full max-w-xs">
      <div>
        <span
          aria-hidden="true"
          className="text-muted-foreground mb-3 flex w-full items-center justify-between gap-2 text-xs font-medium">
          <span>Low</span>
          <span>High</span>
        </span>
        <Slider
          aria-label="Slider with labels and tooltip"
          defaultValue={[50]}
          showTooltip
          step={10}
        />
      </div>
    </div>
  )
}
