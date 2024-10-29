import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

import Home from '.'
import authReducer from '../../features/auth/authSlice'

const mockedUseNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  }
})

// Create a test store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

// Create a wrapper component for tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  )
}

describe('Home Component', () => {
  it('renders the main heading', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    )

    expect(screen.getByText("Hey! I'm Marijuš")).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    )

    const portfolioLink = screen.getByText('Portfolio')
    const aboutLink = screen.getByText('About')
    const contactLink = screen.getByText('Contact')

    expect(portfolioLink).toBeInTheDocument()
    expect(portfolioLink.getAttribute('href')).toBe('/portfolio')

    expect(aboutLink).toBeInTheDocument()
    expect(aboutLink.getAttribute('href')).toBe('/about')

    expect(contactLink).toBeInTheDocument()
    expect(contactLink.getAttribute('href')).toBe('/contacts')
  })

  it('renders the Contact me button and navigates to contacts page when clicked', async () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    )

    const contactButton = screen.getByText('Contact me')
    expect(contactButton).toBeInTheDocument()

    await userEvent.click(contactButton)
    expect(mockedUseNavigate).toHaveBeenCalledWith('/contacts')
  })
})
