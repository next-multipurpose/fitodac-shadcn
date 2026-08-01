import { Italic } from "lucide-react";

import { Toggle } from "@/registry/primitives/toggle";

export default function ToggleOutlineIconDemo() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  );
}
