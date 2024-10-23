import { useEffect } from 'react'

import { useParams, Link } from 'react-router-dom'

import styles from './ProjectDetail.module.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchProjectById } from '../../features/projects/projectsSlice'

function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { selectedProject, loading, error } = useAppSelector((state) => state.projects)

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id))
    }
  }, [dispatch, id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!selectedProject) return <div>Project not found</div>

  return (
    <div className={styles.container}>
      <Link to="/portfolio" className={styles.backLink}>
        Back to Portfolio
      </Link>
      <h1>{selectedProject.title}</h1>
      {selectedProject.imageUrl && (
        <img
          src={selectedProject.imageUrl}
          alt={selectedProject.title}
          className={styles.projectImage}
        />
      )}
      <p>{selectedProject.description}</p>
      <div className={styles.technologies}>
        <h2>Technologies Used:</h2>
        <ul>
          {selectedProject.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
      {selectedProject.projectUrl && (
        <a
          href={selectedProject.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.projectLink}
        >
          View Project
        </a>
      )}
    </div>
  )
}

export default ProjectDetail
