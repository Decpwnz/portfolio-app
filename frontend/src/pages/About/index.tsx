import { Link } from 'react-router-dom'

import styles from './About.module.css'

function About() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>About Me</h1>
        <Link to="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </header>
      <main className={styles.main}>
        <section className={styles.intro}>
          <h2>Hi, I'm Marijuš Ladanovski</h2>
          <p>
            I'm a passionate web developer with a focus on creating responsive and user-friendly
            applications.
          </p>
        </section>
        <section className={styles.skills}>
          <h2>My Skills</h2>
          <ul>
            <li>JavaScript</li>
            <li>React</li>
            <li>TypeScript</li>
            <li>Redux</li>
          </ul>
        </section>
        <section className={styles.experience}>
          <h2>Experience</h2>
          <p>Here you can add details about your work experience or projects.</p>
        </section>
      </main>
    </div>
  )
}

export default About
