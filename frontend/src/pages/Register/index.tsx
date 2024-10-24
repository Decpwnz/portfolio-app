import React, { useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import styles from './Register.module.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { register } from '../../features/auth/authSlice'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { error, loading } = useAppSelector((state) => state.auth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const resultAction = await dispatch(register({ username, password }))
      if (register.fulfilled.match(resultAction)) {
        toast.success('Registration successful. Please log in.')
        navigate('/login')
      } else if (register.rejected.match(resultAction)) {
        toast.error((resultAction.payload as string) || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration failed:', error)
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <Link to="/login" className={styles.link}>
        Already have an account? Login here.
      </Link>
      <Link to="/" className={styles.link}>
        Back to Home
      </Link>
    </div>
  )
}

export default Register
