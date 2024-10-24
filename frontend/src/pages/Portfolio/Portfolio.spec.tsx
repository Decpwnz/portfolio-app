import { configureStore } from '@reduxjs/toolkit'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import Portfolio from './index'
import projectsReducer from '../../features/projects/projectsSlice'
import { api } from '../../services/api'

// Mock the API calls
vi.mock('../../services/api', () => ({
  api: {
    getProjects: vi.fn(),
  },
}))

describe('Portfolio Component', () => {
  const renderPortfolioComponent = () => {
    const store = configureStore({
      reducer: {
        projects: projectsReducer,
      },
    })

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Portfolio />
        </BrowserRouter>
      </Provider>
    )
  }

  beforeEach(() => {
    vi.mocked(api.getProjects).mockResolvedValue({ projects: [], total: 0 })
  })

  it('renders the Portfolio page', async () => {
    renderPortfolioComponent()
    await waitFor(() => {
      expect(screen.getByText('Portfolio')).toBeInTheDocument()
    })
  })

  it('renders the projects list when projects are available', async () => {
    const mockProjects = [
      {
        _id: '1',
        title: 'Project 1',
        description: 'Description 1',
        technologies: ['React'],
        imageUrl: 'image1.jpg',
        projectUrl: 'https://project1.com',
      },
      {
        _id: '2',
        title: 'Project 2',
        description: 'Description 2',
        technologies: ['Vue'],
        imageUrl: 'image2.jpg',
        projectUrl: 'https://project2.com',
      },
    ]
    vi.mocked(api.getProjects).mockResolvedValue({ projects: mockProjects, total: 2 })

    renderPortfolioComponent()

    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument()
      expect(screen.getByText('Project 2')).toBeInTheDocument()
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('Vue')).toBeInTheDocument()
    })
  })

  it('handles sorting change', async () => {
    renderPortfolioComponent()

    await waitFor(() => {
      const sortSelect = screen.getByRole('combobox')
      fireEvent.change(sortSelect, { target: { value: 'title:asc' } })
    })

    expect(vi.mocked(api.getProjects)).toHaveBeenCalledWith(1, 10, 'title', 'asc', '')
  })

  it('handles filter change', async () => {
    renderPortfolioComponent()

    await waitFor(() => {
      const filterInput = screen.getByPlaceholderText('Filter projects...')
      fireEvent.change(filterInput, { target: { value: 'React' } })
    })

    // Wait for debounce
    await new Promise((resolve) => setTimeout(resolve, 300))

    expect(vi.mocked(api.getProjects)).toHaveBeenCalledWith(1, 10, 'createdAt', 'desc', 'React')
  })

  it('displays "No projects found" when there are no projects', async () => {
    vi.mocked(api.getProjects).mockResolvedValue({ projects: [], total: 0 })

    renderPortfolioComponent()

    await waitFor(() => {
      expect(screen.getByText('No projects found')).toBeInTheDocument()
    })
  })
})
