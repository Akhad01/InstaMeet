import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, Navigate } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'

const ProtectedRoute = ({ component: Component, children }) => {
  const { currentUser } = useAuth()

  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} />
  }

  return Component ? Component : children
}

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default ProtectedRoute
