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

    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('renders the introduction section', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    )

    expect(screen.getByText("Hi, I'm Marijuš Ladanovski")).toBeInTheDocument()
  })

  it('renders the skills section', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    )

    expect(screen.getByText('My Skills')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders the experience section', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    )

    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders the back to home link', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    )

    const homeLink = screen.getByText('Back to Home')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.getAttribute('href')).toBe('/')
  })
})
