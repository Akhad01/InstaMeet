import { configureStore, combineReducers } from '@reduxjs/toolkit'
import professionsReducer from './professions'
import qualitiesReducer from './qualities'

const rootReducer = combineReducers({
  professions: professionsReducer,
  qualities: qualitiesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
