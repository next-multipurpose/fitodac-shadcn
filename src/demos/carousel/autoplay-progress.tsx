"use client"

import { useEffect, useState } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/registry/primitives/carousel"

const AUTOPLAY_DELAY = 4000
const PROGRESS_INTERVAL = 50

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
]

export default function CarouselAutoplayProgressDemo() {
  const [api, setApi] = useState<CarouselApi>()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!api) return

    let elapsed = 0

    const progressInterval = window.setInterval(() => {
      elapsed += PROGRESS_INTERVAL

      if (elapsed >= AUTOPLAY_DELAY) {
        api.scrollNext()
        elapsed = 0
      }

      setProgress((elapsed / AUTOPLAY_DELAY) * 100)
    }, PROGRESS_INTERVAL)

    const handleSelect = () => {
      elapsed = 0
      setProgress(0)
    }

    api.on("select", handleSelect)

    return () => {
      window.clearInterval(progressInterval)
      api.off("select", handleSelect)
    }
  }, [api])

  return (
    <div className="w-full max-w-xs">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={src}>
              <figure>
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/3 rounded-lg object-cover"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-[width] duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
