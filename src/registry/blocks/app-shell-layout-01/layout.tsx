"use client"

import Image from "next/image"
import type { ReactNode } from "react"
import {
  Activity,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Copy,
  CreditCard,
  Ellipsis,
  ExternalLink,
  HelpCircle,
  House,
  Layers3,
  LogOut,
  Moon,
  Monitor,
  PanelLeft,
  Palette,
  Settings,
  ShieldCheck,
  Star,
  Sun,
  Trash2,
  User,
  Users,
  Zap,
} from "lucide-react"

import { Avatar } from "@/registry/primitives/avatar"
import { Badge } from "@/registry/primitives/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/primitives/breadcrumb"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/registry/primitives/sidebar"
import { cn } from "@/lib/utils"

const platformItems = [
  { label: "Overview", icon: House, active: true },
  {
    label: "Pipelines",
    icon: Zap,
    children: ["Build Runs", "Deployments", "Release Gates"],
    defaultOpen: true,
  },
  {
    label: "Infrastructure",
    icon: Layers3,
    children: ["Clusters", "Namespaces", "Storage Volumes"],
  },
  { label: "Observability", icon: Activity, badge: "14" },
  { label: "Security", icon: ShieldCheck },
]

const resources = [
  { label: "API Gateway", color: "bg-emerald-500", badge: "Prod" },
  { label: "ML Pipeline", color: "bg-violet-500" },
  { label: "Database", color: "bg-blue-500", badge: "US-East" },
  { label: "CDN", color: "bg-amber-500" },
  { label: "Authentication", color: "bg-rose-500" },
]

function BrandMark({ letter = "U", className }: { letter?: string; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-[7px] bg-neutral-900 text-[13px] font-semibold text-white",
        className
      )}
      aria-hidden="true"
    >
      {letter}
    </span>
  )
}

function WorkspaceSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="z-40">
        <details className="group/workspace relative">
          <SidebarMenuButton
            asChild
            size="lg"
            className="h-9 gap-2 rounded-lg p-2 group-open/workspace:bg-sidebar-accent group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-1!"
          >
            <summary aria-label="Switch workspace" className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <BrandMark />
              <span className="sidebar-label font-semibold group-data-[collapsible=icon]:hidden">Acme Inc.</span>
              <Ellipsis className="ml-auto size-4 opacity-60 group-data-[collapsible=icon]:hidden" />
            </summary>
          </SidebarMenuButton>
          <div role="menu" aria-label="Switch workspace" className="absolute top-[calc(100%+4px)] left-0 z-50 w-[239px] rounded-lg border bg-popover p-1 text-popover-foreground shadow-md">
            <div className="px-2 py-1.5 text-xs text-muted-foreground">Workspaces</div>
            {[
              { label: "Acme Inc.", letter: "U", tone: "bg-neutral-900" },
              { label: "Keenthemes", letter: "K", tone: "bg-blue-500" },
              { label: "Metronic", letter: "M", tone: "bg-rose-500" },
            ].map((workspace) => (
              <button key={workspace.label} role="menuitem" className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
                <BrandMark letter={workspace.letter} className={workspace.tone} />
                <span>{workspace.label}</span>
                {workspace.label === "ReUI" ? <Check className="ml-auto size-4" /> : null}
              </button>
            ))}
            <div className="-mx-1 my-1 h-px bg-border" />
            <button role="menuitem" className="flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
              <span className="flex size-6 items-center justify-center rounded-md border"><CirclePlus className="size-4" /></span>
              <span className="grid text-left"><span>New Workspace</span><span className="text-xs text-muted-foreground">Collaborate with others.</span></span>
            </button>
          </div>
        </details>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function PlatformNavigation() {
  return (
    <SidebarGroup className="p-2">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {platformItems.map((item) => {
            const Icon = item.icon

            return (
              <SidebarMenuItem key={item.label}>
                {item.children ? (
                  <details className="group/nav" open={item.defaultOpen}>
                    <SidebarMenuButton asChild className="h-8">
                      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <Icon />
                        <span className="sidebar-label">{item.label}</span>
                        <ChevronRight className="ml-auto opacity-60 group-open/nav:hidden" />
                        <ChevronDown className="ml-auto hidden opacity-60 group-open/nav:block" />
                      </summary>
                    </SidebarMenuButton>
                    <SidebarMenuSub className="gap-0 border-0 py-0 pl-4">
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child}>
                          <SidebarMenuSubButton href="#" isActive={child === "Deployments"} className="h-8 px-2">
                            <span>{child}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </details>
                ) : (
                  <SidebarMenuButton asChild isActive={item.active} tooltip={item.label} className="h-8">
                    <a href="#">
                      <Icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                )}
                {item.badge ? (
                  <SidebarMenuBadge className="right-2 rounded-md border border-emerald-600/15 bg-emerald-500/10 px-1.5 text-[11px] font-normal text-emerald-700 group-data-[collapsible=icon]:hidden">
                    {item.badge}
                  </SidebarMenuBadge>
                ) : null}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function ResourceActions({ label, index }: { label: string; index: number }) {
  return (
    <details name="resource-actions" className="group/action">
      <SidebarMenuAction asChild showOnHover className="top-1.5 right-1.5 group-open/action:bg-sidebar-accent max-md:opacity-100">
        <summary aria-label={`Actions for ${label}`} className="cursor-pointer list-none [&::-webkit-details-marker]:hidden"><Ellipsis /></summary>
      </SidebarMenuAction>
      <div
        role="menu"
        aria-label={`Actions for ${label}`}
        style={{ top: `${417 + index * 33}px` }}
        className="fixed left-[247px] z-50 w-40 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md max-md:right-2 max-md:left-auto"
      >
        <div className="px-2 py-1.5 text-xs text-muted-foreground">Actions</div>
        <NativeMenuItem icon={ExternalLink}>Details</NativeMenuItem>
        <NativeMenuItem icon={Copy}>Copy Link</NativeMenuItem>
        <NativeMenuItem icon={Star}>Pin to Favorites</NativeMenuItem>
        <div className="-mx-1 my-1 h-px bg-border" />
        <NativeMenuItem icon={Trash2} destructive>Remove</NativeMenuItem>
      </div>
    </details>
  )
}

function ResourceNavigation() {
  return (
    <SidebarGroup className="p-2">
      <details className="native-collapsible-section group/resources" open>
        <SidebarGroupLabel asChild>
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="sidebar-label">Resources</span>
            <ChevronRight className="ml-auto group-open/resources:hidden" />
            <ChevronDown className="ml-auto hidden group-open/resources:block" />
          </summary>
        </SidebarGroupLabel>
        <div className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <SidebarMenu>
              {resources.map((resource, index) => (
                <SidebarMenuItem key={resource.label}>
                  <SidebarMenuButton asChild className="h-[33px] pr-8">
                    <a href="#">
                      <span className={cn("size-1.5 rounded-full", resource.color)} />
                      <span>{resource.label}</span>
                      {resource.badge ? (
                        <Badge variant="outline" className="h-4 rounded px-1 text-[10px] font-normal">
                          {resource.badge}
                        </Badge>
                      ) : null}
                    </a>
                  </SidebarMenuButton>
                  <ResourceActions label={resource.label} index={index} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
      </details>
    </SidebarGroup>
  )
}

function NativeMenuItem({ icon: Icon, children, shortcut, destructive = false }: { icon: typeof User; children: ReactNode; shortcut?: string; destructive?: boolean }) {
  return (
    <button role="menuitem" className={cn("flex h-7 w-full items-center gap-2 rounded-md px-2 text-sm hover:bg-accent", destructive && "text-destructive hover:bg-destructive/10")}>
      <Icon className="size-4" />
      <span>{children}</span>
      {shortcut ? <span className="ml-auto text-xs tracking-widest text-muted-foreground">{shortcut}</span> : null}
    </button>
  )
}

function UserMenu() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="z-40">
        <details className="group/user-menu relative">
          <SidebarMenuButton asChild size="lg" className="h-[38px] shrink-0 border border-border bg-background p-1.5 shadow-sm shadow-black/5 group-open/user-menu:bg-accent group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:justify-center">
            <summary aria-label="Open user menu" className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <Avatar className="size-6 rounded-md transition-all group-data-[collapsible=icon]:size-7">
                <Image src="/nick-bold.jpg" alt="Nick Bold" width={48} height={48} className="size-full rounded-md object-cover" />
              </Avatar>
              <span className="sidebar-label min-w-0 flex-1 truncate text-left font-semibold group-data-[collapsible=icon]:hidden">Nick Bold</span>
              <Ellipsis className="ml-auto size-4 opacity-50 group-data-[collapsible=icon]:hidden" />
            </summary>
          </SidebarMenuButton>
          <div role="menu" aria-label="Open user menu" className="absolute bottom-0 left-[calc(100%+8px)] z-50 w-60 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md max-md:right-0 max-md:bottom-[46px] max-md:left-auto">
            <div className="flex gap-2 p-1.5">
              <Avatar className="size-8 rounded-md">
                <Image src="/nick-bold.jpg" alt="Nick Bold" width={48} height={48} className="size-full rounded-md object-cover" />
              </Avatar>
              <span className="grid min-w-0 leading-tight">
                <span className="truncate font-semibold">Nick Bold</span>
                <span className="truncate text-xs text-muted-foreground">nick@reui.io</span>
              </span>
            </div>
            <div className="-mx-1 my-1 h-px bg-border" />
            <NativeMenuItem icon={User} shortcut="⇧⌘P">Profile</NativeMenuItem>
            <NativeMenuItem icon={CreditCard}>Billing &amp; Usage</NativeMenuItem>
            <NativeMenuItem icon={Settings} shortcut="⌘,">Preferences</NativeMenuItem>
            <div className="-mx-1 my-1 h-px bg-border" />
            <NativeMenuItem icon={HelpCircle}>Help &amp; Support</NativeMenuItem>
            <NativeMenuItem icon={BookOpen}>API Reference</NativeMenuItem>
            <div className="-mx-1 my-1 h-px bg-border" />
            <div className="flex h-7 items-center gap-2 px-2 text-sm">
              <Palette className="size-4" />
              <span>Theme</span>
              <span className="ml-auto flex items-center gap-0.5">
                <span className="flex size-6 items-center justify-center rounded-md"><Sun className="size-4" /></span>
                <span className="flex size-6 items-center justify-center rounded-md"><Moon className="size-4" /></span>
                <span className="flex size-6 items-center justify-center rounded-md bg-accent"><Monitor className="size-4" /></span>
              </span>
            </div>
            <div className="-mx-1 my-1 h-px bg-border" />
            <NativeMenuItem icon={LogOut} shortcut="⇧⌘Q">Sign Out</NativeMenuItem>
          </div>
        </details>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-2"><WorkspaceSwitcher /></SidebarHeader>
      <SidebarContent className="scrollbar-none">
        <PlatformNavigation />
        <ResourceNavigation />
      </SidebarContent>
      <SidebarFooter className="gap-4 p-2 pb-3">
        <SidebarMenu className="gap-0">
          {[
            { label: "Settings", icon: Settings },
            { label: "Invite Team", icon: Users },
            { label: "Documentation", icon: BookOpen },
          ].map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild size="sm" tooltip={item.label}>
                <a href="#"><item.icon /><span>{item.label}</span></a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}

function MobileSidebar() {
  return (
    <div className="mobile-sidebar fixed inset-0 z-50 hidden md:hidden" aria-label="Mobile sidebar">
      <label htmlFor="mobile-sidebar-toggle" className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" aria-label="Close sidebar" />
      <aside className="relative flex h-svh w-72 flex-col border-r bg-sidebar text-sidebar-foreground shadow-xl">
        <SidebarHeader className="p-2"><WorkspaceSwitcher /></SidebarHeader>
        <SidebarContent className="scrollbar-none">
          <PlatformNavigation />
          <ResourceNavigation />
        </SidebarContent>
        <SidebarFooter className="gap-4 p-2 pb-3">
          <SidebarMenu className="gap-0">
            {[
              { label: "Settings", icon: Settings },
              { label: "Invite Team", icon: Users },
              { label: "Documentation", icon: BookOpen },
            ].map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild size="sm"><a href="#"><item.icon /><span>{item.label}</span></a></SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <UserMenu />
        </SidebarFooter>
      </aside>
    </div>
  )
}

function SidebarCollapseControl() {
  return (
    <label
      htmlFor="sidebar-native-toggle"
      role="button"
      tabIndex={0}
      className="sidebar-collapse-control group/collapse fixed top-1/2 z-30 hidden h-12 w-7 -translate-y-1/2 cursor-pointer items-center text-muted-foreground transition-[left,color] hover:text-foreground md:flex"
      aria-label="Collapse sidebar"
    >
      <span className="collapse-rail absolute inset-y-0 left-2 w-px rounded-full bg-border transition-opacity group-hover/collapse:opacity-0" />
      <span className="absolute left-0 hidden size-5 items-center justify-center rounded-md bg-background shadow-sm ring-1 ring-border group-hover/collapse:flex">
        <ChevronLeft className="collapse-icon size-3.5" />
        <ChevronRight className="expand-icon hidden size-3.5" />
      </span>
      <span role="tooltip" className="pointer-events-none absolute left-7 rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-sm transition-opacity group-hover/collapse:opacity-100">
        <span className="collapse-tooltip">Collapse</span>
        <span className="expand-tooltip hidden">Expand</span>
      </span>
    </label>
  )
}

function PlaceholderPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[10px] border border-dashed border-border/70 bg-muted/20",
        className
      )}
      aria-hidden="true"
    />
  )
}

export default function AppShell() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <MobileSidebar />
      <SidebarCollapseControl />
      <SidebarInset className="h-svh min-w-0 overflow-y-auto">
        <header className="flex h-12 shrink-0 items-center gap-2 px-4">
          <label htmlFor="mobile-sidebar-toggle" role="button" tabIndex={0} aria-label="Toggle Sidebar" className="-ml-2 flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-accent md:hidden">
            <PanelLeft className="size-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </label>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:flex">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col gap-4 px-4 pb-4">
          <div className="grid gap-4 md:grid-cols-3">
            <PlaceholderPanel className="aspect-video" />
            <PlaceholderPanel className="aspect-video" />
            <PlaceholderPanel className="aspect-video" />
          </div>
          <PlaceholderPanel className="min-h-[32rem] flex-1 md:min-h-0" />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
