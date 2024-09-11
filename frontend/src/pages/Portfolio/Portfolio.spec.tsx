import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import Portfolio from './index'
import { api } from '../../services/api'

// Mock the api module
vi.mock('../../services/api')

describe('Portfolio Component', () => {
  const mockProjects = [
    {
      _id: '1',
      title: 'Project 1',
      description: 'Description 1',
      technologies: ['React', 'Node.js'],
    },
    {
      _id: '2',
      title: 'Project 2',
      description: 'Description 2',
      technologies: ['MongoDB', 'Express'],
    },
  ]

  beforeEach(() => {
    // Mock the API call
    vi.mocked(api.getProjects).mockResolvedValue(mockProjects)
  })

  it('renders the Portfolio heading', async () => {
    render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Portfolio')).toBeInTheDocument()
    })
  })

  it('renders project cards', async () => {
    render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument()
      expect(screen.getByText('Project 2')).toBeInTheDocument()
    })
  })

  it('renders project technologies', async () => {
    render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('Node.js')).toBeInTheDocument()
      expect(screen.getByText('MongoDB')).toBeInTheDocument()
      expect(screen.getByText('Express')).toBeInTheDocument()
    })
  })

  it('renders the back to home link', async () => {
    render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    )

    await waitFor(() => {
      const homeLink = screen.getByText('Back to Home')
      expect(homeLink).toBeInTheDocument()
      expect(homeLink.getAttribute('href')).toBe('/')
    })
  })
})
