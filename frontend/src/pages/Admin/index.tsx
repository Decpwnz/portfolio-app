import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import styles from './Admin.module.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchProjects,
  createProject,
  // updateProject,
  deleteProject,
} from '../../features/projects/projectsSlice'
import { Project } from '../../services/api'

function Admin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { projects, loading, error } = useAppSelector((state) => state.projects)
  const [newProject, setNewProject] = useState<Omit<Project, '_id'>>({
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
    projectUrl: '',
  })

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(',').map((tech) => tech.trim())
    setNewProject((prev) => ({ ...prev, technologies }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(createProject(newProject))
    setNewProject({
      title: '',
      description: '',
      technologies: [],
      imageUrl: '',
      projectUrl: '',
    })
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id))
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <button onClick={() => navigate('/')}>Back to Home</button>
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          value={newProject.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="technologies"
          value={newProject.technologies.join(', ')}
          onChange={handleTechnologiesChange}
          placeholder="Technologies (comma-separated)"
          required
        />
        <input
          type="url"
          name="imageUrl"
          value={newProject.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <input
          type="url"
          name="projectUrl"
          value={newProject.projectUrl}
          onChange={handleInputChange}
          placeholder="Project URL"
        />
        <button type="submit">Add Project</button>
      </form>
      <h2>Projects</h2>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <div key={project._id} className={styles.projectItem}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin
