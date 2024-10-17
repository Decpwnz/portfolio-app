import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const API_URL = 'http://localhost:3000'

const axiosInstance = axios.create({
  baseURL: API_URL,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      (error.response?.data as { message?: string })?.message || 'An unexpected error occurred'
    toast.error(message)
    return Promise.reject(error)
  }
)

export interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  projectUrl?: string
}

export const api = {
  login: async (username: string, password: string): Promise<string> => {
    const response = await axiosInstance.post('/auth/login', { username, password })
    const token = response.data.access_token
    localStorage.setItem('token', token)
    return token
  },

  logout: () => {
    localStorage.removeItem('token')
  },

  getProjects: async (): Promise<Project[]> => {
    const response = await axiosInstance.get('/projects')
    return response.data
  },

  getProject: async (id: string): Promise<Project> => {
    const response = await axiosInstance.get(`/projects/${id}`)
    return response.data
  },
  createProject: async (project: Omit<Project, '_id'>): Promise<Project> => {
    const response = await axiosInstance.post('/projects', project)
    toast.success('Project created successfully')
    return response.data
  },

  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
    const response = await axiosInstance.patch(`/projects/${id}`, project)
    return response.data
  },

  deleteProject: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/projects/${id}`)
  },
}
