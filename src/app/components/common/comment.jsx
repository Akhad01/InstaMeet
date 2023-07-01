import React from 'react'
import { displayDate } from '../../utils/displayData'
import { useUser } from '../../hooks/useUsers'
import { useAuth } from '../../hooks/useAuth'

const Comment = ({
  onRemove,
  userId,
  content,
  _id: id,
  created_at: created,
}) => {
  const { currentUser } = useAuth()
  const { getUserById } = useUser()

  const user = getUserById(userId)

  console.log('user', user)

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            {user && (
              <img
                src={user.image}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
              />
            )}
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {user && user.name}
                    <span className="small"> - {displayDate(created)}</span>
                  </p>
                  {currentUser._id === userId && (
                    <button
                      onClick={() => onRemove(id)}
                      className="btn btn-sm text-primary d-flex align-items-center"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
