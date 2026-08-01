import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react"

import { Badge } from "@/registry/primitives/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/primitives/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/primitives/tooltip"

export default function TabsIconTooltipsDemo() {
  return (
    <Tabs defaultValue="tab-1">
      <TabsList className="h-auto!">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TabsTrigger className="px-4 py-3" value="tab-1">
                  <HouseIcon aria-hidden="true" size={16} />
                </TabsTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              Overview
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TabsTrigger className="group p-3" value="tab-2">
                  <span className="relative">
                    <PanelsTopLeftIcon aria-hidden="true" size={16} />
                    <Badge className="border-background absolute -top-2.5 left-full size-4 -translate-x-1.5 px-0.5 text-[10px]/[.875rem] transition-opacity group-data-[state=inactive]:opacity-50">
                      3
                    </Badge>
                  </span>
                </TabsTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              Projects
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TabsTrigger className="p-3 py-3" value="tab-3">
                  <BoxIcon aria-hidden="true" size={16} />
                </TabsTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              Packages
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TabsList>
      <div className="bg-muted rounded-lg p-3">
        <TabsContent value="tab-1">
          <p className="text-xs">Overview content</p>
        </TabsContent>
        <TabsContent value="tab-2">
          <p className="text-xs">Analytics content</p>
        </TabsContent>
        <TabsContent value="tab-3">
          <p className="text-xs">Reports content</p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
