import { configureStore, Reducer } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

import ProjectDetail from './index'
import * as projectsSlice from '../../features/projects/projectsSlice'

// Mock the entire projectsSlice module
vi.mock('../../features/projects/projectsSlice', () => ({
  fetchProjectById: vi.fn(() => ({ type: 'projects/fetchProjectById' })),
  default: vi.fn(
    (
      state: projectsSlice.ProjectsState = {
        loading: false,
        error: null,
        selectedProject: null,
        projects: [],
        total: 0,
        currentPage: 1,
        sortField: '',
        sortOrder: 'asc',
        filter: '',
      }
    ) => state
  ),
}))

describe('ProjectDetail', () => {
  const createMockStore = (initialState: Partial<projectsSlice.ProjectsState>) => {
    return configureStore({
      reducer: {
        projects: vi.mocked(projectsSlice.default) as Reducer<projectsSlice.ProjectsState>,
      },
      preloadedState: {
        projects: initialState as projectsSlice.ProjectsState,
      },
    })
  }

  it('renders loading state', () => {
    const mockStore = createMockStore({ loading: true, error: null, selectedProject: null })

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/project/1']}>
          <Routes>
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    const mockStore = createMockStore({
      loading: false,
      error: 'Error message',
      selectedProject: null,
    })

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/project/1']}>
          <Routes>
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText('Error: Error message')).toBeInTheDocument()
  })

  it('renders project details', () => {
    const mockProject = {
      _id: '1',
      id: '1',
      title: 'Test Project',
      description: 'Test Description',
      imageUrl: 'test-image.jpg',
      technologies: ['React', 'TypeScript'],
      projectUrl: 'https://test-project.com',
    }

    const mockStore = createMockStore({ loading: false, error: null, selectedProject: mockProject })

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/project/1']}>
          <Routes>
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByAltText('Test Project')).toHaveAttribute('src', 'test-image.jpg')
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('View Project')).toHaveAttribute('href', 'https://test-project.com')
  })

  // ... you can add more tests here ...
})
