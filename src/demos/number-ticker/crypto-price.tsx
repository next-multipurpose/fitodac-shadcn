"use client"

import { DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { NumberTicker } from "@/registry/components/number-ticker"

export function NumberTickerCryptoPriceDemo() {
	const [price, setPrice] = useState(63428.47)
	useEffect(() => {
		const id = setInterval(
			() =>
				setPrice((v) => {
					const delta = (Math.random() - 0.5) * 200
					const next = v + delta
					return Math.round(next * 100) / 100
				}),
			1800
		)
		return () => clearInterval(id)
	}, [])
	return (
		<div className="flex flex-col items-center gap-2">
			<p className="text-xs text-muted-foreground">BTC / USD</p>
			<div className="flex items-center gap-1">
				<DollarSign className="h-5 w-5 text-muted-foreground" />
				<NumberTicker
					value={price}
					prefix=""
					suffix=""
					className="text-3xl font-bold text-foreground tabular-nums"
					digitClassName="text-[#10b981]"
					format={(n) => n.toFixed(2)}
					blur
				/>
			</div>
		</div>
	)
}
