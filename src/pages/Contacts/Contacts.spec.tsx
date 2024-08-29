import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import Contacts from './index'

describe('Contacts Component', () => {
  it('renders the Contacts heading', () => {
    render(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    )

    expect(screen.getByText('Contacts')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    )

    const homeLink = screen.getByText('Go back to Home')
    expect(homeLink.getAttribute('href')).toBe('/')
  })
})
