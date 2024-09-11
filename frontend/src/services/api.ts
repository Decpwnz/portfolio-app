import axios from 'axios'

const API_URL = 'http://localhost:3000'

export interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  projectUrl?: string
}

export const api = {
  getProjects: async (): Promise<Project[]> => {
    const response = await axios.get(`${API_URL}/projects`)
    return response.data
  },

  getProject: async (id: string): Promise<Project> => {
    const response = await axios.get(`${API_URL}/projects/${id}`)
    return response.data
  },

  createProject: async (project: Omit<Project, '_id'>): Promise<Project> => {
    const response = await axios.post(`${API_URL}/projects`, project)
    return response.data
  },

  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
    const response = await axios.patch(`${API_URL}/projects/${id}`, project)
    return response.data
  },

  deleteProject: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/projects/${id}`)
  },
}
