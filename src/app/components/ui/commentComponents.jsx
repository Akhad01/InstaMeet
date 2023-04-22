import React from 'react'
import PropTypes from 'prop-types'

import Comment from '../common/comment'

const CommentComponents = ({ comments, onRemove }) => {
  return comments.map((comment) => (
    <Comment key={comment._id} {...comment} onRemove={onRemove} />
  ))
}

CommentComponents.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func,
}

export default CommentComponents
