import { Link } from 'react-router-dom'

import styles from './Home.module.css'

function Home() {
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
          </ul>
        </nav>
        <div className={styles.themeToggle}>{/* Add theme toggle button here */}GH_Icon</div>
      </header>
      <main className={styles.main}>
        <h1>Hey! I'm Marijuš</h1>
        <p>
          Welcome to my portfolio website. Please explore the different sections to learn more about me and my work.
        </p>
        <button className={styles.contactButton}>Contact me</button>
        <div className={styles.socialIcons}>{/* Add social media icons here */}</div>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </div>
  )
}
export default Home
