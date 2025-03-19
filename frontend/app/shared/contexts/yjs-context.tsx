import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'
import logger from '../utils/logger'

type YjsState = {
  yDoc: Y.Doc
  isConnected: boolean
  isSynced: boolean
}

const YjsContext = createContext<YjsState | undefined>(undefined)

type YjsProviderProps = {
  flowId: number
  baseUrl?: string
} & PropsWithChildren

export default function YjsProvider({
  flowId,
  baseUrl,
  children,
}: YjsProviderProps) {
  const yDocRef = useRef<Y.Doc>(new Y.Doc())
  const startTimeRef = useRef<number>(performance.now())
  const [isConnected, setIsConnected] = useState(false)
  const [isSynced, setIsSynced] = useState(false)

  useEffect(() => {
    if (!baseUrl) {
      throw new Error('[YJS] URL is not defined')
    }

    const yDoc = yDocRef.current
    const provider = new WebsocketProvider(baseUrl, `room/${flowId}`, yDoc)
    yDoc.gc = true
    logger.info('[YJS] Initialized', baseUrl)

    provider.on('status', (event: any) => {
      logger.info('[YJS] Status', yDoc, event.status, new Date())
      if (event.status === 'connected') {
        setIsConnected(true)
      } else {
        setIsConnected(false)
      }
    })

    provider.on('sync', () => {
      // you received the initial content (e.g. the empty paragraph) from the other peers
      const endTime = performance.now()
      const loadTime = ((endTime - startTimeRef.current) / 1000).toFixed(2)

      logger.info(`[YJS] Data synced loadTime ${loadTime}s`, yDoc, new Date())
      setIsSynced(true)
    })

    return () => {
      provider?.destroy()
      yDoc.destroy()
    }
  }, [baseUrl, flowId])

  return (
    <YjsContext.Provider
      value={{ yDoc: yDocRef.current, isConnected, isSynced }}
    >
      {children}
    </YjsContext.Provider>
  )
}

export const useYjs = () => {
  const context = useContext(YjsContext)
  if (!context) {
    throw new Error('useYjs must be used within a YjsProvider')
  }
  return context
}
