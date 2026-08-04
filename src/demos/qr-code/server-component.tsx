import { QRCode } from "@/registry/components/qr-code/server"

export default function QrCodeServerComponentDemo() {
	return (
		<QRCode
			background="#eee"
			data="https://www.haydenbleasel.com/"
			foreground="#111"
		/>
	)
}
