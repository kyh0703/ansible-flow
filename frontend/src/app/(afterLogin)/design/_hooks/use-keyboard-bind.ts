import { useRemove, useSelect, useShortcut } from '.'

export function useKeyboardBind() {
  const { getSelectedAll } = useSelect()
  const { removeSelectedNodes } = useRemove()

  useShortcut(['Meta+a', 'Control+a'], getSelectedAll)
  useShortcut(['Delete'], removeSelectedNodes)
}
