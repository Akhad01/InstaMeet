import React from 'react'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'

const Qualitie = ({ id }) => {
  const { getQuality } = useQualities()
  const { color, name, _id } = getQuality(id)

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
