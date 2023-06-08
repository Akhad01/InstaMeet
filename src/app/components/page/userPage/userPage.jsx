import React from 'react'

import UserCard from '../../ui/userCard'
import MeetingsCard from '../../ui/meetingsCard'
import QualitiesCard from '../../ui/qualitiesCard'
import Comments from '../../ui/comments'
import { useUser } from '../../../hooks/useUsers'
import { CommentsProvider } from '../../../hooks/useComments'

const UserPage = ({ userId }) => {
  const { getUserById } = useUser()

  const user = getUserById(userId)

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
