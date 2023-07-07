import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../../store/users'

const UserCard = ({ user, userId }) => {
  const history = useNavigate()

  const currentUserId = useSelector(getCurrentUserId())

  const handleClick = () => {
    history(`/users/${userId}/edit`)
  }
  return (
    <div className="card mb-3">
      <div className="card-body">
        {user._id === currentUserId && (
          <button
            onClick={handleClick}
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
          >
            <i className="bi bi-gear"></i>
          </button>
        )}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          {user.image && (
            <img
              src={user.image}
              className="rounded-circle"
              alt="avatar"
              width="150"
            />
          )}
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
