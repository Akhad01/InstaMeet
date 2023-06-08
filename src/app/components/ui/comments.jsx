import React, { useEffect, useState } from 'react'

import CommentComponents from './commentComponents'
import api from '../../api'
import AddCommentForm from '../common/addCommentForm'
import { orderBy } from 'lodash'
import { useParams } from 'react-router-dom'
import { useComments } from '../../hooks/useComments'

const Comments = () => {
  const { userId } = useParams()
  const [comments, setComments] = useState([])

  const { createComment } = useComments()

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRemoveComment = (id) => {
    api.comments.remove(id).then((data) => {
      setComments(comments.filter((del) => del._id !== data))
    })
  }

  const handleSubmit = (data) => {
    createComment(data)

    // api.comments
    //   .add({
    //     ...data,
    //     pageId: userId,
    //   })
    //   .then((data) => setComments([...comments, data]))
  }

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>

      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            <CommentComponents
              onRemove={handleRemoveComment}
              comments={sortedComments}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
