import { readFile, mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

const srcPath = path.join("src", "styles", "global.css")
const distDir = "dist"
const distPath = path.join(distDir, "styles.css")

const css = await readFile(srcPath, "utf8")
const lines = css.split(/\r?\n/)

const nextLines = lines
  .filter((line) => !line.trim().startsWith("@source "))
  .reduce(
    (acc, line) => {
      acc.push(line)
      if (line.trim() === '@import "shadcn/tailwind.css";') {
        acc.push("")
        acc.push('@source "./**/*.{js,jsx}";')
      }
      return acc
    },
    []
  )

await mkdir(distDir, { recursive: true })
await writeFile(distPath, nextLines.join("\n"), "utf8")
