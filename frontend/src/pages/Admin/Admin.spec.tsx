import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

import styles from './Admin.module.css'
import Admin from './index'
import contactSubmissionsReducer from '../../features/contactSubmissions/contactSubmissionsSlice'
import projectsReducer from '../../features/projects/projectsSlice'

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

// Mock the API calls
vi.mock('../../services/api', () => ({
  api: {
    getProjects: vi.fn().mockResolvedValue({ projects: [], total: 0 }),
    getContactSubmissions: vi.fn().mockResolvedValue({ submissions: [], total: 0 }),
  },
}))

describe('Admin Component', () => {
  const renderAdminComponent = () => {
    const store = configureStore({
      reducer: {
        projects: projectsReducer,
        contactSubmissions: contactSubmissionsReducer,
      },
    })

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Admin />
        </BrowserRouter>
      </Provider>
    )
  }

  it('renders the Admin dashboard', async () => {
    renderAdminComponent()
    await waitForElementToBeRemoved(() => document.querySelector('.' + styles.skeleton))
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
  })

  it('renders the project form', async () => {
    renderAdminComponent()
    await waitForElementToBeRemoved(() => document.querySelector('.' + styles.skeleton))
    expect(screen.getByText('Add New Project')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Technologies (comma-separated)')).toBeInTheDocument()
  })

  it('renders the projects list', async () => {
    renderAdminComponent()
    await waitForElementToBeRemoved(() => document.querySelector('.' + styles.skeleton))
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders the contact submissions list', async () => {
    renderAdminComponent()
    await waitForElementToBeRemoved(() => document.querySelector('.' + styles.skeleton))
    expect(screen.getByText('Contact Submissions')).toBeInTheDocument()
  })

  // Add more tests for sorting, filtering, and pagination functionality
})
