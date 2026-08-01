import { Map, MapControls } from "@/registry/components/map"

export default function MapControlsDemo() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-xl border">
      <Map center={[2.3522, 48.8566]} zoom={11} theme="light">
        <MapControls
          position="bottom-right"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />
      </Map>
    </div>
  )
}
