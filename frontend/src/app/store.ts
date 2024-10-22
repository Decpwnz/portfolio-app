import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import contactReducer from '../features/contact/contactSlice'
import contactSubmissionsReducer from '../features/contactSubmissions/contactSubmissionsSlice'
import projectsReducer from '../features/projects/projectsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    projects: projectsReducer,
    contactSubmissions: contactSubmissionsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
