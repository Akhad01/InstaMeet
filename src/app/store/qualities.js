import { createSlice } from '@reduxjs/toolkit'

import qualityService from '../services/quality.service'

const initialState = {
  entities: null,
  error: null,
  isLoading: true,
}

export const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState,
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    qualitiesFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { actions, reducer: qualitiesReducer } = qualitiesSlice

const { qualitiesFailed, qualitiesReceived, qualitiesRequested } = actions

export const loadQualitiesList = () => async (dispatch) => {
  dispatch(qualitiesRequested())
  try {
    const { content } = await qualityService.fetchAll()

    dispatch(qualitiesReceived(content))
  } catch (error) {
    dispatch(qualitiesFailed(error.message))
  }
}

export const getQualities = () => (state) => state.qualities.entities

export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading

export const getQualitiesById = (id) => (state) => {
  if (state.qualities.entities) {
    for (const qualId of state.qualities.entities) {
      if (qualId._id === id) {
        return qualId
      }
    }
  }
}

export default qualitiesReducer
