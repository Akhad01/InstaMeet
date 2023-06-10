import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import commentService from '../services/comment.service'

const CommentsContext = React.createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

  const { currentUser } = useAuth()
  const { userId } = useParams()

  async function createComment(data) {
    const comments = {
      ...data,
      _id: nanoid(),
      userId: currentUser._id,
      pageId: userId,
      content: data.content,
      created_at: Date.now(),
    }

    try {
      const { content } = await commentService.createComment(comments)
      setComments((prevState) => [...prevState, content])
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId)

      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    if (!error !== null) {
      toast.error(error)

      setError(null)
    }
  }, [error])

  function errorCatcher(error) {
    const { message } = error.response.data

    setError(message)
    setLoading(false)
  }

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id)

      if (content === null) {
        setComments((prevState) => prevState.filter((c) => c._id !== id))
      }
    } catch (error) {
      errorCatcher(error)
    }
  }

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, isLoading, removeComment }}
    >
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
