import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Qualitie from './qualitie'
import { useDispatch, useSelector } from 'react-redux'
import {
  getQualitiesLoadingStatus,
  loadQualitiesList,
} from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getQualitiesLoadingStatus())

  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  return (
    <>
      {!isLoading
        ? qualities.map((quality) => <Qualitie key={quality} id={quality} />)
        : 'Loading...'}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired,
}

export default QualitiesList
