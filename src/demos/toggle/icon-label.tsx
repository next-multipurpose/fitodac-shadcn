import { Italic } from "lucide-react";

import { Toggle } from "@/registry/primitives/toggle";

export default function ToggleIconLabelDemo() {
  return (
    <Toggle aria-label="Toggle italic">
      <Italic />
      Italic
    </Toggle>
  );
}
