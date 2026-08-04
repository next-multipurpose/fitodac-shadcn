import { QRCode } from "@/registry/components/qr-code"

export default function QrCodeStylingDemo() {
	return (
		<QRCode
			className="size-48 rounded border bg-white p-4 shadow-xs"
			data="https://www.haydenbleasel.com/"
		/>
	)
}
