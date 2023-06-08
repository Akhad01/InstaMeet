import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'
import qualityService from '../services/quality.service'

const QualitiesContext = React.createContext()

export const useQualities = () => {
  return useContext(QualitiesContext)
}

const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [error, setError] = useState()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function getQualities() {
      try {
        const { content } = await qualityService.fetchAll()
        setQualities(content)
        setLoading(false)
      } catch (error) {
        errorCatcher(error)
      }
    }

    getQualities()
  }, [])

  useEffect(() => {
    if (!error !== null) {
      toast.error(error)

      setError(null)
    }
  }, [error])

  const getQuality = (id) => {
    return qualities.find((quality) => quality._id === id)
  }

  function errorCatcher(error) {
    const { message } = error.response.data

    setError(message)
  }

  return (
    <QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>
      {children}
    </QualitiesContext.Provider>
  )
}

export default QualitiesProvider

QualitiesProvider.protoTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
