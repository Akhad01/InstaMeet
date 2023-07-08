import { createAction, createSlice, nanoid } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import { getCurrentUserId } from './users'

const initialState = {
  entities: null,
  error: null,
  isLoading: true,
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentsRemove: (state, actions) => {
      state.entities = state.entities.filter(
        (elem) => elem._id !== actions.payload
      )
    },
    commentsCreate: (state, actions) => {
      state.entities.push(actions.payload)
    },
  },
})

const { actions, reducer: commentsReducer } = commentsSlice

const {
  commentsFailed,
  commentsReceived,
  commentsRequested,
  commentsRemove,
  commentsCreate,
} = actions

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)

    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsFailed(error.message))
  }
}

const commentsRemoveRequested = createAction('comments/commentsRemoveRequested')

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentsRemoveRequested())
  try {
    const { content } = await commentService.removeComment(id)
    if (content === null) {
      dispatch(commentsRemove(id))
    }
  } catch (error) {
    dispatch(commentsFailed(error.message))
  }
}

export const createComment = (payload) => async (dispatch, getState) => {
  const comments = {
    ...payload,
    _id: nanoid(),
    // userId: getState().users._id,
    userId: getCurrentUserId()(getState()),
    content: payload.content,
    created_at: Date.now(),
  }

  try {
    const { content } = await commentService.createComment(comments)

    dispatch(commentsCreate(content))
  } catch (error) {
    dispatch(commentsFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities

export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
