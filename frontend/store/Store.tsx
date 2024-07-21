import { configureStore } from '@reduxjs/toolkit'
import AllSlices from '../slices/AllSlices'

export const makeStore = () => {
  return configureStore({
    reducer: AllSlices
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
