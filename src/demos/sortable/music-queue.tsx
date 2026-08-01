"use client"

import { useState } from "react"
import { Badge } from "@/registry/primitives/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/primitives/card"
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/registry/components/sortable"
import { GripVerticalIcon, ListMusicIcon, MusicIcon } from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  plays: string
  active?: boolean
}

const defaultTracks: Track[] = [
  {
    id: "1",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    duration: "4:03",
    plays: "1.2B",
    active: true,
  },
  {
    id: "2",
    title: "Digital Love",
    artist: "Daft Punk",
    album: "Discovery",
    duration: "4:58",
    plays: "845M",
  },
  {
    id: "3",
    title: "Starlight",
    artist: "Muse",
    album: "Black Holes",
    duration: "3:59",
    plays: "720M",
  },
  {
    id: "4",
    title: "Take On Me",
    artist: "a-ha",
    album: "Hunting High and Low",
    duration: "3:48",
    plays: "1.8B",
  },
  {
    id: "5",
    title: "Blue Monday",
    artist: "New Order",
    album: "Power, Corruption",
    duration: "7:29",
    plays: "530M",
  },
]

export default function SortableMusicQueueDemo() {
  const [tracks, setTracks] = useState<Track[]>(defaultTracks)

  return (
    <Card className="mx-auto w-full max-w-md shadow-none">
      <CardHeader>
        <CardTitle>Queue</CardTitle>
        <CardAction>
          <Badge variant="outline">
            <ListMusicIcon className="size-3" />
            Playlist
          </Badge>
        </CardAction>
        <CardDescription>{tracks.length} tracks</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Sortable
          value={tracks}
          onValueChange={setTracks}
          getItemValue={(item) => item.id}
          strategy="vertical"
          className="space-y-0.5 px-6 pb-6"
        >
          {tracks.map((track) => (
            <SortableItem key={track.id} value={track.id}>
              <div className="group flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2.5 transition-colors hover:bg-accent/50">
                <SortableItemHandle className="text-muted-foreground hover:text-foreground">
                  <GripVerticalIcon className="size-4" />
                </SortableItemHandle>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                  <MusicIcon className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-medium ${track.active ? "text-primary" : ""}`}
                  >
                    {track.title}
                    {track.active && (
                      <Badge
                        variant="outline"
                        className="ms-1.5 border-primary/20 bg-primary/10 px-1.5 py-0 align-middle text-[10px] text-primary"
                      >
                        Playing
                      </Badge>
                    )}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {track.artist} &middot; {track.album}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden text-xs text-muted-foreground tabular-nums sm:inline">
                    {track.plays}
                  </span>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {track.duration}
                  </span>
                </div>
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </CardContent>
    </Card>
  )
}
