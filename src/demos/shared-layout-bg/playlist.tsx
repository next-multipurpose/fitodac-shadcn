"use client"

import { Music, Pause, Play, SkipBack, SkipForward } from "lucide-react"
import { useState } from "react"

import { SharedLayoutBg } from "@/registry/components/shared-layout-bg"

const tracks = [
	{ id: "1", title: "Midnight Sun", artist: "Luna Moth", duration: "3:42" },
	{
		id: "2",
		title: "Paper Planes",
		artist: "The Cartographers",
		duration: "4:15",
	},
	{
		id: "3",
		title: "Velvet Hours",
		artist: "Cassette Dream",
		duration: "3:28",
	},
	{
		id: "4",
		title: "Northern Lights",
		artist: "Echo Valley",
		duration: "5:01",
	},
	{ id: "5", title: "Copper Wires", artist: "The Static", duration: "2:56" },
]

export function SharedLayoutBgPlaylistDemo() {
	const [playingId, setPlayingId] = useState("1")
	const [isPlaying, setIsPlaying] = useState(true)

	const current = tracks.find((t) => t.id === playingId) ?? tracks[0]

	return (
		<div className="flex w-full max-w-sm flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
						<Music className="h-5 w-5 text-muted-foreground" />
					</div>
					<div>
						<p className="text-sm font-medium text-foreground">
							{current.title}
						</p>
						<p className="text-xs text-muted-foreground">{current.artist}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<SkipBack className="h-4 w-4 text-muted-foreground" />
					<button
						type="button"
						onClick={() => setIsPlaying(!isPlaying)}
						className="rounded-full p-2 text-foreground hover:bg-accent"
					>
						{isPlaying ? (
							<Pause className="h-4 w-4" />
						) : (
							<Play className="h-4 w-4" />
						)}
					</button>
					<SkipForward className="h-4 w-4 text-muted-foreground" />
				</div>
			</div>

			<SharedLayoutBg
				as="ul"
				pillClassName="rounded-lg bg-violet-500/15"
				inset={12}
			>
				{tracks.map((track) => {
					const isActive = playingId === track.id
					return (
						<li key={track.id}>
							<button
								type="button"
								onClick={() => setPlayingId(track.id)}
								className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left outline-none"
							>
								<span className="flex h-5 w-5 items-center justify-center text-xs font-medium text-muted-foreground/60">
									{isActive ? (
										<span
											className={
												isPlaying
													? "h-2 w-2 rounded-full bg-violet-500"
													: "h-2 w-2 rounded-full bg-violet-500/40"
											}
										/>
									) : (
										track.id
									)}
								</span>
								<div className="flex-1">
									<p
										className={
											isActive
												? "text-sm font-medium text-violet-500"
												: "text-sm font-medium text-foreground"
										}
									>
										{track.title}
									</p>
									<p className="text-xs text-muted-foreground">
										{track.artist}
									</p>
								</div>
								<span className="text-xs text-muted-foreground/50">
									{track.duration}
								</span>
							</button>
						</li>
					)
				})}
			</SharedLayoutBg>
		</div>
	)
}
