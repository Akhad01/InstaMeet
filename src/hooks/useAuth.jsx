import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import userService from '../app/services/user.service'
import { setToken } from '../app/services/localStorage.service'

const httpAuth = axios.create({
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

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true,
      })

      setToken(data)

      await createUser({ _id: data.localId, email, ...rest })
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
      console.log('content', content)
    } catch (error) {
      setError(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data

    setError(message)
  }

  useEffect(() => {
    if (!error !== null) {
      toast.error(error)

      setError(null)
    }
  }, [error])
  return (
    <AuthContext.Provider value={{ signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContext.protoTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
