import type { DemoEntry } from "@/demos/types"

import AccordionDefaultDemo from "./default"
import AccordionPlusToggleDemo from "./plus-toggle"
import AccordionLeftChevronDemo from "./left-chevron"
import AccordionLeftPlusToggleDemo from "./left-plus-toggle"
import AccordionLeadingIconsDemo from "./leading-icons"
import AccordionSubtitlesDemo from "./subtitles"
import AccordionIconSubtitlesDemo from "./icon-subtitles"
import AccordionBorderedCardsDemo from "./bordered-cards"
import AccordionBorderedLeftChevronDemo from "./bordered-left-chevron"
import AccordionConnectedCardsDemo from "./connected-cards"
import AccordionNestedCollapsiblesDemo from "./nested-collapsibles"
import AccordionHighlightedOpenDemo from "./highlighted-open"

export const accordionDemos: DemoEntry[] = [
  {
    name: "default",
    title: "Default",
    component: AccordionDefaultDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/default.tsx",
  },
  {
    name: "plus-toggle",
    title: "Plus toggle",
    component: AccordionPlusToggleDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/plus-toggle.tsx",
  },
  {
    name: "left-chevron",
    title: "Left chevron",
    component: AccordionLeftChevronDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/left-chevron.tsx",
  },
  {
    name: "left-plus-toggle",
    title: "Left plus toggle",
    component: AccordionLeftPlusToggleDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/left-plus-toggle.tsx",
  },
  {
    name: "leading-icons",
    title: "Leading icons",
    component: AccordionLeadingIconsDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/leading-icons.tsx",
  },
  {
    name: "subtitles",
    title: "Subtitles",
    component: AccordionSubtitlesDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/subtitles.tsx",
  },
  {
    name: "icon-subtitles",
    title: "Icons and subtitles",
    component: AccordionIconSubtitlesDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/icon-subtitles.tsx",
  },
  {
    name: "bordered-cards",
    title: "Bordered cards",
    component: AccordionBorderedCardsDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/bordered-cards.tsx",
  },
  {
    name: "bordered-left-chevron",
    title: "Bordered with left chevron",
    component: AccordionBorderedLeftChevronDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/bordered-left-chevron.tsx",
  },
  {
    name: "connected-cards",
    title: "Connected cards",
    component: AccordionConnectedCardsDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/connected-cards.tsx",
  },
  {
    name: "nested-collapsibles",
    title: "Nested collapsibles",
    component: AccordionNestedCollapsiblesDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/nested-collapsibles.tsx",
    registryDependencies: ["collapsible"],
  },
  {
    name: "highlighted-open",
    title: "Highlighted open item",
    component: AccordionHighlightedOpenDemo,
    componentSlug: "accordion",
    sourcePath: "src/demos/accordion/highlighted-open.tsx",
  },
]
