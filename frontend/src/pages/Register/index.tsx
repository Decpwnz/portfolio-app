import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import styles from './Register.module.css'
import { api } from '../../services/api'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.register(username, password)
      toast.success('Registration successful. Please log in.')
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
