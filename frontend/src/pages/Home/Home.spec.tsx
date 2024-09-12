import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

import Home from './index'

const mockedUseNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  }
})

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
    const adminLink = screen.getByText('Admin')

    expect(portfolioLink).toBeInTheDocument()
    expect(portfolioLink.getAttribute('href')).toBe('/portfolio')

    expect(aboutLink).toBeInTheDocument()
    expect(aboutLink.getAttribute('href')).toBe('/about')

    expect(contactsLink).toBeInTheDocument()
    expect(contactsLink.getAttribute('href')).toBe('/contacts')

    expect(adminLink).toBeInTheDocument()
    expect(adminLink.getAttribute('href')).toBe('/admin')
  })

  it('renders the Contact me button and navigates to contacts page when clicked', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    const contactButton = screen.getByText('Contact me')
    expect(contactButton).toBeInTheDocument()

    await userEvent.click(contactButton)
    expect(mockedUseNavigate).toHaveBeenCalledWith('/contacts')
  })
})
