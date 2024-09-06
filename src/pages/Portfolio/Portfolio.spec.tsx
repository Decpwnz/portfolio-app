import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import Portfolio from './index'

describe('Portfolio Component', () => {
  it('renders the Portfolio heading', () => {
    render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    )

    expect(screen.getByText('Portfolio')).toBeInTheDocument()
  })

  it('renders project cards', () => {
    render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    )

    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
  })

  it('renders project technologies', () => {
    render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('renders the back to home link', () => {
    render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    )

    const homeLink = screen.getByText('Back to Home')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.getAttribute('href')).toBe('/')
  })
})
