"use client";

import { useId } from "react";

import { Label } from "@/registry/primitives/label";
import { RadioGroup, RadioGroupItem } from "@/registry/primitives/radio-group";

export default function RadioGroupDataCenterRegionDemo() {
  const id = useId();

  const items = [
    { label: "North America", value: "1" },
    { label: "Europe", value: "2" },
    { label: "Asia Pacific", value: "3" }
  ];

  return (
    <fieldset className="space-y-4">
      <legend className="text-foreground text-sm leading-none font-medium">Data center region</legend>
      <RadioGroup className="flex flex-wrap gap-2" defaultValue="1">
        {items.map((item) => (
          <div
            className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-col items-start gap-4 rounded-md border p-3 shadow-xs outline-none"
            key={`${id}-${item.value}`}>
            <div className="flex items-center gap-2">
              <RadioGroupItem
                className="after:absolute after:inset-0"
                id={`${id}-${item.value}`}
                value={item.value}
              />
              <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
