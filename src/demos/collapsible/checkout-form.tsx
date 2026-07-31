"use client"

import { useId, useState } from "react"
import { ChevronDownIcon, CreditCardIcon } from "lucide-react"

import { Button } from "@/registry/primitives/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/primitives/collapsible"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/primitives/radio-group"
import { Separator } from "@/registry/primitives/separator"
import { Textarea } from "@/registry/primitives/textarea"

const deliveryOptions = [
  {
    value: "standard",
    label: "Standard 3-5 Days",
    description: "Friday, 15 June - Tuesday, 19 June",
    price: "Free",
  },
  {
    value: "express",
    label: "Express",
    description: "Friday, 15 June - Sunday, 17 June",
    price: "$5.00",
  },
  {
    value: "overnight",
    label: "Overnight",
    description: "Tomorrow",
    price: "$10.00",
  },
]

export default function CollapsibleCheckoutFormDemo() {
  const id = useId()
  const [delivery, setDelivery] = useState("standard")

  return (
    <div className="w-full max-w-md space-y-3 rounded-md border py-4">
      <Collapsible defaultOpen className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold">Delivery Address</div>
          <CollapsibleTrigger asChild className="group">
            <Button variant="ghost" size="icon-sm">
              <ChevronDownIcon className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              <span className="sr-only">Toggle delivery address</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="flex flex-col gap-3 px-4 pt-3">
          <div className="space-y-2">
            <Label htmlFor={`${id}-name`}>Full name</Label>
            <Input id={`${id}-name`} placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-address`}>Address</Label>
            <Input id={`${id}-address`} placeholder="123 Main Street" />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-notes`}>Delivery notes</Label>
            <Textarea
              id={`${id}-notes`}
              placeholder="Apartment, access instructions, or other notes"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible defaultOpen className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold">Delivery Method</div>
          <CollapsibleTrigger asChild className="group">
            <Button variant="ghost" size="icon-sm">
              <ChevronDownIcon className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              <span className="sr-only">Toggle delivery method</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="px-4 pt-3">
          <RadioGroup value={delivery} onValueChange={setDelivery}>
            {deliveryOptions.map((option) => (
              <Label
                key={option.value}
                htmlFor={`${id}-${option.value}`}
                className="flex cursor-pointer items-center gap-3 rounded-md border p-3"
              >
                <RadioGroupItem
                  id={`${id}-${option.value}`}
                  value={option.value}
                />
                <span className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">{option.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {option.description}
                  </span>
                </span>
                <span className="text-sm font-medium">{option.price}</span>
              </Label>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CreditCardIcon className="size-4" />
            Payment
          </div>
          <CollapsibleTrigger asChild className="group">
            <Button variant="ghost" size="icon-sm">
              <ChevronDownIcon className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              <span className="sr-only">Toggle payment details</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="grid gap-3 px-4 pt-3">
          <div className="space-y-2">
            <Label htmlFor={`${id}-card-number`}>Card number</Label>
            <Input
              id={`${id}-card-number`}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor={`${id}-expiry`}>Expiry</Label>
              <Input
                id={`${id}-expiry`}
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-cvc`}>CVC</Label>
              <Input
                id={`${id}-cvc`}
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
