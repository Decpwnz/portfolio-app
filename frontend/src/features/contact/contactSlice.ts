import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '../../services/api'

interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ContactState {
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: ContactState = {
  loading: false,
  error: null,
  success: false,
}

export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData: ContactFormData, { rejectWithValue }) => {
    try {
      const response = await api.submitContactForm(formData)
      return response
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error as { response?: { data?: unknown } }
        return rejectWithValue(errorResponse.response?.data || 'Failed to submit contact form')
      }
      return rejectWithValue('An unknown error occurred while submitting the contact form')
    }
  }
)

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContactForm: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false
        state.error = null
        state.success = true
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
  },
})

export const { resetContactForm } = contactSlice.actions

export default contactSlice.reducer
