import { Field, FieldLabel } from "@/registry/primitives/field";
import { Switch } from "@/registry/primitives/switch";

export default function FieldComponent() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
      <Switch id="2fa" />
    </Field>
  );
}
