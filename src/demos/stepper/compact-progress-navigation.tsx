"use client"

import { useState } from "react"
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperTrigger,
} from "@/registry/components/stepper"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/primitives/button"
import { ArrowLeftIcon } from "lucide-react"

const steps = [1, 2, 3, 4]

export default function StepperCompactProgressNavigationDemo() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="w-full max-w-md">
      <Stepper value={currentStep} onValueChange={setCurrentStep}>
        <StepperNav>
          {steps.map((step) => (
            <StepperItem
              key={step}
              step={step}
              className="flex-1 overflow-hidden transition-all duration-300 first:rounded-s-full last:rounded-e-full"
            >
              <StepperTrigger
                className="w-full flex-col items-start gap-2"
                asChild
              >
                <StepperIndicator className="h-2 w-full rounded-none! bg-border">
                  <span className="sr-only">{step}</span>
                </StepperIndicator>
              </StepperTrigger>
            </StepperItem>
          ))}
        </StepperNav>

        <div className="flex items-center justify-between gap-2.5 py-1">
          <Button
            variant="link"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className={cn(
              "px-0",
              currentStep === 1 && "pointer-events-none opacity-0"
            )}
          >
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>

          <div className="text-sm font-medium">
            <span className="text-foreground">{currentStep}</span>{" "}
            <span className="text-muted-foreground/60">/ {steps.length}</span>
          </div>
        </div>

        <StepperPanel className="py-6 text-sm">
          {steps.map((step) => (
            <StepperContent
              className="flex w-full items-center justify-center"
              key={step}
              value={step}
            >
              Step {step} content
            </StepperContent>
          ))}
        </StepperPanel>

        <div className="flex items-center justify-end gap-2.5">
          <Button
            variant="outline"
            onClick={() =>
              setCurrentStep((prev) => Math.min(steps.length, prev + 1))
            }
            disabled={currentStep === steps.length}
          >
            Next
          </Button>
        </div>
      </Stepper>
    </div>
  )
}
