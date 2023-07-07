import { configureStore, combineReducers } from '@reduxjs/toolkit'
import professionsReducer from './professions'
import qualitiesReducer from './qualities'
import usersReducer from './users'

const rootReducer = combineReducers({
  professions: professionsReducer,
  qualities: qualitiesReducer,
  users: usersReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
