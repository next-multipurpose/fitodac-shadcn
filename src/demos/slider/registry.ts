import type { DemoEntry } from "@/demos/types"

import SliderControlledDemo from "./controlled"
import SliderEmojiFeedbackDemo from "./emoji-feedback"
import SliderEqualizerDemo from "./equalizer"
import SliderExperienceRatingDemo from "./experience-rating"
import SliderOutputDemo from "./output"
import SliderPriceRangeDemo from "./price-range"
import SliderReferenceLabelsDemo from "./reference-labels"
import SliderStepperControlsDemo from "./stepper-controls"
import SliderTicksDemo from "./ticks"
import SliderTooltipDemo from "./tooltip"
import SliderVerticalDemo from "./vertical"
import SliderVerticalRangeDemo from "./vertical-range"
import SliderVolumeDemo from "./volume"

export const sliderDemos: DemoEntry[] = [
  {
    name: "controlled",
    title: "Controlled slider",
    component: SliderControlledDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/controlled.tsx",
  },
  {
    name: "reference-labels",
    title: "Reference labels",
    component: SliderReferenceLabelsDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/reference-labels.tsx",
  },
  {
    name: "ticks",
    title: "Slider with ticks",
    component: SliderTicksDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/ticks.tsx",
    registryDependencies: ["utils"],
  },
  {
    name: "output",
    title: "Slider with output",
    component: SliderOutputDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/output.tsx",
  },
  {
    name: "volume",
    title: "Volume slider",
    component: SliderVolumeDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/volume.tsx",
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "tooltip",
    title: "Slider with tooltip",
    component: SliderTooltipDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/tooltip.tsx",
  },
  {
    name: "experience-rating",
    title: "Experience rating",
    component: SliderExperienceRatingDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/experience-rating.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "stepper-controls",
    title: "Stepper controls",
    component: SliderStepperControlsDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/stepper-controls.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["button", "label"],
  },
  {
    name: "emoji-feedback",
    title: "Emoji feedback",
    component: SliderEmojiFeedbackDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/emoji-feedback.tsx",
  },
  {
    name: "price-range",
    title: "Price range",
    component: SliderPriceRangeDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/price-range.tsx",
    registryDependencies: ["label"],
  },
  {
    name: "vertical",
    title: "Vertical slider",
    component: SliderVerticalDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/vertical.tsx",
  },
  {
    name: "vertical-range",
    title: "Vertical range",
    component: SliderVerticalRangeDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/vertical-range.tsx",
  },
  {
    name: "equalizer",
    title: "Equalizer",
    component: SliderEqualizerDemo,
    componentSlug: "slider",
    sourcePath: "src/demos/slider/equalizer.tsx",
    registryDependencies: ["label"],
  },
]
