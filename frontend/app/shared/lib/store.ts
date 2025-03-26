import { create, type StateCreator } from 'zustand'
import {
  devtools,
  persist,
  type DevtoolsOptions,
  type PersistOptions,
} from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const createStore = <T extends object>(
  initializer: StateCreator<
    T,
    [['zustand/immer', never], ['zustand/devtools', never]]
  >,
  options: DevtoolsOptions,
) =>
  create<T, [['zustand/immer', never], ['zustand/devtools', never]]>(
    immer(devtools(initializer, options)),
  )

export const createPersistStore = <T extends object>(
  initializer: StateCreator<
    T,
    [
      ['zustand/immer', never],
      ['zustand/devtools', never],
      ['zustand/persist', unknown],
    ]
  >,
  options: PersistOptions<T, Partial<T>>,
) =>
  create<
    T,
    [
      ['zustand/immer', never],
      ['zustand/devtools', never],
      ['zustand/persist', unknown],
    ]
  >(immer(devtools(persist(initializer, options), options)))
