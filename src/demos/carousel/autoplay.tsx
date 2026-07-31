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

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
]

export default function CarouselAutoplayDemo() {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    const interval = window.setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => window.clearInterval(interval)
  }, [api])

  return (
    <Carousel setApi={setApi} className="w-full max-w-xs" opts={{ loop: true }}>
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
  )
}
