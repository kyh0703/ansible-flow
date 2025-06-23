import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Separator } from '@/shared/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { Card, CardContent } from '@/shared/ui/card'
import {
  Search,
  Plus,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Circle,
  Square,
  Triangle,
  Diamond,
  Zap,
  Database,
  FileText,
} from 'lucide-react'

const nodeTypes = [
  { id: 'input', name: 'Input', icon: Circle, color: 'bg-blue-500' },
  { id: 'default', name: 'Process', icon: Square, color: 'bg-green-500' },
  { id: 'output', name: 'Output', icon: Triangle, color: 'bg-red-500' },
  { id: 'condition', name: 'Condition', icon: Diamond, color: 'bg-yellow-500' },
  { id: 'api', name: 'API Call', icon: Zap, color: 'bg-purple-500' },
  { id: 'database', name: 'Database', icon: Database, color: 'bg-indigo-500' },
  { id: 'document', name: 'Document', icon: FileText, color: 'bg-orange-500' },
]

const mockLayers = [
  { id: '1', name: 'Background', visible: true, locked: false },
  { id: '2', name: 'Main Flow', visible: true, locked: false },
  { id: '3', name: 'Annotations', visible: false, locked: true },
]

export default function LeftSidebar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [layers, setLayers] = useState(mockLayers)

  const toggleLayerVisibility = (id: string) => {
    setLayers(
      layers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer,
      ),
    )
  }

  const toggleLayerLock = (id: string) => {
    setLayers(
      layers.map((layer) =>
        layer.id === id ? { ...layer, locked: !layer.locked } : layer,
      ),
    )
  }

  const filteredNodes = nodeTypes.filter((node) =>
    node.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="bg-background/95 border-border/40 supports-[backdrop-filter]:bg-background/60 flex h-full w-64 flex-col border-r backdrop-blur">
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
            <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
              Node Types
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {filteredNodes.map((node) => (
                <Card
                  key={node.id}
                  className="group hover:border-primary/50 cursor-pointer transition-colors"
                >
                  <CardContent className="flex flex-col items-center gap-2 p-3">
                    <div
                      className={`h-8 w-8 rounded-lg ${node.color} flex items-center justify-center`}
                    >
                      <node.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-center text-xs font-medium">
                      {node.name}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layers" className="m-0 flex-1 space-y-0 p-4 pt-4">
          <div className="space-y-2">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Layers
              </h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-1">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className="hover:bg-muted/50 group flex items-center gap-2 rounded-md p-2"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0"
                    onClick={() => toggleLayerVisibility(layer.id)}
                  >
                    {layer.visible ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="text-muted-foreground h-3 w-3" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0"
                    onClick={() => toggleLayerLock(layer.id)}
                  >
                    {layer.locked ? (
                      <Lock className="text-muted-foreground h-3 w-3" />
                    ) : (
                      <Unlock className="h-3 w-3" />
                    )}
                  </Button>

                  <div className="bg-primary/20 h-3 w-3 flex-shrink-0 rounded" />
                  <span className="flex-1 truncate text-sm">{layer.name}</span>
                </div>
              ))}
            </div>
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
  )
}
