"use client"

import { useState } from "react"

import { Label } from "@/registry/primitives/label"
import { Slider } from "@/registry/primitives/slider"

export default function SliderPriceRangeDemo() {
  const minPrice = 5
  const maxPrice = 1240
  const [value, setValue] = useState([minPrice, maxPrice])

  const formatPrice = (price: number) => {
    return price === maxPrice ? `$${price.toLocaleString()}+` : `$${price.toLocaleString()}`
  }

  return (
    <div className="w-full max-w-xs *:not-first:mt-3">
      <Label className="tabular-nums">
        From {formatPrice(value[0])} to {formatPrice(value[1])}
      </Label>
      <Slider
        aria-label="Price range slider"
        max={maxPrice}
        min={minPrice}
        onValueChange={setValue}
        value={value}
      />
    </div>
  )
}
