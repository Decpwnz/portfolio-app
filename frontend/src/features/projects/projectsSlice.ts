import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { api, Project } from '../../services/api'

interface ProjectsState {
  projects: Project[]
  total: number
  currentPage: number
  loading: boolean
  error: string | null
}

const initialState: ProjectsState = {
  projects: [],
  total: 0,
  currentPage: 1,
  loading: false,
  error: null,
}

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await api.getProjects(page, limit)
    return response
  }
)

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (project: Omit<Project, '_id'>, { rejectWithValue }) => {
    try {
      const response = await api.createProject(project)
      return response
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error as { response?: { data?: unknown } }
        return rejectWithValue(errorResponse.response?.data || 'Failed to create project')
      }
      return rejectWithValue('An unknown error occurred while creating project')
    }
  }
)

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, project }: { id: string; project: Partial<Project> }, { rejectWithValue }) => {
    try {
      const response = await api.updateProject(id, project)
      return response
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error as { response?: { data?: unknown } }
        return rejectWithValue(errorResponse.response?.data || 'Failed to update project')
      }
      return rejectWithValue('An unknown error occurred while updating project')
    }
  }
)

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteProject(id)
      return id
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error as { response?: { data?: unknown } }
        return rejectWithValue(errorResponse.response?.data || 'Failed to delete project')
      }
      return rejectWithValue('An unknown error occurred while deleting project')
    }
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.projects = action.payload.projects
        state.total = action.payload.total
        state.currentPage = action.meta.arg.page
        state.error = null
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'An error occurred while fetching projects'
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload)
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((p) => p._id === action.payload._id)
        if (index !== -1) {
          state.projects[index] = action.payload
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p._id !== action.payload)
      })
  },
})

export default projectsSlice.reducer
