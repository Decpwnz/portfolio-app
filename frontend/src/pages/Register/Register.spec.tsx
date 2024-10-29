import { configureStore } from '@reduxjs/toolkit'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import Register from './index'
import authReducer, { register } from '../../features/auth/authSlice'

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Register Component', () => {
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    })
    mockNavigate.mockClear()
    vi.clearAllMocks()
  })

  const renderRegister = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    )
  }

  it('renders register form', () => {
    renderRegister()
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
  })

  it('handles successful registration', async () => {
    // Mock successful registration
    const mockDispatch = vi.fn().mockResolvedValue({
      type: register.fulfilled.type,
    })
    store.dispatch = mockDispatch

    renderRegister()

    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button', { name: /register/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function))
      expect(toast.success).toHaveBeenCalledWith('Registration successful. Please log in.')
      expect(mockNavigate).toHaveBeenCalledWith('/login')
    })
  })

  it('handles registration failure', async () => {
    // Mock failed registration
    const errorMessage = 'Registration failed'
    const mockDispatch = vi.fn().mockResolvedValue({
      type: register.rejected.type,
      payload: errorMessage,
    })
    store.dispatch = mockDispatch

    renderRegister()

    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button', { name: /register/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function))
      expect(toast.error).toHaveBeenCalledWith(errorMessage)
    })
  })

  it('updates form inputs correctly', () => {
    renderRegister()

    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(usernameInput).toHaveValue('testuser')
    expect(passwordInput).toHaveValue('password123')
  })
})
