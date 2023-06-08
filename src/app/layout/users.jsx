import React from 'react'
import { useParams } from 'react-router-dom'

import UsersListPage from '../components/page/usersListPage/usersListPage'
import UserPage from '../components/page/userPage'
import UserUpdate from '../components/page/updateUserPage/userUpdate'
import UserProvider from '../hooks/useUsers'

const Users = () => {
  const params = useParams()
  const { userId, edit } = params

  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            <UserUpdate />
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
