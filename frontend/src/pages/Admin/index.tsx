import React, { useState, useEffect, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import styles from './Admin.module.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Pagination from '../../components/Pagination/Pagination'
import { ITEMS_PER_PAGE } from '../../constants/pagination'
import {
  fetchContactSubmissions,
  markSubmissionAsRead,
  deleteContactSubmission,
  setSubmissionsSortField,
  setSubmissionsSortOrder,
  setSubmissionsFilter,
} from '../../features/contactSubmissions/contactSubmissionsSlice'
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  setSortField,
  setSortOrder,
  setFilter,
} from '../../features/projects/projectsSlice'
import { Project } from '../../services/api'

function Admin() {
  const [newProject, setNewProject] = useState<Omit<Project, '_id'>>({
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
    projectUrl: '',
  })
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [projectsPage, setProjectsPage] = useState(1)
  const [submissionsPage, setSubmissionsPage] = useState(1)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const projectsData = useAppSelector((state) => state.projects)
  const submissionsData = useAppSelector((state) => state.contactSubmissions)

  const memoizedProjectsFetch = useMemo(() => {
    return () =>
      dispatch(
        fetchProjects({
          page: projectsPage,
          limit: ITEMS_PER_PAGE,
          sortField: projectsData.sortField,
          sortOrder: projectsData.sortOrder,
          filter: projectsData.filter,
        })
      )
  }, [dispatch, projectsPage, projectsData.sortField, projectsData.sortOrder, projectsData.filter])

  const memoizedSubmissionsFetch = useMemo(() => {
    return () =>
      dispatch(
        fetchContactSubmissions({
          page: submissionsPage,
          limit: ITEMS_PER_PAGE,
          sortField: submissionsData.sortField,
          sortOrder: submissionsData.sortOrder,
          filter: submissionsData.filter,
        })
      )
  }, [
    dispatch,
    submissionsPage,
    submissionsData.sortField,
    submissionsData.sortOrder,
    submissionsData.filter,
  ])

  useEffect(() => {
    memoizedProjectsFetch()
    memoizedSubmissionsFetch()
  }, [memoizedProjectsFetch, memoizedSubmissionsFetch])

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

  const handleProjectsPageChange = (page: number) => {
    setProjectsPage(page)
  }

  const handleSubmissionsPageChange = (page: number) => {
    setSubmissionsPage(page)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortField, newSortOrder] = event.target.value.split(':')
    dispatch(setSortField(newSortField))
    dispatch(setSortOrder(newSortOrder as 'asc' | 'desc'))
  }

  const handleSubmissionsSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortField, newSortOrder] = event.target.value.split(':')
    dispatch(setSubmissionsSortField(newSortField))
    dispatch(setSubmissionsSortOrder(newSortOrder as 'asc' | 'desc'))
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(event.target.value))
  }

  const handleSubmissionsFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSubmissionsFilter(event.target.value))
  }

  const renderSkeleton = () => (
    <>
      <div className={`${styles.form} ${styles.skeleton}`} style={{ height: '300px' }} />
      <div className={styles.projectList}>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`${styles.projectItem} ${styles.skeleton}`}
            style={{ height: '150px' }}
          />
        ))}
      </div>
      <div className={styles.submissionList}>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`${styles.submissionItem} ${styles.skeleton}`}
            style={{ height: '150px' }}
          />
        ))}
      </div>
    </>
  )

  if (projectsData.loading || submissionsData.loading)
    return <div className={styles.container}>{renderSkeleton()}</div>
  if (projectsData.error || submissionsData.error)
    return (
      <div className={styles.container}>Error: {projectsData.error || submissionsData.error}</div>
    )

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          Back to Home
        </button>
      </header>
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
      <div className={styles.controls}>
        <select
          onChange={handleSortChange}
          value={`${projectsData.sortField}:${projectsData.sortOrder}`}
        >
          <option value="createdAt:desc">Newest First</option>
          <option value="createdAt:asc">Oldest First</option>
          <option value="title:asc">Title A-Z</option>
          <option value="title:desc">Title Z-A</option>
        </select>
        <input
          type="text"
          placeholder="Filter projects..."
          value={projectsData.filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className={styles.projectList}>
        {projectsData.projects.map((project) => (
          <div key={project._id} className={styles.projectItem}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Technologies: {project.technologies.join(', ')}</p>
            <button onClick={() => handleEdit(project)}>Edit</button>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={projectsData.currentPage}
        totalItems={projectsData.total}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handleProjectsPageChange}
      />
      <h2>Contact Submissions</h2>
      <div className={styles.controls}>
        <select
          onChange={handleSubmissionsSortChange}
          value={`${submissionsData.sortField}:${submissionsData.sortOrder}`}
        >
          <option value="createdAt:desc">Newest First</option>
          <option value="createdAt:asc">Oldest First</option>
          <option value="name:asc">Name A-Z</option>
          <option value="name:desc">Name Z-A</option>
        </select>
        <input
          type="text"
          placeholder="Filter submissions..."
          value={submissionsData.filter}
          onChange={handleSubmissionsFilterChange}
        />
      </div>
      <div className={styles.submissionList}>
        {submissionsData.submissions.map((submission) => (
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
      <Pagination
        currentPage={submissionsData.currentPage}
        totalItems={submissionsData.total}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handleSubmissionsPageChange}
      />
    </div>
  )
}

export default Admin
