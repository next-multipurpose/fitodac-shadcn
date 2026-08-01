import { Slider } from "@/registry/primitives/slider"

export default function SliderVerticalRangeDemo() {
  return (
    <div className="flex h-40 justify-center">
      <Slider aria-label="Vertical slider" defaultValue={[2, 7]} max={10} orientation="vertical" />
    </div>
  )
}
