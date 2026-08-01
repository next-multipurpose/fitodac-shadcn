import { Map } from "@/registry/components/map"

export default function MapBasicDemo() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-xl border">
      <Map center={[-74.006, 40.7128]} zoom={12} theme="light" />
    </div>
  )
}
