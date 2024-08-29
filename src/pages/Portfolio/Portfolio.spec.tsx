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

  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    )

    const homeLink = screen.getByText('Go back to Home')
    expect(homeLink.getAttribute('href')).toBe('/')
  })
})
