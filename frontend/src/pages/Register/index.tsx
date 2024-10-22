import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default Register
