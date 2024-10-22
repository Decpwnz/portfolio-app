import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import styles from './Admin.module.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchContactSubmissions,
  markSubmissionAsRead,
  deleteContactSubmission,
} from '../../features/contactSubmissions/contactSubmissionsSlice'
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../features/projects/projectsSlice'
import { Project } from '../../services/api'

function Admin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useAppSelector((state) => state.projects)
  const {
    submissions,
    loading: submissionsLoading,
    error: submissionsError,
  } = useAppSelector((state) => state.contactSubmissions)
  const [newProject, setNewProject] = useState<Omit<Project, '_id'>>({
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
    projectUrl: '',
  })
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    dispatch(fetchProjects())
    dispatch(fetchContactSubmissions())
  }, [dispatch])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isEditing: boolean = false
  ) => {
    const { name, value } = e.target
    if (isEditing && editingProject) {
      setEditingProject({ ...editingProject, [name]: value })
    } else {
      setNewProject((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleTechnologiesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEditing: boolean = false
  ) => {
    const technologies = e.target.value.split(',').map((tech) => tech.trim())
    if (isEditing && editingProject) {
      setEditingProject({ ...editingProject, technologies })
    } else {
      setNewProject((prev) => ({ ...prev, technologies }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProject) {
      dispatch(updateProject({ id: editingProject._id, project: editingProject }))
      setEditingProject(null)
    } else {
      dispatch(createProject(newProject))
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        imageUrl: '',
        projectUrl: '',
      })
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id))
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
  }

  const handleCancelEdit = () => {
    setEditingProject(null)
  }

  const handleMarkAsRead = (id: string) => {
    dispatch(markSubmissionAsRead(id))
  }

  const handleDeleteSubmission = (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      dispatch(deleteContactSubmission(id))
    }
  }

  if (projectsLoading || submissionsLoading) return <div>Loading...</div>
  if (projectsError || submissionsError)
    return <div>Error: {projectsError || submissionsError}</div>

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <button onClick={() => navigate('/')}>Back to Home</button>
      <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          value={editingProject ? editingProject.title : newProject.title}
          onChange={(e) => handleInputChange(e, !!editingProject)}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={editingProject ? editingProject.description : newProject.description}
          onChange={(e) => handleInputChange(e, !!editingProject)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="technologies"
          value={
            editingProject
              ? editingProject.technologies.join(', ')
              : newProject.technologies.join(', ')
          }
          onChange={(e) => handleTechnologiesChange(e, !!editingProject)}
          placeholder="Technologies (comma-separated)"
          required
        />
        <input
          type="url"
          name="imageUrl"
          value={editingProject ? editingProject.imageUrl : newProject.imageUrl}
          onChange={(e) => handleInputChange(e, !!editingProject)}
          placeholder="Image URL"
        />
        <input
          type="url"
          name="projectUrl"
          value={editingProject ? editingProject.projectUrl : newProject.projectUrl}
          onChange={(e) => handleInputChange(e, !!editingProject)}
          placeholder="Project URL"
        />
        <button type="submit">{editingProject ? 'Update Project' : 'Add Project'}</button>
        {editingProject && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>
      <h2>Projects</h2>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <div key={project._id} className={styles.projectItem}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Technologies: {project.technologies.join(', ')}</p>
            <button onClick={() => handleEdit(project)}>Edit</button>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </div>
        ))}
      </div>
      <h2>Contact Submissions</h2>
      <div className={styles.submissionList}>
        {submissions.map((submission) => (
          <div key={submission._id} className={styles.submissionItem}>
            <h3>{submission.name}</h3>
            <p>Email: {submission.email}</p>
            <p>Message: {submission.message}</p>
            <p>Date: {new Date(submission.createdAt).toLocaleString()}</p>
            <p>Status: {submission.isRead ? 'Read' : 'Unread'}</p>
            <button onClick={() => handleMarkAsRead(submission._id)} disabled={submission.isRead}>
              Mark as Read
            </button>
            <button onClick={() => handleDeleteSubmission(submission._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin
