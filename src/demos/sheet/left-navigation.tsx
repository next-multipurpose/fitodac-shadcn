"use client"

import { Button } from "@/registry/primitives/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/registry/primitives/sheet"

export default function SheetLeftNavigationDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Navigate through different sections of the application.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
