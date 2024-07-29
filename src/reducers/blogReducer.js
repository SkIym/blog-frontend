import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'
import { showNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((b, a) => a.likes - b.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
      return state.sort((b, a) => a.likes - b.likes)
    }
  }
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      dispatch(appendBlog(newBlog))
      dispatch(showNotification('success', `A new blog: ${title} by ${author} was added`, 2))
    } catch(err) {
      dispatch(showNotification('error', err, 3))
    }

  }
}



export default blogSlice.reducer