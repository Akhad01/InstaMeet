import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { toast } from 'react-toastify'

const CommentsContext = React.createContext()

export const useCommentss = () => {
  return useContext(CommentsContext)
}

export const ProfessionProvider = ({ children }) => {
  //   const [isLoading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  //   const [error, setError] = useState(null)

  //   useEffect(() => {
  //     if (error !== null) {
  //       toast.error(error)

  //       setError(null)
  //     }
  //   }, [error])

  //   function errorCatcher(error) {
  //     const { message } = error.response.data

  //     setError(message)
  //     setLoading(false)
  //   }

  useEffect(() => {
    setComments(null)
  }, [])

  return (
    <CommentsContext.Provider value={{ comments }}>
      {children}
    </CommentsContext.Provider>
  )
}

CommentsContext.protoTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
