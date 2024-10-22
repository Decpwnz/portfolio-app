import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../app/hooks'

function AdminRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return children
}

export default AdminRoute
