import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import styles from './Portfolio.module.css'
import { api, Project } from '../../services/api'

// You might want to define an interface for project data
// interface Project {
//   id: number
//   title: string
//   description: string
//   technologies: string[]
//   imageUrl: string
//   projectUrl: string
// }

// const projects: Project[] = [
//   {
//     id: 1,
//     title: 'Project 1',
//     description: 'Crypto chart with live data.',
//     technologies: ['React', 'Node.js', 'MongoDB'],
//     imageUrl: 'src/assets/cryptochart.png',
//     projectUrl: 'https://decpwnz.github.io/tindog/',
//   },
//   {
//     id: 2,
//     title: 'Project 2',
//     description: 'Tinder for dogs.',
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     imageUrl: 'src/assets/tindog.png',
//     projectUrl: 'https://decpwnz.github.io/tindog/',
//   },
// ]

function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await api.getProjects()
        setProjects(fetchedProjects)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch projects. Please try again later.')
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Portfolio</h1>
        <Link to="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </header>
      <main className={styles.main}>
        <section className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project._id} className={styles.projectCard}>
              {project.imageUrl && (
                <img src={project.imageUrl} alt={project.title} className={styles.projectImage} />
              )}
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className={styles.technologies}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.tech}>
                    {tech}
                  </span>
                ))}
              </div>
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default Portfolio
