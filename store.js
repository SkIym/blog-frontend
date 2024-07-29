import blogReducer from './src/reducers/blogReducer'
import notificationReducer from './src/reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer
  }
})

export default store