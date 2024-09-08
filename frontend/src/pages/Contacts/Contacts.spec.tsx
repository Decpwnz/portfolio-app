import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import Contacts from './index'

describe('Contacts Component', () => {
  it('renders the Contacts heading', () => {
    render(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    )

    expect(screen.getByText('Contact Me')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    )

    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
  })

  it('renders contact form', () => {
    render(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    )

    expect(screen.getByLabelText('Name:')).toBeInTheDocument()
    expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    expect(screen.getByLabelText('Message:')).toBeInTheDocument()
    expect(screen.getByText('Send Message')).toBeInTheDocument()
  })

  it('handles form submission', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText('Message:'), { target: { value: 'Hello, World!' } })

    fireEvent.click(screen.getByText('Send Message'))

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, World!',
    })
  })

  it('renders the back to home link', () => {
    render(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    )

    const homeLink = screen.getByText('Back to Home')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.getAttribute('href')).toBe('/')
  })
})
