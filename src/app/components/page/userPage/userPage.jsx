import React from 'react'

import UserCard from '../../ui/userCard'
import MeetingsCard from '../../ui/meetingsCard'
import QualitiesCard from '../../ui/qualitiesCard'
import Comments from '../../ui/comments'
import { CommentsProvider } from '../../../hooks/useComments'
import { useSelector } from 'react-redux'
import { getUsersById } from '../../../store/users'

const UserPage = ({ userId }) => {
  const user = useSelector(getUsersById(userId))

  if (user) {
    return (
      <div>
        {user && (
          <div className="container">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <UserCard user={user} userId={userId} />
                <QualitiesCard user={user} />
                <MeetingsCard value={user.completedMeetings} />
              </div>
              <div className="col-md-8">
                <CommentsProvider>
                  <Comments />
                </CommentsProvider>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}

export default UserPage
