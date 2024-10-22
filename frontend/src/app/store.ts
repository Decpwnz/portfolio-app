import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import contactReducer from '../features/contact/contactSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
