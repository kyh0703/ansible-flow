import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { Badge } from '@/shared/ui/badge'
import {
  Undo2,
  Redo2,
  Copy,
  Scissors,
  Clipboard,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Play,
  Save,
  Share2,
  Users,
  Eye,
  Grid3X3,
  MousePointer,
  Move,
  Hand,
} from 'lucide-react'

export function IconToolbar({ flowId: _flowId }: { flowId: number }) {
  return (
    <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2 transform">
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/40 flex items-center gap-1 rounded-lg border p-2 shadow-lg backdrop-blur">
        {/* Selection Tools */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MousePointer className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Hand className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Move className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Edit Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Clipboard Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
            <Scissors className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
            <Clipboard className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* View Controls */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Badge variant="secondary" className="h-6 px-2 text-xs">
            100%
          </Badge>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Utility Tools */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
            <Save className="mr-1 h-4 w-4" />
            Save
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
            <Play className="mr-1 h-4 w-4" />
            Run
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Collaboration */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="border-background flex h-6 w-6 items-center justify-center rounded-full border-2 bg-gradient-to-br from-blue-500 to-blue-600">
              <span className="text-[10px] font-medium text-white">A</span>
            </div>
            <div className="border-background flex h-6 w-6 items-center justify-center rounded-full border-2 bg-gradient-to-br from-green-500 to-green-600">
              <span className="text-[10px] font-medium text-white">B</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Users className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
