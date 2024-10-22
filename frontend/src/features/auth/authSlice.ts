import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '../../services/api'

// Update the User interface to include the role
interface User {
  id: string
  username: string
  role: string
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.login(username, password)
      return { token: response.token, user: response.user }
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error as { response?: { data?: unknown } }
        return rejectWithValue(errorResponse.response?.data || 'Login failed')
      }
      return rejectWithValue('An unknown error occurred inside auth login (authSlice.ts file)')
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  api.logout()
})

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await api.register(username, password)
      return user
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error as { response?: { data?: unknown } }
        return rejectWithValue(errorResponse.response?.data || 'Register failed')
      }
      return rejectWithValue('An unknown error occurred inside auth Register (authSlice.ts file)')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null as User | null,
    token: null as string | null,
    error: null as string | null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.token = action.payload.token
        state.user = action.payload.user
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload as User
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
  },
})

export default authSlice.reducer
