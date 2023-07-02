import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getQualitiesById } from '../../../store/qualities'

const Qualitie = ({ id }) => {
  const { color, name, _id } = useSelector(getQualitiesById(id))

  return (
    <span key={_id} className={`badge bg-${color} m-1`}>
      {name}
    </span>
  )
}

Qualitie.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Qualitie
