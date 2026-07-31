import type { DemoEntry } from "./types"

import { accordionDemos } from "./accordion/registry"
import { alertDemos } from "./alert/registry"
import { alertDialogDemos } from "./alert-dialog/registry"
import { autocompleteDemos } from "./autocomplete/registry"
import { avatarDemos } from "./avatar/registry"
import { badgeDemos } from "./badge/registry"
import { buttonDemos } from "./button/registry"

const demoRegistry: Record<string, DemoEntry[]> = {
  accordion: accordionDemos,
  alert: alertDemos,
  "alert-dialog": alertDialogDemos,
  autocomplete: autocompleteDemos,
  avatar: avatarDemos,
  badge: badgeDemos,
  button: buttonDemos,
}

export function getDemosForComponent(slug: string) {
  return demoRegistry[slug] ?? []
}

export type { DemoEntry } from "./types"
