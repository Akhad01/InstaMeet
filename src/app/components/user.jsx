import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getById } from '../api/fake.api/user.api'
import QualitiesList from './qualitiesList'

const User = () => {
  const params = useParams()

  const [user, setUser] = useState()

  useEffect(() => {
    getById(params.userId).then((data) => {
      return setUser(data)
    })
  }, [params.userId])

  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <h3>Профессия: {user.profession.name}</h3>
          <QualitiesList qualities={user.qualities} />
          <p>completedMeetings: {user.completedMeetings}</p>

          <h2>Rate: {user.rate}</h2>
          <Link to="/users" className="btn btn-info">
            Все пользователи
          </Link>
        </div>
      )}
    </div>
  )
}

export default User
