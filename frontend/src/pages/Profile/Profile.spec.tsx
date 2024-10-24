import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import Profile from './index'
import { api } from '../../services/api'

// Mock the react-router-dom module
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

// Mock the api service
vi.mock('../../services/api', () => ({
  api: {
    getProfile: vi.fn(),
    updatePassword: vi.fn(),
    logout: vi.fn(),
  },
}))

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
  },
}))

describe('Profile Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders user profile information', async () => {
    const mockUser = { id: '1', username: 'testuser', role: 'user' }
    vi.mocked(api.getProfile).mockResolvedValue(mockUser)

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Username: testuser')).toBeInTheDocument()
      expect(screen.getByText('Role: user')).toBeInTheDocument()
    })
  })

  it('handles password change', async () => {
    const mockUser = { id: '1', username: 'testuser', role: 'user' }
    vi.mocked(api.getProfile).mockResolvedValue(mockUser)
    vi.mocked(api.updatePassword).mockResolvedValue(undefined)

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )

    await waitFor(() => {
      const passwordInput = screen.getByPlaceholderText('New Password')
      fireEvent.change(passwordInput, { target: { value: 'newpassword' } })
      fireEvent.click(screen.getByText('Update Password'))
    })

    expect(api.updatePassword).toHaveBeenCalledWith('newpassword')
    expect(toast.success).toHaveBeenCalledWith('Password updated successfully')
  })

  it('handles logout', async () => {
    const mockUser = { id: '1', username: 'testuser', role: 'user' }
    vi.mocked(api.getProfile).mockResolvedValue(mockUser)

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    )

    await waitFor(() => {
      fireEvent.click(screen.getByText('Logout'))
    })

    expect(api.logout).toHaveBeenCalled()
  })
})
