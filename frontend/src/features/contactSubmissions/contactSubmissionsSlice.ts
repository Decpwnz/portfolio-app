import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { api } from '../../services/api'

export interface ContactSubmission {
  _id: string
  name: string
  email: string
  message: string
  createdAt: string
  isRead: boolean
}

interface ContactSubmissionsState {
  submissions: ContactSubmission[]
  total: number
  currentPage: number
  loading: boolean
  error: string | null
}

const initialState: ContactSubmissionsState = {
  submissions: [],
  total: 0,
  currentPage: 1,
  loading: false,
  error: null,
}

export const fetchContactSubmissions = createAsyncThunk(
  'contactSubmissions/fetchContactSubmissions',
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await api.getContactSubmissions(page, limit)
    return response
  }
)

export const markSubmissionAsRead = createAsyncThunk(
  'contactSubmissions/markSubmissionAsRead',
  async (id: string) => {
    const response = await api.markContactSubmissionAsRead(id)
    return response
  }
)

export const deleteContactSubmission = createAsyncThunk(
  'contactSubmissions/deleteContactSubmission',
  async (id: string) => {
    await api.deleteContactSubmission(id)
    return id
  }
)

const contactSubmissionsSlice = createSlice({
  name: 'contactSubmissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactSubmissions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchContactSubmissions.fulfilled, (state, action) => {
        state.submissions = action.payload.submissions
        state.total = action.payload.total
        state.currentPage = action.meta.arg.page
        state.loading = false
        state.error = null
      })
      .addCase(fetchContactSubmissions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch contact submissions'
      })
      .addCase(
        markSubmissionAsRead.fulfilled,
        (state, action: PayloadAction<ContactSubmission>) => {
          const index = state.submissions.findIndex((s) => s._id === action.payload._id)
          if (index !== -1) {
            state.submissions[index] = action.payload
          }
        }
      )
      .addCase(deleteContactSubmission.fulfilled, (state, action: PayloadAction<string>) => {
        state.submissions = state.submissions.filter((s) => s._id !== action.payload)
      })
  },
})

export default contactSubmissionsSlice.reducer
