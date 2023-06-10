import React from 'react'

import CommentComponents from './commentComponents'
import AddCommentForm from '../common/addCommentForm'
import { orderBy } from 'lodash'
import { useComments } from '../../hooks/useComments'

const Comments = () => {
  const { createComment, comments, removeComment } = useComments()

  const handleRemoveComment = (id) => {
    removeComment(id)
  }

  const handleSubmit = (data) => {
    createComment(data)
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
