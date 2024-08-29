import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import Home from './index'

describe('Home Component', () => {
  it('renders the Home heading', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    const portfolioLink = screen.getByText('Portfolio')
    const aboutLink = screen.getByText('About')
    const contactsLink = screen.getByText('Contacts')

    expect(portfolioLink).toBeInTheDocument()
    expect(portfolioLink.getAttribute('href')).toBe('/portfolio')

    expect(aboutLink).toBeInTheDocument()
    expect(aboutLink.getAttribute('href')).toBe('/about')

    expect(contactsLink).toBeInTheDocument()
    expect(contactsLink.getAttribute('href')).toBe('/contacts')
  })
})
