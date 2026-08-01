"use client";

import { Label } from "@/registry/primitives/label";
import { RadioGroup, RadioGroupItem } from "@/registry/primitives/radio-group";

export default function RadioGroupBasicDemo() {
  return (
    <RadioGroup defaultValue="monthly">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="monthly" id="r1" />
        <Label htmlFor="r1">Monthly</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="quarterly" id="r2" />
        <Label htmlFor="r2">Quarterly</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="yearly" id="r3" />
        <Label htmlFor="r3">Yearly</Label>
      </div>
    </RadioGroup>
  );
}

