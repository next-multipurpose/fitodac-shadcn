import { describe, expect, it } from "vitest"

import { getDemosForComponent } from "@/demos/registry"

const expectedDemoNames = {
  accordion: [
    "default",
    "plus-toggle",
    "left-chevron",
    "left-plus-toggle",
    "leading-icons",
    "subtitles",
    "icon-subtitles",
    "bordered-cards",
    "bordered-left-chevron",
    "connected-cards",
    "nested-collapsibles",
    "highlighted-open",
  ],
  alert: [
    "default",
    "destructive",
    "description-only",
    "info-icon",
    "success-with-description",
    "destructive-icon-title",
    "success-colored",
    "warning-colored",
    "destructive-foreground-title",
    "success-icon-color",
    "warning-icon-color",
    "password-requirements-destructive",
    "password-requirements-icon",
    "password-requirements-partial-success",
    "undo-action",
    "friend-request-actions",
    "dismiss-action",
  ],
  "alert-dialog": [
    "confirm",
    "confirm-icon",
    "fullscreen-product",
    "scrollable-custom",
    "sticky-header",
    "sticky-footer",
    "terms-conditions",
    "newsletter",
    "feedback",
    "otp-verification",
    "sign-in",
    "checkout",
    "change-plan",
    "edit-profile",
    "onboarding",
    "destructive-confirmation",
    "rating-feedback",
    "invite-friends",
  ],
  autocomplete: [
    "basic",
    "controlled-clear",
    "grouped-users",
    "async-search",
    "auto-highlight",
  ],
  avatar: [
    "default",
    "initials-fallback",
    "icon-fallback",
    "online-status",
    "verified-badge",
    "notification-badge",
    "stack",
    "stack-overflow",
    "social-proof",
    "colored-fallback",
    "square",
    "tooltip-stack",
    "tooltip-single",
    "overflow-menu",
    "profile-popover",
    "upload-overlay",
    "loading-overlay",
    "status-ring",
    "profile-label",
    "empty-collaborators",
    "account-menu",
  ],
  badge: ["default", "variants", "sizes", "radius"],
  "mini-calendar": ["default", "controlled", "seven-days", "custom-layout"],
  button: [
    "default",
    "variants",
    "sizes",
    "ripple-effect",
    "responsive-add",
    "destructive-icon",
    "cancel-save",
    "messages-count",
    "keyboard-shortcut",
    "loading-disabled",
    "loading-state",
    "profile-pill",
    "round-icon",
    "notification-badge",
    "copy-feedback",
    "vertical-group",
    "tap-animation",
    "split-dropdown",
    "permissions",
    "merge-options",
    "previous-group",
    "next-group",
    "star-count",
    "like-count",
    "social-icon-buttons",
    "social-outline-buttons",
    "social-filled-buttons",
    "tooltip-icon",
    "ghost-arrow",
    "animated-link",
    "heartbeat",
    "craft-button",
  ],
} as const

describe("modular demo registry", () => {
  it.each(Object.entries(expectedDemoNames))(
    "resolves every %s demo in its preserved order",
    (slug, names) => {
      expect(getDemosForComponent(slug).map((demo) => demo.name)).toEqual(names)
    }
  )

  it("returns an empty array for an unknown slug", () => {
    expect(getDemosForComponent("unknown-component")).toEqual([])
  })

  it("preserves representative metadata and optional dependencies", () => {
    expect(getDemosForComponent("button")[0]).toMatchObject({
      name: "default",
      title: "Default",
      componentSlug: "button",
      sourcePath: "src/demos/button/default.tsx",
    })
    expect(getDemosForComponent("avatar")[2]).toMatchObject({
      name: "icon-fallback",
      dependencies: ["lucide-react@^0.577.0"],
    })
    expect(getDemosForComponent("autocomplete")[2]).toMatchObject({
      name: "grouped-users",
      registryDependencies: ["avatar"],
    })
    expect(getDemosForComponent("avatar")[14]).toMatchObject({
      name: "profile-popover",
      dependencies: ["lucide-react@^0.577.0"],
      registryDependencies: ["button", "popover"],
    })
    expect(getDemosForComponent("alert-dialog")[2]).toMatchObject({
      name: "fullscreen-product",
      componentSlug: "dialog",
      sourcePath: "src/demos/alert-dialog/fullscreen-product.tsx",
    })
  })

  it("resolves mini-calendar demos with the mini-calendar slug and colocated sources", () => {
    expect(getDemosForComponent("mini-calendar")).toMatchObject([
      expect.objectContaining({
        name: "default",
        componentSlug: "mini-calendar",
        sourcePath: "src/demos/mini-calendar/default.tsx",
        registryDependencies: ["mini-calendar"],
      }),
      expect.objectContaining({
        name: "controlled",
        componentSlug: "mini-calendar",
        sourcePath: "src/demos/mini-calendar/controlled.tsx",
        dependencies: ["date-fns"],
        registryDependencies: ["mini-calendar"],
      }),
      expect.objectContaining({
        name: "seven-days",
        componentSlug: "mini-calendar",
        sourcePath: "src/demos/mini-calendar/seven-days.tsx",
        registryDependencies: ["mini-calendar"],
      }),
      expect.objectContaining({
        name: "custom-layout",
        componentSlug: "mini-calendar",
        sourcePath: "src/demos/mini-calendar/custom-layout.tsx",
        dependencies: ["lucide-react@^0.577.0"],
        registryDependencies: ["mini-calendar"],
      }),
    ])
  })
})
