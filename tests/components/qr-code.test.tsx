import { render, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { QRCode } from "@/registry/components/qr-code"

describe("QRCode", () => {
	it("renders nothing before the QR code is generated", () => {
		const { container } = render(<QRCode data="https://example.com" />)
		expect(container.firstChild).toBeNull()
	})

	it("renders an SVG after generating the QR code", async () => {
		const { container } = render(<QRCode data="https://example.com" />)

		await waitFor(() => {
			const svg = container.querySelector("svg")
			expect(svg).not.toBeNull()
			expect(svg?.getAttribute("xmlns")).toBe("http://www.w3.org/2000/svg")
		})
	})

	it("passes custom foreground and background colors to the generator", async () => {
		const { container } = render(
			<QRCode
				data="https://example.com"
				foreground="#ff0000"
				background="#00ff00"
			/>
		)

		await waitFor(() => {
			const svg = container.querySelector("svg")
			expect(svg).not.toBeNull()
		})
	})

	it("applies custom className to the container", async () => {
		const { container } = render(
			<QRCode data="https://example.com" className="custom-qr" />
		)

		await waitFor(() => {
			expect(container.firstChild).toHaveClass("custom-qr")
		})
	})
})
