import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { loadProfessionsList } from '../../../store/professions'
import { loadQualitiesList } from '../../../store/qualities'
import {
  getIsLoggedId,
  getUsersLoadingStatus,
  loadUsersList,
} from '../../../store/users'

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(getIsLoggedId())
  const usersStatusLoading = useSelector(getUsersLoadingStatus())

  useEffect(() => {
    dispatch(loadProfessionsList())
    dispatch(loadQualitiesList())
    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [isLoggedIn])

  if (usersStatusLoading) {
    return 'loading...'
  }

  return children
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default AppLoader
