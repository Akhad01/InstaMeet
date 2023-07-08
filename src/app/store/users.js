import { createAction, createSlice } from '@reduxjs/toolkit'

import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import { getRandomInt } from '../utils/getRandomInt'
import generateAuthError from '../utils/generateAuthError'

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      error: null,
      isLoading: true,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoadded: false,
    }
  : {
      entities: null,
      error: null,
      isLoading: false,
      auth: null,
      isLoggedIn: false,
      dataLoadded: false,
    }

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoadded = true
      state.isLoading = false
    },
    usersFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestedSuccess: (state, actions) => {
      state.auth = actions.payload
      state.isLoggedIn = true
    },
    authRequestedFailed: (state, actions) => {
      state.error = actions.payload
    },
    userCreated: (state, actions) => {
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push(actions.payload)
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoadded = false
    },

    userUpdateSuccess: (state, actions) => {
      state.entities[
        state.entities.findIndex((elem) => elem._id === actions.payload._id)
      ] = actions.payload
    },
    authRequested: (state) => {
      state.error = null
    },
  },
})

const { actions, reducer: usersReducer } = usersSlice

const {
  usersFailed,
  usersReceived,
  usersRequested,
  authRequestedSuccess,
  authRequestedFailed,
  userCreated,
  userLoggedOut,
  userUpdateSuccess,
} = actions

const authRequested = createAction('users/authRequested')

const userCreateRequested = createAction('users/userCreateRequested')
const userCreateRequestedFailed = createAction(
  'users/userCreateRequestedFailed'
)

const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export const login =
  ({ email, password }, redirect, navigate) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.signIn({ email, password })

      dispatch(authRequestedSuccess({ userId: data.localId }))
      localStorageService.setToken(data)

      navigate(redirect)
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorMessage = generateAuthError(message)
        dispatch(authRequestedFailed(errorMessage))
      } else {
        dispatch(authRequestedFailed(error.message))
      }
    }
  }

export const signUp =
  ({ email, password, ...rest }, navigate) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.signUp({ email, password })

      localStorageService.setToken(data)

      dispatch(authRequestedSuccess({ userId: data.localId }))

      dispatch(
        createUser({
          _id: data.localId,
          rate: getRandomInt(1, 5),
          completedMeetings: getRandomInt(0, 250),
          email,
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest,
          navigate,
        })
      )
    } catch (error) {
      authRequestedFailed(error.message)
    }
  }

export const updateUser = (payload, navigate) => async (dispatch) => {
  dispatch(userUpdateRequested())
  try {
    const { content } = await userService.updateUser(payload)

    dispatch(userUpdateSuccess(content))
    navigate(`/users/${payload._id}`)
  } catch (error) {
    dispatch(userUpdateFailed(error.message))
  }
}

export const logOut = (navigate) => (dispatch) => {
  localStorageService.deleteToken()
  dispatch(userLoggedOut())
  navigate('/')
}

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested())

    try {
      const { content } = await userService.create(payload)

      dispatch(userCreated(content))
      payload.navigate('/')
    } catch (error) {
      dispatch(userCreateRequestedFailed(error.message))
    }
  }
}

export const loadUsersList = () => async (dispatch, getState) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()

    dispatch(usersReceived(content))
  } catch (error) {
    dispatch(usersFailed(error.message))
  }
}

export const getIsLoggedId = () => (state) => state.users.isLoggedIn

export const getDataStatus = () => (state) => state.users.dataLoadded

export const getUsersById = (id) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((elem) => elem._id === id)
  }
}

export const getUsers = () => (state) => state.users.entities

export const getUsersLoadingStatus = () => (state) => state.users.isLoading

export const getCurrentUserId = () => (state) => state.users.auth.userId

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null
}

export const getAuthError = () => (state) => state.users.error

export default usersReducer
