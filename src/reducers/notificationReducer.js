import { createSlice, current } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    flag: "",
    message: "",
  },
  reducers: {
    setNotification(state, action) {
      state.flag = action.payload.flag;
      state.message = action.payload.message;
    },
    clearNotification(state, action) {
      return {
        flag: "",
        message: "",
      };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (flag, message, duration) => {
  return async (dispatch) => {
    dispatch(setNotification({ flag, message }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;
