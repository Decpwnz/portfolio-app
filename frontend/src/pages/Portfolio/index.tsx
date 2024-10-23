import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import styles from './Portfolio.module.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Pagination from '../../components/Pagination/Pagination'
import { ITEMS_PER_PAGE } from '../../constants/pagination'
import {
  fetchProjects,
  setSortField,
  setSortOrder,
  setFilter,
} from '../../features/projects/projectsSlice'

function Portfolio() {
  const dispatch = useAppDispatch()
  const { projects, total, currentPage, loading, error, sortField, sortOrder, filter } =
    useAppSelector((state) => state.projects)

  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchProjects({ page, limit: ITEMS_PER_PAGE, sortField, sortOrder, filter }))
  }, [dispatch, page, sortField, sortOrder, filter])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortField, newSortOrder] = event.target.value.split(':')
    dispatch(setSortField(newSortField))
    dispatch(setSortOrder(newSortOrder as 'asc' | 'desc'))
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(event.target.value))
  }

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
      <div className={styles.controls}>
        <select onChange={handleSortChange} value={`${sortField}:${sortOrder}`}>
          <option value="createdAt:desc">Newest First</option>
          <option value="createdAt:asc">Oldest First</option>
          <option value="title:asc">Title A-Z</option>
          <option value="title:desc">Title Z-A</option>
        </select>
        <input
          type="text"
          placeholder="Filter projects..."
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
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
      <Pagination
        currentPage={currentPage}
        totalItems={total}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Portfolio
