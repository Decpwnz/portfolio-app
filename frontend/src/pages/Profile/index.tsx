import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import styles from './Profile.module.css'
import { api, User } from '../../services/api'

function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await api.getProfile()
        setUser(profileData)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
        navigate('/login')
      }
    }

    fetchProfile()
  }, [navigate])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.updatePassword(newPassword)
      setNewPassword('')
      toast.success('Password updated successfully')
    } catch (error) {
      console.error('Failed to update password:', error)
    }
  }

  const handleLogout = () => {
    api.logout()
    navigate('/login')
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
      <form onSubmit={handlePasswordChange} className={styles.form}>
        <h3>Change Password</h3>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button type="submit">Update Password</button>
      </form>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
      <button onClick={() => navigate('/')}>Go Back Home</button>
    </div>
  )
}

export default Profile
