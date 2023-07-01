import { configureStore, combineReducers } from '@reduxjs/toolkit'
import professionsReducer from './professions'

const rootReducer = combineReducers({
  professions: professionsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
