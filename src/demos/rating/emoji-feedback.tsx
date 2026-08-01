"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

const emojis = [
  { value: 1, emoji: "😞", label: "Terrible" },
  { value: 2, emoji: "😕", label: "Bad" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "😊", label: "Good" },
  { value: 5, emoji: "🤩", label: "Amazing" },
]

export default function RatingEmojiFeedbackDemo() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-3">
      <p className="text-sm font-medium">How was your experience?</p>
      <div className="flex gap-2">
        {emojis.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-label={item.label}
            onClick={() => setSelected(item.value)}
            className={cn(
              "flex size-10 items-center justify-center rounded-lg border-2 text-2xl transition-all",
              selected === item.value
                ? "scale-110 border-border bg-muted"
                : "border-transparent hover:bg-muted"
            )}
          >
            {item.emoji}
          </button>
        ))}
      </div>
      {selected && (
        <p className="text-sm text-muted-foreground">
          {emojis.find((e) => e.value === selected)?.label}
        </p>
      )}
    </div>
  )
}
