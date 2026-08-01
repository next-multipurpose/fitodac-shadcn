import { HeartIcon } from "lucide-react";

import { Toggle } from "@/registry/primitives/toggle";

export default function ToggleFavoriteDemo() {
  return (
    <Toggle
      aria-label="Toggle heart"
      size="sm"
      variant="outline"
      className="rounded-full data-[state=on]:*:[svg]:fill-destructive data-[state=on]:*:[svg]:stroke-destructive data-[state=on]:bg-transparent">
      <HeartIcon />
    </Toggle>
  );
}
