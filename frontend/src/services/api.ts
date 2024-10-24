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
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
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

export interface User {
  id: string
  username: string
  role: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactSubmission {
  _id: string
  name: string
  email: string
  message: string
  createdAt: string
  isRead: boolean
}

export const api = {
  login: async (username: string, password: string): Promise<{ token: string; user: User }> => {
    const response = await axiosInstance.post('/auth/login', { username, password })
    const { token, user } = response.data
    localStorage.setItem('token', token)
    return { token, user }
  },

  logout: () => {
    localStorage.removeItem('token')
  },

  getProjects: async (
    page: number = 1,
    limit: number = 10,
    sortField: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    filter: string = ''
  ): Promise<{ projects: Project[]; total: number }> => {
    const response = await axiosInstance.get('/projects', {
      params: { page, limit, sortField, sortOrder, filter },
    })
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

  register: async (
    username: string,
    password: string
  ): Promise<{ id: string; username: string }> => {
    const response = await axiosInstance.post('/users/register', { username, password })
    return response.data
  },

  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get('/users/profile')
    return response.data
  },

  updatePassword: async (newPassword: string): Promise<void> => {
    await axiosInstance.patch('/users/password', { newPassword })
  },

  submitContactForm: async (formData: ContactFormData): Promise<void> => {
    const response = await axiosInstance.post('/contact', formData)
    return response.data
  },

  getContactSubmissions: async (
    page: number = 1,
    limit: number = 10,
    sortField: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    filter: string = ''
  ): Promise<{ submissions: ContactSubmission[]; total: number }> => {
    const response = await axiosInstance.get('/contact', {
      params: { page, limit, sortField, sortOrder, filter },
    })
    return response.data
  },

  markContactSubmissionAsRead: async (id: string): Promise<ContactSubmission> => {
    const response = await axiosInstance.patch(`/contact/${id}/read`)
    return response.data
  },

  deleteContactSubmission: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/contact/${id}`)
  },
}
