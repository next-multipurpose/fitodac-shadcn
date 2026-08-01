import type { DemoEntry } from "@/demos/types"

import MapBasicDemo from "./basic"
import MapClustersDemo from "./clusters"
import MapControlledViewportDemo from "./controlled-viewport"
import MapControlsDemo from "./controls"
import MapCustomStyleDemo from "./custom-style"
import MapDraggableMarkerDemo from "./draggable-marker"
import MapLayerMarkersDemo from "./layer-markers"
import MapMarkersDemo from "./markers"
import MapOsrmRouteDemo from "./osrm-route"
import MapRichPopupDemo from "./rich-popup"
import MapRouteDemo from "./route"
import MapStandalonePopupDemo from "./standalone-popup"

export const mapDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic map",
    component: MapBasicDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/basic.tsx",
  },
  {
    name: "controlled-viewport",
    title: "Controlled viewport",
    component: MapControlledViewportDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/controlled-viewport.tsx",
  },
  {
    name: "custom-style",
    title: "Custom map styles",
    component: MapCustomStyleDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/custom-style.tsx",
  },
  {
    name: "controls",
    title: "Map controls",
    component: MapControlsDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/controls.tsx",
  },
  {
    name: "markers",
    title: "Markers and tooltips",
    component: MapMarkersDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/markers.tsx",
  },
  {
    name: "rich-popup",
    title: "Rich marker popups",
    component: MapRichPopupDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/rich-popup.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "draggable-marker",
    title: "Draggable marker",
    component: MapDraggableMarkerDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/draggable-marker.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "standalone-popup",
    title: "Standalone popup",
    component: MapStandalonePopupDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/standalone-popup.tsx",
    registryDependencies: ["button"],
  },
  {
    name: "route",
    title: "Map route",
    component: MapRouteDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/route.tsx",
  },
  {
    name: "osrm-route",
    title: "OSRM route alternatives",
    component: MapOsrmRouteDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/osrm-route.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "clusters",
    title: "Clustered markers",
    component: MapClustersDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/clusters.tsx",
  },
  {
    name: "layer-markers",
    title: "Layer-based markers",
    component: MapLayerMarkersDemo,
    componentSlug: "map",
    sourcePath: "src/demos/map/layer-markers.tsx",
  },
]
