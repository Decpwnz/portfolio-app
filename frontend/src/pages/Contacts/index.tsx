import { Link } from 'react-router-dom'

import styles from './Contacts.module.css'
import ContactForm from '../../components/ContactForm/ContactForm'

function Contacts() {
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
          <p>Feel free to reach out using the form below or through my social media channels.</p>
        </section>
        <section className={styles.contactForm}>
          <h2>Contact Form</h2>
          <ContactForm />
        </section>
      </main>
    </div>
  )
}

export default Contacts
