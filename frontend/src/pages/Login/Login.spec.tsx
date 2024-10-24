import { configureStore, Dispatch } from '@reduxjs/toolkit'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import Login from './index'
import authReducer, { login } from '../../features/auth/authSlice'

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

// Update the mock to include the necessary Redux Toolkit properties
vi.mock('../../features/auth/authSlice', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../features/auth/authSlice')>()
  const mockLoginThunk = vi.fn().mockImplementation((credentials) => (dispatch: Dispatch) => {
    dispatch({ type: 'auth/login/fulfilled', payload: credentials })
    return Promise.resolve({ type: 'auth/login/fulfilled', payload: credentials })
  })

  return {
    ...actual,
    login: Object.assign(mockLoginThunk, {
      fulfilled: { match: (action: { type: string }) => action.type === 'auth/login/fulfilled' },
      pending: { match: (action: { type: string }) => action.type === 'auth/login/pending' },
      rejected: { match: (action: { type: string }) => action.type === 'auth/login/rejected' },
    }),
  }
})

describe('Login Component', () => {
  const renderLoginComponent = () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: true,
          serializableCheck: false, // This helps with async action handling
        }),
    })

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )
  }

  beforeEach(() => {
    vi.mocked(login).mockClear()
  })

  it('renders the Login page', () => {
    renderLoginComponent()
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })

  it('updates username and password fields', () => {
    renderLoginComponent()

    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(usernameInput).toHaveValue('testuser')
    expect(passwordInput).toHaveValue('password123')
  })

  it('submits the form and dispatches login action', async () => {
    renderLoginComponent()

    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const submitButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    expect(login).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' })
  })
})
