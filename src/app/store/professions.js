import { createSlice } from '@reduxjs/toolkit'

import professionService from '../services/profession.service'
import isOutdated from '../utils/isOutdated'

const initialState = {
  entities: null,
  error: null,
  isLoading: true,
  lastFetch: null,
}

export const professionsSlice = createSlice({
  name: 'professions',
  initialState,
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { actions, reducer: professionsReducer } = professionsSlice

const { professionsFailed, professionsReceived, professionsRequested } = actions

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions

  if (isOutdated(lastFetch)) {
    dispatch(professionsRequested())
    try {
      const { content } = await professionService.get()

      dispatch(professionsReceived(content))
    } catch (error) {
      dispatch(professionsFailed(error.message))
    }
  }
}

export const getProfessions = () => (state) => state.professions.entities

export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading

export const getProfessionById = (id) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find((p) => {
      return p._id === id
    })
  }
}

export default professionsReducer
