import type { DemoEntry } from "@/demos/types"

import CarouselDefaultDemo from "./default"
import CarouselMultipleItemsDemo from "./multiple-items"
import CarouselDotsDemo from "./dots"
import CarouselAutoplayDemo from "./autoplay"
import CarouselVerticalDemo from "./vertical"
import CarouselCardsDemo from "./cards"
import CarouselTestimonialsDemo from "./testimonials"
import CarouselExternalControlsDemo from "./external-controls"
import CarouselThumbnailsDemo from "./thumbnails"
import CarouselCounterDemo from "./counter"
import CarouselOverlayCaptionDemo from "./overlay-caption"
import CarouselAutoplayProgressDemo from "./autoplay-progress"

export const carouselDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: CarouselDefaultDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/default.tsx",
  },
  {
    name: "multiple-items",
    title: "Multiple items",
    component: CarouselMultipleItemsDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/multiple-items.tsx",
  },
  {
    name: "dots",
    title: "Dot navigation",
    component: CarouselDotsDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/dots.tsx",
  },
  {
    name: "autoplay",
    title: "Autoplay",
    component: CarouselAutoplayDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/autoplay.tsx",
  },
  {
    name: "vertical",
    title: "Vertical",
    component: CarouselVerticalDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/vertical.tsx",
  },
  {
    name: "cards",
    title: "Cards",
    component: CarouselCardsDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/cards.tsx",
    registryDependencies: ["card"],
  },
  {
    name: "testimonials",
    title: "Testimonials",
    component: CarouselTestimonialsDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/testimonials.tsx",
  },
  {
    name: "external-controls",
    title: "External controls",
    component: CarouselExternalControlsDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/external-controls.tsx",
    registryDependencies: ["button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "thumbnails",
    title: "Thumbnails",
    component: CarouselThumbnailsDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/thumbnails.tsx",
  },
  {
    name: "counter",
    title: "Slide counter",
    component: CarouselCounterDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/counter.tsx",
  },
  {
    name: "overlay-caption",
    title: "Overlay caption",
    component: CarouselOverlayCaptionDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/overlay-caption.tsx",
  },
  {
    name: "autoplay-progress",
    title: "Autoplay progress",
    component: CarouselAutoplayProgressDemo,
    componentSlug: "carousel",
    sourcePath: "src/demos/carousel/autoplay-progress.tsx",
  },
]
