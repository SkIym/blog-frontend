import notificationReducer from './src/reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notification: notificationReducer
  }
})

export default store