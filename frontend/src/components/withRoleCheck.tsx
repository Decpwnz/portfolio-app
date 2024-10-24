import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../app/hooks'

const withRoleCheck =
  (allowedRoles: string[]) =>
  <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return (props: P) => {
      const { user } = useAppSelector((state) => state.auth)

      if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />
      }

      return <WrappedComponent {...props} />
    }
  }

export default withRoleCheck
