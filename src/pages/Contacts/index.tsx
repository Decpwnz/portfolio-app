import { useState } from 'react'

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import styles from './Contacts.module.css'

function Contacts() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically handle the form submission,
    // such as sending the data to a server or API
    console.log('Form submitted:', { name, email, message })
    // Reset form fields
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Contact Me</h1>
        <Link to="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </header>
      <main className={styles.main}>
        <section className={styles.contactInfo}>
          <h2>Get in Touch</h2>
          <p>Feel free to reach out to me through any of the following methods:</p>
          <div className={styles.contactMethods}>
            <a href="mailto:marijus.ladanovski@gmail.com" className={styles.contactMethod}>
              <FaEnvelope /> marijus.ladanovski@gmail.com
            </a>
            <a
              href="https://github.com/decpwnz"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactMethod}
            >
              <FaGithub /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/marijus-ladanovski"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactMethod}
            >
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </section>
        <section className={styles.contactForm}>
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Contacts
