import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'

const CommentsContext = React.createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  //   const [isLoading, setLoading] = useState(true)
  const [comments, setComments] = useState([])

  const { currentUser } = useAuth()
  const { userId } = useParams()

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

  async function createComment(data) {
    const comments = {
      ...data,
      _id: nanoid(),
      userId: currentUser._id,
      pageId: userId,
      content: data.content,
      created_at: Date.now(),
    }
    console.log('comments', comments)
  }

  useEffect(() => {
    setComments(null)
  }, [])

  return (
    <CommentsContext.Provider value={{ comments, createComment }}>
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
