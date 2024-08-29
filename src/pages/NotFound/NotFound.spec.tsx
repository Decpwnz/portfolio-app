import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import NotFound from './index'

describe('NotFound Component', () => {
  it('renders the custom not found message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )

    expect(screen.getByText('YOOO THATS A CUSTOM NOT FOUND PAGE')).toBeInTheDocument()
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument()
    expect(screen.getByText('Sorry, the page you are looking for does not exist.')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )

    const homeLink = screen.getByText('Go back to Home')
    expect(homeLink.getAttribute('href')).toBe('/')
  })
})
