import type { DemoEntry } from "@/demos/types"

import InputGroupSearchWithResultsDemo from "./search-with-results"
import InputGroupUrlPrefixTooltipDemo from "./url-prefix-tooltip"
import InputGroupDomainSuffixDemo from "./domain-suffix"
import InputGroupCurrencyAmountDemo from "./currency-amount"
import InputGroupDomainExtensionSelectDemo from "./domain-extension-select"
import InputGroupCopyUrlDemo from "./copy-url"
import InputGroupPasswordVisibilityDemo from "./password-visibility"
import InputGroupCharacterLimitDemo from "./character-limit"
import InputGroupClearableInputDemo from "./clearable-input"
import InputGroupBlockStartAddonDemo from "./block-start-addon"
import InputGroupPhoneCountryCodeDemo from "./phone-country-code"
import InputGroupCreditCardDetailsDemo from "./credit-card-details"
import InputGroupTextareaCharacterCountDemo from "./textarea-character-count"
import InputGroupTextareaActionsDemo from "./textarea-actions"
import InputGroupUrlButtonGroupDemo from "./url-button-group"
import InputGroupFileActionsDemo from "./file-actions"
import InputGroupProjectEditorDemo from "./project-editor"
import InputGroupOrderSearchFilterDemo from "./order-search-filter"
import InputGroupContactSearchActionsDemo from "./contact-search-actions"

export const inputGroupDemos: DemoEntry[] = [
  {
    name: "search-with-results",
    title: "Search with results",
    component: InputGroupSearchWithResultsDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/search-with-results.tsx",
    registryDependencies: ["field"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "url-prefix-tooltip",
    title: "URL prefix and tooltip",
    component: InputGroupUrlPrefixTooltipDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/url-prefix-tooltip.tsx",
    registryDependencies: ["field", "tooltip"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "domain-suffix",
    title: "Domain suffix",
    component: InputGroupDomainSuffixDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/domain-suffix.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "currency-amount",
    title: "Currency amount",
    component: InputGroupCurrencyAmountDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/currency-amount.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "domain-extension-select",
    title: "Domain extension select",
    component: InputGroupDomainExtensionSelectDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/domain-extension-select.tsx",
    registryDependencies: ["field", "select"],
  },
  {
    name: "copy-url",
    title: "Copy URL",
    component: InputGroupCopyUrlDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/copy-url.tsx",
    registryDependencies: ["field", "sonner"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "password-visibility",
    title: "Password visibility",
    component: InputGroupPasswordVisibilityDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/password-visibility.tsx",
    registryDependencies: ["field"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "character-limit",
    title: "Character limit",
    component: InputGroupCharacterLimitDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/character-limit.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "clearable-input",
    title: "Clearable input",
    component: InputGroupClearableInputDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/clearable-input.tsx",
    registryDependencies: ["field"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "block-start-addon",
    title: "Block start addon",
    component: InputGroupBlockStartAddonDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/block-start-addon.tsx",
    registryDependencies: ["field"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "phone-country-code",
    title: "Phone country code",
    component: InputGroupPhoneCountryCodeDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/phone-country-code.tsx",
    registryDependencies: ["field", "dropdown-menu", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "credit-card-details",
    title: "Credit card details",
    component: InputGroupCreditCardDetailsDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/credit-card-details.tsx",
    registryDependencies: ["field", "separator"],
    dependencies: ["lucide-react@^0.577.0", "react-payment-inputs"],
  },
  {
    name: "textarea-character-count",
    title: "Textarea character count",
    component: InputGroupTextareaCharacterCountDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/textarea-character-count.tsx",
    registryDependencies: ["field"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "textarea-actions",
    title: "Textarea actions",
    component: InputGroupTextareaActionsDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/textarea-actions.tsx",
    registryDependencies: ["field"],
  },
  {
    name: "url-button-group",
    title: "URL with button group",
    component: InputGroupUrlButtonGroupDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/url-button-group.tsx",
    registryDependencies: ["field", "button-group"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "file-actions",
    title: "File actions",
    component: InputGroupFileActionsDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/file-actions.tsx",
    registryDependencies: ["field", "dropdown-menu", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "project-editor",
    title: "Project editor",
    component: InputGroupProjectEditorDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/project-editor.tsx",
    registryDependencies: ["field", "dropdown-menu", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "order-search-filter",
    title: "Order search filter",
    component: InputGroupOrderSearchFilterDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/order-search-filter.tsx",
    registryDependencies: ["field", "checkbox", "label", "popover", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
  {
    name: "contact-search-actions",
    title: "Contact search and actions",
    component: InputGroupContactSearchActionsDemo,
    componentSlug: "input-group",
    sourcePath: "src/demos/input-group/contact-search-actions.tsx",
    registryDependencies: ["field", "checkbox", "label", "popover", "dropdown-menu", "button"],
    dependencies: ["lucide-react@^0.577.0"],
  },
]
