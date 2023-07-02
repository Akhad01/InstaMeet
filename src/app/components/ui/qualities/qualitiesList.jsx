import React from 'react'
import PropTypes from 'prop-types'

import Qualitie from './qualitie'
import { useSelector } from 'react-redux'
import { getQualitiesLoadingStatus } from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
  const isLoading = useSelector(getQualitiesLoadingStatus())

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
