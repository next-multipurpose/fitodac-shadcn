import { describe, expect, it } from "vitest"

import { carouselDemos } from "@/demos/carousel/registry"
import { getDemosForComponent } from "@/demos/registry"

describe("carousel demo registry", () => {
  it("exposes every Carousel demo through the public registry", () => {
    expect(carouselDemos).toHaveLength(12)
    expect(getDemosForComponent("carousel")).toEqual(carouselDemos)
  })

  it("uses stable, unique names and Carousel source paths", () => {
    const names = carouselDemos.map((demo) => demo.name)

    expect(new Set(names).size).toBe(names.length)
    expect(
      carouselDemos.every(
        (demo) =>
          demo.componentSlug === "carousel" &&
          demo.sourcePath.startsWith("src/demos/carousel/")
      )
    ).toBe(true)
  })
})
