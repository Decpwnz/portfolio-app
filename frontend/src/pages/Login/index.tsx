import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import styles from './Login.module.css'
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
      navigate('/admin')
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <Link to="/register" className={styles.link}>
        Don't have an account? Register here.
      </Link>
      <Link to="/" className={styles.link}>
        Back to Home
      </Link>
    </div>
  )
}

export default Login
