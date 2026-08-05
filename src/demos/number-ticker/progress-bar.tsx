"use client"

import { useEffect, useState } from "react"
import { NumberTicker } from "@/registry/components/number-ticker"

export function NumberTickerProgressBarDemo() {
	const [score, setScore] = useState(87)
	useEffect(() => {
		const id = setInterval(
			() => setScore((v) => Math.floor(Math.random() * 13) + 87),
			3500
		)
		return () => clearInterval(id)
	}, [])

	const progress = Math.min(score, 100)

	return (
		<div className="flex flex-col items-center gap-4">
			<p className="text-xs text-muted-foreground">Quiz Score</p>
			<div className="w-full max-w-48">
				<div className="h-2 w-full rounded-full bg-muted">
					<div
						className="h-full rounded-full bg-primary transition-all duration-500"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>
			<div className="flex items-baseline gap-1">
				<NumberTicker
					value={score}
					suffix="%"
					pad={3}
					className="text-4xl font-extrabold text-primary tabular-nums"
				/>
			</div>
			<p className="text-xs text-muted-foreground">passing: 60%</p>
		</div>
	)
}
