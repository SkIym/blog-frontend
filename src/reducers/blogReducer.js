import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
      return state;
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      return state.map((blog) => (blog.id === id ? action.payload : blog));
    },
  },
});

export const { setBlogs, appendBlog, removeBlog, updateBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create({ title, author, url });
      dispatch(appendBlog(newBlog));
      dispatch(
        showNotification(
          "success",
          `A new blog: ${title} by ${author} was added`,
          2,
        ),
      );
    } catch (err) {
      return;
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.update(
      { ...blog, likes: blog.likes + 1 },
      blog.id,
    );
    dispatch(updateBlog(returnedBlog));
  };
};

export const commentBlog = (id, content) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(id, { content });
    dispatch(updateBlog(commentedBlog));
  };
};

export default blogSlice.reducer;
