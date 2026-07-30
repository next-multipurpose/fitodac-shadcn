import { Button } from "@/registry/primitives/button";

export default function Component() {
  return (
    <div className="inline-flex items-center gap-2">
      <Button variant="secondary">Cancel</Button>
      <Button>Save</Button>
    </div>
  );
}
