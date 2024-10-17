import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import styles from './Admin.module.css'
import { api, Project } from '../../services/api'

function Admin() {
  const [projects, setProjects] = useState<Project[]>([])
  // This state hook manages the form data for a new project
  const [newProject, setNewProject] = useState<Omit<Project, '_id'>>({
    title: '', // Stores the project title
    description: '', // Stores the project description
    technologies: [], // Stores an array of technologies used in the project
    imageUrl: '', // Stores the URL of the project image
    projectUrl: '', // Stores the URL of the project itself
  })
  // The Omit<Project, '_id'> type ensures that newProject has all Project properties except '_id',
  // which is typically assigned by the backend when the project is created

  const navigate = useNavigate()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const fetchedProjects = await api.getProjects()
      setProjects(fetchedProjects)
    } catch (error) {
      // Error will be displayed by the interceptor
      console.error('Failed to fetch projects:', error)
    }
  }

  // This function handles changes in input fields for the new project form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Destructure 'name' and 'value' from the event target (the input element)
    const { name, value } = e.target

    // Update the newProject state using the previous state
    setNewProject((prev) => ({
      ...prev, // Spread the previous state to keep all other properties
      [name]: value, // Update the property that matches the input's 'name' with the new 'value'
    }))
  }
  // Explanation:
  // 1. React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>:
  //    - This is a TypeScript type definition for the event object 'e'
  //    - React.ChangeEvent is a generic type provided by React for change events
  //    - <HTMLInputElement | HTMLTextAreaElement> specifies that this event can come from either
  //      an input element or a textarea element
  //    - This helps TypeScript understand what properties and methods are available on 'e'
  //
  // 2. The function takes this event object 'e' as its parameter
  //
  // 3. We extract 'name' and 'value' from e.target. 'name' corresponds to the input's name attribute,
  //    'value' is the current input value
  //
  // 4. setNewProject updates the state. It uses a callback function that receives the previous state ('prev')
  //
  // 5. Inside the callback, we spread the previous state (...prev) to keep all existing properties
  //
  // 6. [name]: value is using computed property names. It sets the property whose name matches
  //    the input's 'name' to the new 'value'
  //
  // This allows us to use a single function to update any property of newProject, based on the input's 'name' attribute

  // This function handles changes in the technologies input field
  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Split the input value by commas and trim each technology
    const technologies = e.target.value.split(',').map((tech) => tech.trim())
    // Update the newProject state, setting the technologies array
    setNewProject((prev) => ({ ...prev, technologies }))
  }

  // Explanation:
  // 1. This function is specifically for handling changes in the technologies input field.
  // 2. It takes an event object 'e' of type React.ChangeEvent<HTMLInputElement>.
  // 3. It splits the input value by commas and trims each resulting string to create an array of technologies.
  // 4. It then updates the newProject state, keeping all previous properties and updating the technologies array.

  // The reason handleTechnologiesChange only uses HTMLInputElement:
  // - This function is specifically for the technologies input, which is a single-line text input.
  // - Single-line text inputs are always of type HTMLInputElement.

  // In contrast, handleInputChange uses HTMLInputElement | HTMLTextAreaElement:
  // - That function is used for multiple input types, including both single-line inputs (HTMLInputElement)
  //   and multi-line textareas (HTMLTextAreaElement).
  // - By accepting both types, handleInputChange can be used more flexibly across different form elements.

  // This function handles the form submission when creating a new project
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the default form submission behavior
    e.preventDefault()

    // Send a request to the API to create a new project using the current newProject state
    try {
      await api.createProject(newProject)
      setNewProject({ title: '', description: '', technologies: [], imageUrl: '', projectUrl: '' })
      fetchProjects()
      toast.success('Project created successfully')
    } catch (error) {
      // Error will be displayed by the interceptor
      console.error('Failed to create project:', error)
    }
  }

  // Explanation:
  // 1. The function is async because it performs asynchronous operations (API call and fetching projects).
  // 2. It takes a React.FormEvent as a parameter, which represents the form submission event.
  // 3. e.preventDefault() stops the form from submitting in the traditional way, which would cause a page reload.
  // 4. api.createProject(newProject) sends the new project data to the backend API.
  // 5. setNewProject(...) resets the form fields by setting newProject back to its initial state.
  // 6. fetchProjects() is called to update the list of projects, including the newly created one.

  const handleDelete = async (id: string) => {
    try {
      await api.deleteProject(id)
      fetchProjects()
      toast.success('Project deleted successfully')
    } catch (error) {
      // Error will be displayed by the interceptor
      console.error('Failed to delete project:', error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={() => navigate('/')}>Home</button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          value={newProject.title}
          onChange={handleInputChange}
          placeholder="Project Title"
          required
        />
        <textarea
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          placeholder="Project Description"
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
        {/* Explanation:
        1. This is an input field for entering technologies used in a project.
        2. The 'value' attribute is set to newProject.technologies.join(', '):
           - newProject.technologies is likely an array of strings
           - .join(', ') converts this array into a comma-separated string
           - For example, if technologies = ['React', 'TypeScript', 'CSS'],
             the value would be "React, TypeScript, CSS"
        3. This allows the user to see and edit the technologies as a single string,
           while the data is stored as an array in the component's state.
        4. The onChange handler (handleTechnologiesChange) would be responsible for
           splitting this string back into an array when the input changes.
        5. The placeholder suggests the expected input format to the user.
        6. The field is marked as required, ensuring the user provides at least one technology. */}
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
