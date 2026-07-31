"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/primitives/carousel"

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
]

export default function CarouselVerticalDemo() {
  return (
    <div className="py-10">
      <Carousel
        orientation="vertical"
        className="w-full max-w-xs"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="-mt-1 h-[400px]">
          {images.map((src, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
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
    </div>
  )
}
