import type { EditMode } from '../store/flow'

export const getCursorClassByEditMode = (mode: EditMode) => {
  switch (mode) {
    case 'grab':
      return 'cursor-grab'
    case 'pointer':
      return 'cursor-crosshair'
    case 'link':
      return 'cursor-default'
    default:
      return 'cursor-auto'
  }
}
