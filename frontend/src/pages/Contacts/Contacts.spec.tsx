import { configureStore } from '@reduxjs/toolkit'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import Contacts from './index'
import authReducer from '../../features/auth/authSlice'
import contactReducer from '../../features/contact/contactSlice'

// Create test store
const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
  },
})

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  )
}

describe('Contacts Component', () => {
  it('renders the Contacts heading', () => {
    render(
      <TestWrapper>
        <Contacts />
      </TestWrapper>
    )
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(
      <TestWrapper>
        <Contacts />
      </TestWrapper>
    )
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Feel free to reach out using the form below or through my social media channels.'
      )
    ).toBeInTheDocument()
  })

  it('renders contact form', () => {
    render(
      <TestWrapper>
        <Contacts />
      </TestWrapper>
    )
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByText('Send Message')).toBeInTheDocument()
  })

  it('allows form input and submission', () => {
    render(
      <TestWrapper>
        <Contacts />
      </TestWrapper>
    )

    // Check if we can input values
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello, World!' } })

    // Check if the values are in the form
    expect(screen.getByLabelText('Name')).toHaveValue('John Doe')
    expect(screen.getByLabelText('Email')).toHaveValue('john@example.com')
    expect(screen.getByLabelText('Message')).toHaveValue('Hello, World!')

    // Check if submit button exists and can be clicked
    const submitButton = screen.getByText('Send Message')
    expect(submitButton).toBeInTheDocument()
    fireEvent.click(submitButton)
  })

  it('renders the back to home link', () => {
    render(
      <TestWrapper>
        <Contacts />
      </TestWrapper>
    )
    const homeLink = screen.getByText('Back to Home')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.getAttribute('href')).toBe('/')
  })
})
