"use client"

import { useState } from "react"
import { Rating } from "@/registry/components/rating"

export default function RatingEditableDemo() {
  const [rating, setRating] = useState(3.5)

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-4">
      <Rating rating={rating} onRatingChange={setRating} editable />
      <p className="text-sm text-muted-foreground">
        Your rating:{" "}
        <span className="font-semibold text-foreground">
          {rating.toFixed(1)}
        </span>{" "}
        / 5
      </p>
    </div>
  )
}
