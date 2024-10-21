import { useState, useEffect, useRef } from 'react'

import { FaLinkedin, FaGithub, FaUser, FaCaretDown } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Home.module.css'

function Home() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleContactClick = () => {
    navigate('/contacts')
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setIsMenuOpen(false)
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>ML</div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contacts">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.userMenu} ref={menuRef}>
          <div className={styles.profileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaUser />
            <FaCaretDown />
          </div>
          {isMenuOpen && (
            <ul className={styles.dropdown}>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/admin">Control Panel</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleLogout}>
                      Sign Out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          )}
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
            <a
              className={styles.iconLink}
              href="https://github.com/Decpwnz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
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
