"use client"

import { useState } from "react"
import { Map, MapMarker, MarkerContent, MarkerPopup } from "@/registry/components/map"
import { MapPinIcon } from "lucide-react"

export default function MapDraggableMarkerDemo() {
  const [draggableMarker, setDraggableMarker] = useState({
    lng: -73.98,
    lat: 40.75,
  })

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-xl border">
      <Map center={[-73.98, 40.75]} zoom={12} theme="light">
        <MapMarker
          draggable
          longitude={draggableMarker.lng}
          latitude={draggableMarker.lat}
          onDragEnd={(lngLat) => {
            setDraggableMarker({ lng: lngLat.lng, lat: lngLat.lat })
          }}
        >
          <MarkerContent>
            <div className="cursor-move">
              <MapPinIcon
                className="fill-black stroke-white dark:fill-white"
                size={28}
              />
            </div>
          </MarkerContent>
          <MarkerPopup>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Coordinates</p>
              <p className="text-xs text-muted-foreground">
                {draggableMarker.lat.toFixed(4)},{" "}
                {draggableMarker.lng.toFixed(4)}
              </p>
            </div>
          </MarkerPopup>
        </MapMarker>
      </Map>
    </div>
  )
}
