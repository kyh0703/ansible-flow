import type { FitViewOptions, ProOptions, Viewport } from '@xyflow/react'

export const proOptions: ProOptions = {
  account: 'paid-pro',
  hideAttribution: true,
}

export const fitViewOptions: FitViewOptions = {
  minZoom: 0.1,
  maxZoom: 2.0,
}

export const viewPort: Viewport = {
  x: 100,
  y: 100,
  zoom: 2.0,
}
