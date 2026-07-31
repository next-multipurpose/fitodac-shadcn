import { ButtonGroup } from "@/registry/primitives/button-group"
import { Input } from "@/registry/primitives/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/primitives/select"

const CURRENCIES = [
  {
    value: "$",
    label: "US Dollar",
  },
  {
    value: "€",
    label: "Euro",
  },
  {
    value: "£",
    label: "British Pound",
  },
]

export default function ButtonGroupCurrencyInputDemo() {
  return (
    <ButtonGroup>
      <Select defaultValue="$">
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent position="popper" className="min-w-0">
          <SelectGroup>
            {CURRENCIES.map((currency) => (
              <SelectItem key={currency.value} value={currency.value}>
                {currency.value}{" "}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input placeholder="10.00" pattern="[0-9]*" className="max-w-24" />
    </ButtonGroup>
  )
}
