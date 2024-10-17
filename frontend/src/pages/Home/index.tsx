import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Home.module.css'

function Home() {
  const navigate = useNavigate()

  const handleContactClick = () => {
    navigate('/contacts')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Home</div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.socialIcons}>
          <a
            style={{ color: 'white' }}
            href="https://github.com/Decpwnz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <h1>Hey! I'm Marijuš</h1>
        <p>
          Welcome to my portfolio website. Please explore the different sections to learn more about
          me and my work.
        </p>
        <div className={styles.contactContainer}>
          <button className={styles.contactButton} onClick={handleContactClick}>
            Contact me
          </button>
          <div className={styles.socialIcons}>
            <a
              className={styles.iconLink}
              href="https://www.linkedin.com/in/marijus-ladanovski"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Marijuš Ladanovski. All rights reserved.</p>
      </footer>
    </div>
  )
}
export default Home
