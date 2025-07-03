"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible as CollapsiblePrimitive,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function Collapsible() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <CollapsiblePrimitive
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >
      <div className="flex gap-4 justify-between items-center px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="px-4 py-2 font-mono text-sm rounded-md border">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="px-4 py-2 font-mono text-sm rounded-md border">
          @radix-ui/colors
        </div>
        <div className="px-4 py-2 font-mono text-sm rounded-md border">
          @stitches/react
        </div>
      </CollapsibleContent>
    </CollapsiblePrimitive>
  )
}
