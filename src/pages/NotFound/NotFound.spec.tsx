import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import NotFound from './index'

describe('NotFound Component', () => {
  it('renders the 404 message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
  })

  it('renders the error message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )

    expect(
      screen.getByText("Oops! The page you're looking for doesn't exist or has been moved.")
    ).toBeInTheDocument()
  })

  it('renders the back to home link', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )

    const homeLink = screen.getByText('Back to Home')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.getAttribute('href')).toBe('/')
  })
})
