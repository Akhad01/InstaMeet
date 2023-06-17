import React from 'react'
import { useParams, Navigate } from 'react-router-dom'

import UsersListPage from '../components/page/usersListPage/usersListPage'
import UserPage from '../components/page/userPage'
import UserUpdate from '../components/page/updateUserPage/userUpdate'
import UserProvider from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'

const Users = () => {
  const params = useParams()
  const { userId, edit } = params

  const { currentUser } = useAuth()

  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            userId === currentUser._id ? (
              <UserUpdate />
            ) : (
              <Navigate to={`/users/${currentUser._id}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  )
}

export default Users
