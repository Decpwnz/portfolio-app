import React, { useState, useEffect } from 'react'

import styles from './ContactForm.module.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { submitContactForm, resetContactForm } from '../../features/contact/contactSlice'

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useAppDispatch()
  const { loading, error, success } = useAppSelector((state) => state.contact)

  useEffect(() => {
    return () => {
      dispatch(resetContactForm())
    }
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(submitContactForm({ name, email, message }))
  }

  if (success) {
    return (
      <p className={styles.successMessage}>Thank you for your message. We'll be in touch soon!</p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

export default ContactForm
