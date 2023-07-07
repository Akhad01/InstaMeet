import React from 'react'
import { useParams, Navigate } from 'react-router-dom'

import UsersListPage from '../components/page/usersListPage/usersListPage'
import UserPage from '../components/page/userPage'
import UserUpdate from '../components/page/updateUserPage/userUpdate'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'
import UsersLoader from '../components/ui/hoc/usersLoader'

const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  const currentUserId = useSelector(getCurrentUserId())

  return (
    <>
      <UsersLoader>
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <UserUpdate />
            ) : (
              <Navigate to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  )
}

export default Users
