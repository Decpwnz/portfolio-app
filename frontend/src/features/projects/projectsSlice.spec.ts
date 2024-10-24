import { configureStore } from '@reduxjs/toolkit'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import projectsReducer, {
  fetchProjects,
  createProject,
  setSortField,
  setSortOrder,
  setFilter,
  ProjectsState,
} from './projectsSlice'
import * as apiModule from '../../services/api'

// Mock the entire api module
vi.mock('../../services/api')

describe('projectsSlice', () => {
  let store: ReturnType<typeof configureStore<{ projects: ProjectsState }>>

  beforeEach(() => {
    store = configureStore({
      reducer: { projects: projectsReducer },
    })
    // Reset all mocks before each test
    vi.resetAllMocks()
  })

  it('should handle initial state', () => {
    expect(store.getState().projects).toEqual({
      projects: [],
      total: 0,
      currentPage: 1,
      loading: false,
      error: null,
      sortField: 'createdAt',
      sortOrder: 'desc',
      filter: '',
      selectedProject: null,
    })
  })

  it('should handle setSortField', () => {
    store.dispatch(setSortField('name'))
    expect(store.getState().projects.sortField).toBe('name')
  })

  it('should handle setSortOrder', () => {
    store.dispatch(setSortOrder('asc'))
    expect(store.getState().projects.sortOrder).toBe('asc')
  })

  it('should handle setFilter', () => {
    store.dispatch(setFilter('test'))
    expect(store.getState().projects.filter).toBe('test')
  })

  it('should handle fetchProjects.fulfilled', async () => {
    const mockProjects = [
      {
        _id: '1',
        name: 'Test Project',
        title: 'Test Project',
        description: 'A test project',
        technologies: [],
      },
    ]
    // Use vi.fn() to mock the getProjects function
    vi.spyOn(apiModule.api, 'getProjects').mockResolvedValue({ projects: mockProjects, total: 1 })

    await store.dispatch(
      fetchProjects({ page: 1, limit: 10, sortField: 'name', sortOrder: 'asc', filter: '' })
    )

    expect(store.getState().projects.projects).toEqual(mockProjects)
    expect(store.getState().projects.total).toBe(1)
    expect(store.getState().projects.currentPage).toBe(1)
    expect(store.getState().projects.loading).toBe(false)
    expect(store.getState().projects.error).toBe(null)
  })

  it('should handle createProject.fulfilled', async () => {
    const newProject = {
      name: 'New Project',
      description: 'Test description',
      title: 'New Project Title',
      technologies: [],
    }
    const createdProject = {
      _id: '2',
      ...newProject,
    }
    // Use vi.fn() to mock the createProject function
    vi.spyOn(apiModule.api, 'createProject').mockResolvedValue(createdProject)

    await store.dispatch(createProject(newProject))

    expect(store.getState().projects.projects).toContainEqual(createdProject)
  })

  // Add more tests for updateProject, deleteProject, and fetchProjectById...
})
