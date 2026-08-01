import { Slider } from "@/registry/primitives/slider"

export default function SliderVerticalDemo() {
  return (
    <div className="flex h-40 justify-center">
      <Slider aria-label="Vertical slider" defaultValue={[5]} max={10} orientation="vertical" />
    </div>
  )
}
