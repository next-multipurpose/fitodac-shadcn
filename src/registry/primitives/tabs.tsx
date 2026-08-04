"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"
import { motion, MotionConfig, useReducedMotion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"
import "./tabs/tabs.css"

const indicatorTransition: Transition = {
  type: "spring",
  stiffness: 170,
  damping: 24,
  mass: 1.2,
}

const contentTransition = {
  duration: 0.22,
  ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
}

type TabsContextValue = {
  layoutId: string
  value: string
  reducedMotion: boolean
}

const TabsCtx = React.createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = React.useContext(TabsCtx)
  if (!ctx) throw new Error("Tabs.* must be used inside <Tabs>")
  return ctx
}

function Tabs({
  className,
  orientation = "horizontal",
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const layoutId = React.useId()
  const reduce = useReducedMotion()
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const handleValueChange = React.useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v)
      onValueChange?.(v)
    },
    [isControlled, onValueChange],
  )

  const contextValue = React.useMemo<TabsContextValue>(
    () => ({
      layoutId,
      value: currentValue,
      reducedMotion: !!reduce,
    }),
    [layoutId, currentValue, reduce],
  )

  return (
    <MotionConfig transition={reduce ? { duration: 0 } : indicatorTransition}>
      <TabsCtx.Provider value={contextValue}>
        <TabsPrimitive.Root
          data-slot="tabs"
          data-orientation={orientation}
          orientation={orientation}
          value={isControlled ? controlledValue : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          onValueChange={handleValueChange}
          className={cn(
            "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
            className,
          )}
          {...props}
        >
          <motion.div layoutRoot className="contents">
            {children}
          </motion.div>
        </TabsPrimitive.Root>
      </TabsCtx.Provider>
    </MotionConfig>
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  value: triggerValue,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { layoutId, value: currentValue, reducedMotion } = useTabs()
  const isActive = currentValue === triggerValue

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={triggerValue}
      className={cn(
        "relative isolate inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=horizontal]/tabs:w-full group-data-[orientation=vertical]/tabs:h-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground dark:group-data-[variant=default]/tabs-list:data-[state=active]:border-input",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        "[--tabs-indicator-radius:var(--radius-md)]",
        className,
      )}
      {...props}
    >
      {isActive &&
        (reducedMotion ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 z-[-1] rounded-[var(--tabs-indicator-radius)] bg-[var(--tabs-indicator-bg)] shadow-[var(--tabs-indicator-shadow)] group-data-[variant=line]/tabs-list:hidden dark:bg-[var(--tabs-indicator-bg-dark)] dark:shadow-[var(--tabs-indicator-shadow-dark)]"
          />
        ) : (
          <motion.span
            layoutId={layoutId}
            transition={indicatorTransition}
            aria-hidden="true"
            className="absolute inset-0 z-[-1] rounded-[var(--tabs-indicator-radius)] bg-[var(--tabs-indicator-bg)] shadow-[var(--tabs-indicator-shadow)] group-data-[variant=line]/tabs-list:hidden dark:bg-[var(--tabs-indicator-bg-dark)] dark:shadow-[var(--tabs-indicator-shadow-dark)]"
          />
        ))}
      {children}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  children,
  value: contentValue,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  const { value: currentValue, reducedMotion } = useTabs()
  const isActive = contentValue === currentValue

  const content = reducedMotion ? (
    <div>{children}</div>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
      transition={contentTransition}
    >
      {children}
    </motion.div>
  )

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      value={contentValue}
      className={cn("flex-1 outline-none", className)}
      {...props}
    >
      {content}
    </TabsPrimitive.Content>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
