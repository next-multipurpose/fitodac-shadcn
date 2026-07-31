import type { DemoEntry } from "@/demos/types"

import InputOTPAlphanumericDemo from "./alphanumeric"
import InputOTPDigitsOnlyDemo from "./digits-only"
import InputOTPFourDigitPinDemo from "./four-digit-pin"
import InputOTPMultiSeparatorDemo from "./multi-separator"
import InputOTPSimpleDemo from "./simple"
import InputOTPVerificationCardDemo from "./verification-card"

export const inputOtpDemos: DemoEntry[] = [
  {
    name: "simple",
    title: "Simple OTP",
    component: InputOTPSimpleDemo,
    componentSlug: "input-otp",
    sourcePath: "src/demos/input-otp/simple.tsx",
    registryDependencies: ["field", "input-otp"],
  },
  {
    name: "digits-only",
    title: "Digits only",
    component: InputOTPDigitsOnlyDemo,
    componentSlug: "input-otp",
    sourcePath: "src/demos/input-otp/digits-only.tsx",
    registryDependencies: ["field", "input-otp"],
    dependencies: ["input-otp@^1.4.2"],
  },
  {
    name: "multi-separator",
    title: "Multi-separator",
    component: InputOTPMultiSeparatorDemo,
    componentSlug: "input-otp",
    sourcePath: "src/demos/input-otp/multi-separator.tsx",
    registryDependencies: ["field", "input-otp"],
  },
  {
    name: "alphanumeric",
    title: "Alphanumeric OTP",
    component: InputOTPAlphanumericDemo,
    componentSlug: "input-otp",
    sourcePath: "src/demos/input-otp/alphanumeric.tsx",
    registryDependencies: ["field", "input-otp"],
    dependencies: ["input-otp@^1.4.2"],
  },
  {
    name: "four-digit-pin",
    title: "4-digit PIN",
    component: InputOTPFourDigitPinDemo,
    componentSlug: "input-otp",
    sourcePath: "src/demos/input-otp/four-digit-pin.tsx",
    registryDependencies: ["field", "input-otp"],
    dependencies: ["input-otp@^1.4.2"],
  },
  {
    name: "verification-card",
    title: "Verification card",
    component: InputOTPVerificationCardDemo,
    componentSlug: "input-otp",
    sourcePath: "src/demos/input-otp/verification-card.tsx",
    registryDependencies: ["button", "card", "field", "input-otp"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
