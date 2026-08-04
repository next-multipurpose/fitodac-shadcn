import { QRCode } from "@/registry/components/qr-code"
import type { ComponentProps } from "react"

const robustnessOptions: ComponentProps<typeof QRCode>["robustness"][] = [
	"L",
	"M",
	"Q",
	"H",
]

export default function QrCodeRobustnessDemo() {
	return (
		<div className="grid grid-cols-4 gap-4">
			{robustnessOptions.map((robustness) => (
				<div className="flex flex-col items-center gap-2" key={robustness}>
					<QRCode
						data="https://www.haydenbleasel.com/"
						robustness={robustness}
					/>
					<p className="text-sm font-medium text-muted-foreground">
						{robustness}
					</p>
				</div>
			))}
		</div>
	)
}
