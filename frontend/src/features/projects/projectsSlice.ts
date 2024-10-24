import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { api, Project } from '../../services/api'

export interface ProjectsState {
  projects: Project[]
  total: number
  currentPage: number
  loading: boolean
  error: string | null
  sortField: string
  sortOrder: 'asc' | 'desc'
  filter: string
  selectedProject: Project | null
}

const initialState: ProjectsState = {
  projects: [],
  total: 0,
  currentPage: 1,
  loading: false,
  error: null,
  sortField: 'createdAt',
  sortOrder: 'desc',
  filter: '',
  selectedProject: null,
}

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async ({
    page,
    limit,
    sortField,
    sortOrder,
    filter,
  }: {
    page: number
    limit: number
    sortField: string
    sortOrder: 'asc' | 'desc'
    filter: string
  }) => {
    const response = await api.getProjects(page, limit, sortField, sortOrder, filter)
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

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id: string) => {
    const response = await api.getProject(id)
    return response
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setSortField: (state, action) => {
      state.sortField = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
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
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProject = action.payload
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch project'
      })
  },
})

export const { setSortField, setSortOrder, setFilter } = projectsSlice.actions

export default projectsSlice.reducer
