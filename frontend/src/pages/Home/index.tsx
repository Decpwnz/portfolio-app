import { useState, useEffect, useRef } from 'react'

import { FaLinkedin, FaGithub, FaUser, FaCaretDown } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Home.module.css'
import { useAppSelector } from '../../app/hooks'
import UserMenu from '../../components/UserMenu/UserMenu'

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

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
              {isAuthenticated ? (
                <UserMenu />
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
