import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getById } from '../../../api/fake.api/user.api'
import QualitiesList from '../../ui/qualities/qualitiesList'

const UserPage = ({ userId }) => {
  const history = useNavigate()

  const [user, setUser] = useState()

  useEffect(() => {
    getById(userId).then((data) => {
      return setUser(data)
    })
  }, [userId])

  const handleClick = () => {
    history(`/users/${userId}/edit`)
  }

  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <h3>Профессия: {user.profession.name}</h3>
          <QualitiesList qualities={user.qualities} />
          <p>completedMeetings: {user.completedMeetings}</p>

          <h2>Rate: {user.rate}</h2>
          <button onClick={handleClick} className="btn btn-info">
            Изменить
          </button>
        </div>
      )}
    </div>
  )
}

export default UserPage
