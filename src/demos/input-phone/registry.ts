import type { DemoEntry } from "@/demos/types"

import InputPhoneDefaultDemo from "./default"
import InputPhoneInlineCountryDemo from "./inline-country"
import InputPhoneContactFormDemo from "./contact-form"

export const inputPhoneDemos: DemoEntry[] = [
  {
    name: "default",
    title: "International phone input",
    component: InputPhoneDefaultDemo,
    componentSlug: "input-phone",
    sourcePath: "src/demos/input-phone/default.tsx",
  },
  {
    name: "inline-country",
    title: "Inline country selector",
    component: InputPhoneInlineCountryDemo,
    componentSlug: "input-phone",
    sourcePath: "src/demos/input-phone/inline-country.tsx",
  },
  {
    name: "contact-form",
    title: "Contact form with phone",
    component: InputPhoneContactFormDemo,
    componentSlug: "input-phone",
    sourcePath: "src/demos/input-phone/contact-form.tsx",
    registryDependencies: ["button", "card", "input", "label"],
  },
]
