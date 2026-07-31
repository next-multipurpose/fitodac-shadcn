import type { DemoEntry } from "@/demos/types"

import InputNumericEndButtonsDemo from "./end-buttons"
import InputNumericPlusMinusButtonsDemo from "./plus-minus-buttons"
import InputNumericRoundedEndButtonsDemo from "./rounded-end-buttons"
import InputNumericRoundedPlusMinusButtonsDemo from "./rounded-plus-minus-buttons"

export const inputNumericDemos: DemoEntry[] = [
  {
    name: "plus-minus-buttons",
    title: "Plus/minus buttons",
    component: InputNumericPlusMinusButtonsDemo,
    componentSlug: "input-numeric",
    sourcePath: "src/demos/input-numeric/plus-minus-buttons.tsx",
    registryDependencies: ["field"],
    dependencies: [
      "lucide-react@^0.577.0",
      "react-aria-components@^1.16.0",
    ],
  },
  {
    name: "end-buttons",
    title: "End buttons",
    component: InputNumericEndButtonsDemo,
    componentSlug: "input-numeric",
    sourcePath: "src/demos/input-numeric/end-buttons.tsx",
    registryDependencies: ["field"],
    dependencies: [
      "lucide-react@^0.577.0",
      "react-aria-components@^1.16.0",
    ],
  },
  {
    name: "rounded-end-buttons",
    title: "Rounded end buttons",
    component: InputNumericRoundedEndButtonsDemo,
    componentSlug: "input-numeric",
    sourcePath: "src/demos/input-numeric/rounded-end-buttons.tsx",
    registryDependencies: ["field"],
    dependencies: [
      "lucide-react@^0.577.0",
      "react-aria-components@^1.16.0",
    ],
  },
  {
    name: "rounded-plus-minus-buttons",
    title: "Rounded plus/minus buttons",
    component: InputNumericRoundedPlusMinusButtonsDemo,
    componentSlug: "input-numeric",
    sourcePath: "src/demos/input-numeric/rounded-plus-minus-buttons.tsx",
    registryDependencies: ["field"],
    dependencies: [
      "lucide-react@^0.577.0",
      "react-aria-components@^1.16.0",
    ],
  },
]
