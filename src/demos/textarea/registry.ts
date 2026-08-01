import type { DemoEntry } from "@/demos/types"

import TextareaBasicDemo from "./basic"
import TextareaRequiredDemo from "./required"
import TextareaHelperTextDemo from "./helper-text"
import TextareaErrorStateDemo from "./error-state"
import TextareaFormValidationDemo from "./form-validation"
import TextareaOverlappingLabelDemo from "./overlapping-label"
import TextareaAutoGrowDemo from "./auto-grow"
import TextareaCharacterCountDemo from "./character-count"
import TextareaFloatingLabelDemo from "./floating-label"
import TextareaLabelTooltipDemo from "./label-tooltip"
import TextareaAvatarCommentDemo from "./avatar-comment"

export const textareaDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic textarea",
    component: TextareaBasicDemo,
    componentSlug: "textarea",
    sourcePath: "src/demos/textarea/basic.tsx",
    registryDependencies: ["field", "label"],
  },
  {
    name: "required",
    title: "Required textarea",
    component: TextareaRequiredDemo,
    componentSlug: "textarea",
    sourcePath: "src/demos/textarea/required.tsx",
    registryDependencies: ["field", "label"],
  },
  {
    name: "helper-text",
    title: "Textarea with helper text",
    component: TextareaHelperTextDemo,
    componentSlug: "textarea",
    sourcePath: "src/demos/textarea/helper-text.tsx",
    registryDependencies: ["field", "label"],
  },
  {
    name: "error-state",
    title: "Textarea error state",
    component: TextareaErrorStateDemo,
    componentSlug: "textarea",
    sourcePath: "src/demos/textarea/error-state.tsx",
    registryDependencies: ["field", "label"],
  },
  {
    name: "form-validation",
    title: "Textarea form validation",
    component: TextareaFormValidationDemo,
    componentSlug: "textarea",
    sourcePath: "src/demos/textarea/form-validation.tsx",
    dependencies: ["react-hook-form"],
    registryDependencies: ["button", "field", "label"],
  },
  {
    name: "overlapping-label",
    title: "Overlapping label",
    component: TextareaOverlappingLabelDemo,
    componentSlug: "textarea",
    sourcePath: "src/demos/textarea/overlapping-label.tsx",
    registryDependencies: ["field", "label"],
  },
  {
    name: "auto-grow",
    title: "Auto-growing textarea",
    component: TextareaAutoGrowDemo,
    componentSlug: "textarea",
    sourcePath: "src/demos/textarea/auto-grow.tsx",
    registryDependencies: ["field", "label"],
  },
  {
    name: "character-count",
    title: "Character counter",
    component: TextareaCharacterCountDemo,
    componentSlug: "textarea",
    sourcePath: "src/demos/textarea/character-count.tsx",
    registryDependencies: ["field", "label"],
  },
  {
    name: "floating-label",
    title: "Floating label",
    component: TextareaFloatingLabelDemo,
    componentSlug: "textarea",
    sourcePath: "src/demos/textarea/floating-label.tsx",
    registryDependencies: ["field", "label"],
  },
  {
    name: "label-tooltip",
    title: "Label with tooltip",
    component: TextareaLabelTooltipDemo,
    componentSlug: "textarea",
    sourcePath: "src/demos/textarea/label-tooltip.tsx",
    dependencies: ["lucide-react@^0.577.0"],
    registryDependencies: ["field", "label", "tooltip"],
  },
  {
    name: "avatar-comment",
    title: "Avatar comment field",
    component: TextareaAvatarCommentDemo,
    componentSlug: "textarea",
    sourcePath: "src/demos/textarea/avatar-comment.tsx",
    registryDependencies: ["avatar", "field"],
  },
]
