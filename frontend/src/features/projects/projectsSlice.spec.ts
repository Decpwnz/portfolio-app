import { configureStore } from '@reduxjs/toolkit'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import projectsReducer, {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  setSortField,
  setSortOrder,
  setFilter,
  initialState,
} from './projectsSlice'
import * as apiModule from '../../services/api'

// Mock the entire api module
vi.mock('../../services/api')

describe('projectsSlice', () => {
  let store: ReturnType<typeof configureStore<{ projects: ReturnType<typeof projectsReducer> }>>

  beforeEach(() => {
    store = configureStore({
      reducer: { projects: projectsReducer },
      preloadedState: {
        projects: {
          ...initialState,
          projects: [
            {
              _id: '1',
              name: 'Initial Project',
              title: 'Initial Project',
              description: 'An initial project',
              technologies: [],
            },
          ],
        },
      },
    })
    // Reset all mocks before each test
    vi.resetAllMocks()
  })

  it('should handle initial state', () => {
    expect(projectsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
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

  it('should handle updateProject.fulfilled', async () => {
    const updatedProject = {
      _id: '1',
      name: 'Updated Project',
      description: 'Updated description',
      title: 'Updated Project Title',
      technologies: ['React'],
    }
    vi.spyOn(apiModule.api, 'updateProject').mockResolvedValue(updatedProject)

    await store.dispatch(updateProject({ id: '1', project: updatedProject }))

    expect(store.getState().projects.projects).toContainEqual(updatedProject)
  })

  it('should handle deleteProject.fulfilled', async () => {
    const projectId = '1'
    // Use vi.fn() to mock the deleteProject function
    vi.spyOn(apiModule.api, 'deleteProject').mockResolvedValue(undefined)

    await store.dispatch(deleteProject(projectId))

    expect(store.getState().projects.projects).not.toContainEqual(
      expect.objectContaining({ _id: projectId })
    )
  })

  it('should handle fetchProjects.rejected', async () => {
    const errorMessage = 'Failed to fetch projects'
    // Use vi.fn() to mock the getProjects function
    vi.spyOn(apiModule.api, 'getProjects').mockRejectedValue(new Error(errorMessage))

    await store.dispatch(
      fetchProjects({ page: 1, limit: 10, sortField: 'name', sortOrder: 'asc', filter: '' })
    )

    expect(store.getState().projects.loading).toBe(false)
    expect(store.getState().projects.error).toBe(errorMessage)
  })

  // Add more tests for updateProject, deleteProject, and fetchProjectById...
})
