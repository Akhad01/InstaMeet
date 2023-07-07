import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { getIsLoggedId } from '../../store/users'

const ProtectedRoute = ({ component: Component, children }) => {
  const isLoggedIn = useSelector(getIsLoggedId())

  const location = useLocation()

  if (!isLoggedIn) {
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
