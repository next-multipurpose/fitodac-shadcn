"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/primitives/carousel"

const testimonials = [
  {
    quote: "This is an amazing product!",
    author: "John Doe",
    role: "CEO",
  },
  {
    quote: "Highly recommended to everyone.",
    author: "Jane Smith",
    role: "Designer",
  },
  {
    quote: "Best service I've ever used.",
    author: "Bob Johnson",
    role: "Developer",
  },
]

export default function CarouselTestimonialsDemo() {
  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.author}>
            <div className="rounded-lg border p-6">
              <blockquote className="mb-4 text-lg">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
