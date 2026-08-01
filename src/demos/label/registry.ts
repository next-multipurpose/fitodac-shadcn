import type { DemoEntry } from "@/demos/types"

import LabelCharacterCountDemo from "./character-count"
import LabelHelperTextDemo from "./helper-text"
import LabelInlineEditDemo from "./inline-edit"
import LabelLiveStatusDemo from "./live-status"
import LabelOptionalDemo from "./optional"
import LabelRequiredDemo from "./required"
import LabelStatusBadgeDemo from "./status-badge"
import LabelTooltipDemo from "./tooltip"

export const labelDemos: DemoEntry[] = [
  {
    name: "required",
    title: "Required label",
    component: LabelRequiredDemo,
    componentSlug: "label",
    sourcePath: "src/demos/label/required.tsx",
    registryDependencies: ["field", "input"],
  },
  {
    name: "optional",
    title: "Optional label",
    component: LabelOptionalDemo,
    componentSlug: "label",
    sourcePath: "src/demos/label/optional.tsx",
    registryDependencies: ["field", "input"],
  },
  {
    name: "tooltip",
    title: "Label with tooltip",
    component: LabelTooltipDemo,
    componentSlug: "label",
    sourcePath: "src/demos/label/tooltip.tsx",
    registryDependencies: ["field", "input", "tooltip"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "status-badge",
    title: "Label with status badge",
    component: LabelStatusBadgeDemo,
    componentSlug: "label",
    sourcePath: "src/demos/label/status-badge.tsx",
    registryDependencies: ["badge", "field", "input"],
  },
  {
    name: "character-count",
    title: "Character count",
    component: LabelCharacterCountDemo,
    componentSlug: "label",
    sourcePath: "src/demos/label/character-count.tsx",
    registryDependencies: ["field", "textarea"],
  },
  {
    name: "helper-text",
    title: "Label with helper text",
    component: LabelHelperTextDemo,
    componentSlug: "label",
    sourcePath: "src/demos/label/helper-text.tsx",
    registryDependencies: ["field", "input"],
  },
  {
    name: "inline-edit",
    title: "Inline edit label",
    component: LabelInlineEditDemo,
    componentSlug: "label",
    sourcePath: "src/demos/label/inline-edit.tsx",
    registryDependencies: ["button", "field", "input"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "live-status",
    title: "Live status label",
    component: LabelLiveStatusDemo,
    componentSlug: "label",
    sourcePath: "src/demos/label/live-status.tsx",
    registryDependencies: ["field", "input"],
  },
]
