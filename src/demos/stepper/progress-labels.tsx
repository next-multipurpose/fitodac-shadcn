import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperTitle,
  StepperTrigger,
} from "@/registry/components/stepper"
import { CheckIcon, LoaderCircleIcon } from "lucide-react"

const steps = [
  { title: "User Details" },
  { title: "Payment Info" },
  { title: "Auth OTP" },
  { title: "Preview Form" },
]

export default function StepperProgressLabelsDemo() {
  return (
    <Stepper
      defaultValue={2}
      indicators={{
        completed: <CheckIcon className="size-3.5" />,
        loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
      }}
      className="w-full max-w-lg space-y-8"
    >
      <StepperNav className="gap-3">
        {steps.map((step, index) => (
          <StepperItem
            key={step.title}
            step={index + 1}
            className="relative flex-1 items-start"
          >
            <StepperTrigger className="flex grow flex-col items-start justify-center gap-3">
              <StepperIndicator>{index + 1}</StepperIndicator>
              <StepperTitle className="text-start font-semibold group-data-[state=inactive]/step:text-muted-foreground">
                {step.title}
              </StepperTitle>
            </StepperTrigger>
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="text-sm">
        {steps.map((step, index) => (
          <StepperContent
            key={step.title}
            value={index + 1}
            className="flex items-center justify-center"
          >
            {step.title} content
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  )
}
