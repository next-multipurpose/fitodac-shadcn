"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/registry/primitives/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/registry/primitives/dropdown-menu"

type Theme = "light" | "dark" | "system"

export default function DropdownMenuThemeSelectorDemo() {
  const [theme, setTheme] = useState<Theme>("system")

  // For demo purposes, we'll simulate system preference as "light"
  const systemPreference = "light"
  const displayTheme = theme === "system" ? systemPreference : theme

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Select theme" size="icon" variant="outline">
            {displayTheme === "light" && <SunIcon aria-hidden="true" className="size-4" />}
            {displayTheme === "dark" && <MoonIcon aria-hidden="true" className="size-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-32">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <SunIcon aria-hidden="true" className="opacity-60" className="size-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <MoonIcon aria-hidden="true" className="opacity-60" className="size-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <MonitorIcon aria-hidden="true" className="opacity-60" className="size-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
