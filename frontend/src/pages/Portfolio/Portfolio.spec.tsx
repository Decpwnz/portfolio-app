import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import Portfolio from './index'
import projectsReducer from '../../features/projects/projectsSlice'
import { api } from '../../services/api'

// Mock the API calls
vi.mock('../../services/api', () => ({
  api: {
    getProjects: vi.fn().mockResolvedValue({ projects: [], total: 0 }),
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
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
  })

  it('renders the projects list', async () => {
    const mockProjects = [
      {
        _id: '1',
        title: 'Project 1',
        description: 'Description 1',
        technologies: ['React'],
        imageUrl: '',
        projectUrl: '',
      },
      {
        _id: '2',
        title: 'Project 2',
        description: 'Description 2',
        technologies: ['Vue'],
        imageUrl: '',
        projectUrl: '',
      },
    ]
    vi.mocked(api.getProjects).mockResolvedValue({ projects: mockProjects, total: 2 })
    renderPortfolioComponent()
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
  })
})
