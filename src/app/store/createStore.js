import { configureStore, combineReducers } from '@reduxjs/toolkit'
import professionsReducer from './professions'
import qualitiesReducer from './qualities'
import usersReducer from './users'
import commentsReducer from './comments'

const rootReducer = combineReducers({
  professions: professionsReducer,
  qualities: qualitiesReducer,
  users: usersReducer,
  comments: commentsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
