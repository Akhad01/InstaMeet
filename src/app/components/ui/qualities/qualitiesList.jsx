import React from 'react'
import PropTypes from 'prop-types'

import Qualitie from './qualitie'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQualities()

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
