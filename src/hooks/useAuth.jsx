import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import userService from '../app/services/user.service'
import localStorageService, {
  setToken,
} from '../app/services/localStorage.service'
import { useNavigate } from 'react-router-dom'

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
})

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [currentUser, setUser] = useState()
  const [isLoading, setLoading] = useState(true)

  const navigate = useNavigate()

  function logOut() {
    localStorageService.deleteToken()
    setUser(null)
    navigate('/')
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true,
      })

      setToken(data)

      await createUser({
        _id: data.localId,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 250),
        email,
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest,
      })
    } catch (error) {
      errorCatcher(error)

      const { code, message } = error.response.data.error

      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким Email уже существует',
          }
          throw errorObject
        }
      }
    }
  }

  async function signIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
      })

      setToken(data)
      await getUserData()
    } catch (error) {
      setError(error)

      const { code, message } = error.response.data.error
      if (code === 400) {
        switch (message) {
          case 'INVALID_PASSWORD':
            throw new Error('Email или пароль введены не правильно')

          default:
            throw new Error('Слишком много попыток входа. Пропробуйте позднее')
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data)

      setUser(content)
    } catch (error) {
      setError(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data

    setError(message)
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser()
      setUser(content)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!error !== null) {
      toast.error(error)

      setError(null)
    }
  }, [error])
  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser, logOut }}>
      {!isLoading ? children : 'Loading...'}
    </AuthContext.Provider>
  )
}

AuthContext.protoTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
