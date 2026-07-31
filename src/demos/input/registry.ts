import type { DemoEntry } from "@/demos/types"

import InputWithDescriptionDemo from "./with-description"
import InputErrorStateDemo from "./error-state"
import InputSuccessStateDemo from "./success-state"
import InputCharacterCountDemo from "./character-count"
import InputFloatingLabelDemo from "./floating-label"
import InputHorizontalLabelDemo from "./horizontal-label"
import InputPasswordHintDemo from "./password-hint"
import InputPasswordStrengthDemo from "./password-strength"
import InputMinimalDemo from "./minimal"
import InputWithButtonDemo from "./with-button"
import InputRoundedDemo from "./rounded"

export const inputDemos: DemoEntry[] = [
  {
    name: "with-description",
    title: "With description",
    component: InputWithDescriptionDemo,
    componentSlug: "input",
    sourcePath: "src/demos/input/with-description.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "error-state",
    title: "Error state",
    component: InputErrorStateDemo,
    componentSlug: "input",
    sourcePath: "src/demos/input/error-state.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "success-state",
    title: "Success state",
    component: InputSuccessStateDemo,
    componentSlug: "input",
    sourcePath: "src/demos/input/success-state.tsx",
    registryDependencies: ["field"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "character-count",
    title: "Character count",
    component: InputCharacterCountDemo,
    componentSlug: "input",
    sourcePath: "src/demos/input/character-count.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "floating-label",
    title: "Floating label",
    component: InputFloatingLabelDemo,
    componentSlug: "input",
    sourcePath: "src/demos/input/floating-label.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "horizontal-label",
    title: "Horizontal label",
    component: InputHorizontalLabelDemo,
    componentSlug: "input",
    sourcePath: "src/demos/input/horizontal-label.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "password-hint",
    title: "Password hint",
    component: InputPasswordHintDemo,
    componentSlug: "input",
    sourcePath: "src/demos/input/password-hint.tsx",
    registryDependencies: ["field"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "password-strength",
    title: "Password strength",
    component: InputPasswordStrengthDemo,
    componentSlug: "input",
    sourcePath: "src/demos/input/password-strength.tsx",
    registryDependencies: ["label"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "minimal",
    title: "Minimal input",
    component: InputMinimalDemo,
    componentSlug: "input",
    sourcePath: "src/demos/input/minimal.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "with-button",
    title: "Input with button",
    component: InputWithButtonDemo,
    componentSlug: "input",
    sourcePath: "src/demos/input/with-button.tsx",
    registryDependencies: ["button", "label"],
  },
  {
    name: "rounded",
    title: "Rounded input",
    component: InputRoundedDemo,
    componentSlug: "input",
    sourcePath: "src/demos/input/rounded.tsx",
    registryDependencies: ["label"],
  },
]
