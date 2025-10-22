import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/lib/slice/auth/authSlice'
import assessmentSlice  from '@/lib/slice/assessment/assessmentSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      assessment: assessmentSlice,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']