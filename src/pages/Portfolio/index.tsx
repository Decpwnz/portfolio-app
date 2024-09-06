import { Link } from 'react-router-dom'

import styles from './Portfolio.module.css'

// You might want to define an interface for project data
interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  projectUrl: string
}

// Sample project data
const projects: Project[] = [
  {
    id: 1,
    title: 'Project 1',
    description: 'A brief description of project 1.',
    technologies: ['React', 'TypeScript', 'CSS Modules'],
    imageUrl: 'src/assets/cryptochart.png',
    projectUrl: 'https://decpwnz.github.io/tindog/',
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'A brief description of project 2.',
    technologies: ['Vue', 'JavaScript', 'Sass'],
    imageUrl: 'src/assets/tindog.png',
    projectUrl: 'https://decpwnz.github.io/tindog/',
  },
  // Add more projects as needed
]

function Portfolio() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Portfolio</h1>
        <Link to="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </header>
      <main className={styles.main}>
        <section className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <img src={project.imageUrl} alt={project.title} className={styles.projectImage} />
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className={styles.technologies}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                View Project
              </a>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default Portfolio
