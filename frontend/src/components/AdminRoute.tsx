import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../app/hooks'

interface AdminRouteProps {
  children: React.ReactElement
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return children
}

export default AdminRoute
