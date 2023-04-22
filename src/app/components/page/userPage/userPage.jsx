import React, { useEffect, useState } from 'react'

import qualities from '../../../api/fake.api/user.api'
import UserCard from '../../ui/userCard'
import MeetingsCard from '../../ui/meetingsCard'
import QualitiesCard from '../../ui/qualitiesCard'
import Comments from '../../ui/comments'

const UserPage = ({ userId }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    qualities.getById(userId).then((data) => {
      return setUser(data)
    })
  }, [userId])

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
                <Comments />
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
