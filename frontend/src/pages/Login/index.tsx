import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { RootState, AppDispatch } from '../../app/store'
import { login } from '../../features/auth/authSlice'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { error, loading } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const resultAction = await dispatch(login({ username, password }))
    if (login.fulfilled.match(resultAction)) {
      navigate('/')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <button>
        <Link to="/register">Don't have an account? Register here.</Link>
      </button>
      <button>
        <Link to="/">Back to Home</Link>
      </button>
    </div>
  )
}

export default Login
