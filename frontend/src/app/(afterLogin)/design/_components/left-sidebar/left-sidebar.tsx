'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { CustomNodeType } from '@xyflow/react'
import { Circle, Search } from 'lucide-react'
import { useState } from 'react'
import { DragItem } from './drag-item'

const nodeTypes = [{ type: 'start', name: 'Start', icon: Circle }]

export function LeftSidebar() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Accordion type="single" collapsible>
      <div className="bg-background/95 border-border/40 supports-[backdrop-filter]:bg-background/60 flex h-full w-full flex-col border-r backdrop-blur">
        <div className="border-border/40 border-b p-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-muted/50 focus-visible:ring-ring h-8 border-0 pl-9 focus-visible:ring-1"
            />
          </div>
        </div>

        <Tabs defaultValue="components" className="flex flex-1 flex-col">
          <TabsList className="mx-4 mt-2 grid w-full grid-cols-3">
            <TabsTrigger value="components" className="text-xs">
              Components
            </TabsTrigger>
            <TabsTrigger value="layers" className="text-xs">
              Layers
            </TabsTrigger>
            <TabsTrigger value="properties" className="text-xs">
              Properties
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="components"
            className="m-0 flex-1 space-y-0 p-4 pt-4"
          >
            <div className="space-y-2">
              <AccordionItem value="node-types">
                <AccordionTrigger className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Node Types
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {nodeTypes.map((nodeType) => (
                      <DragItem
                        key={nodeType.type}
                        type={nodeType.type as CustomNodeType}
                        icon={nodeType.icon}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          </TabsContent>

          <TabsContent
            value="properties"
            className="m-0 flex-1 space-y-0 p-4 pt-4"
          >
            <div className="space-y-4">
              <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Properties
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-muted-foreground text-xs font-medium">
                    Node Type
                  </label>
                  <Input
                    className="mt-1 h-8"
                    placeholder="Select node..."
                    disabled
                  />
                </div>

                <div>
                  <label className="text-muted-foreground text-xs font-medium">
                    Label
                  </label>
                  <Input
                    className="mt-1 h-8"
                    placeholder="Node label..."
                    disabled
                  />
                </div>

                <Separator />

                <div>
                  <label className="text-muted-foreground text-xs font-medium">
                    Position
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <Input className="h-8" placeholder="X" disabled />
                    <Input className="h-8" placeholder="Y" disabled />
                  </div>
                </div>

                <div>
                  <label className="text-muted-foreground text-xs font-medium">
                    Size
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <Input className="h-8" placeholder="Width" disabled />
                    <Input className="h-8" placeholder="Height" disabled />
                  </div>
                </div>
              </div>

              <div className="text-muted-foreground bg-muted/30 rounded-md p-3 text-xs">
                Select a node to edit its properties
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Accordion>
  )
}
