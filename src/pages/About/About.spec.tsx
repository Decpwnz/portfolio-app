import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import About from './index'

describe('About Component', () => {
  it('renders the About heading', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    )

    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    )

    const homeLink = screen.getByText('Go back to Home')

    expect(homeLink).toBeInTheDocument()
    expect(homeLink.getAttribute('href')).toBe('/')
  })
})
