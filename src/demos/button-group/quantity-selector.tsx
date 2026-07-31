"use client"

import { useState, type ChangeEvent } from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/registry/primitives/button"
import { ButtonGroup } from "@/registry/primitives/button-group"
import { Input } from "@/registry/primitives/input"

export default function ButtonGroupQuantitySelectorDemo() {
  const [value, setValue] = useState<number>(1)

  const handleIncrement = () => setValue((prev) => prev + 1)
  const handleDecrement = () => setValue((prev) => (prev > 1 ? prev - 1 : 1))

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10)
    if (!isNaN(newValue) && newValue > 0) {
      setValue(newValue)
    } else if (e.target.value === "") {
      setValue(1)
    }
  }

  return (
    <ButtonGroup aria-label="Quantity selector">
      <Button variant="outline" size="icon" aria-label="Decrease quantity" onClick={handleDecrement}>
        <MinusIcon />
      </Button>
      <Input
        value={value}
        onChange={handleInputChange}
        className="max-w-12 text-center"
        min={1}
      />
      <Button variant="outline" size="icon" aria-label="Increase quantity" onClick={handleIncrement}>
        <PlusIcon />
      </Button>
    </ButtonGroup>
  )
}
