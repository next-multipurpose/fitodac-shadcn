import { Badge } from "@/registry/primitives/badge";

export default function BadgeErrorStatusDemo() {
  return (
    <Badge className="gap-1.5" variant="outline">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-red-500" />
      Build Error
    </Badge>
  );
}
