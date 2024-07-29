import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import Notification from "./components/Notifications";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { getLoggedInUser, loginUser } from "./reducers/userReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [])

  if (user) dispatch(initializeBlogs())


  const updateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject, blogObject.id);
      setBlogs(
        blogs.map((blog) =>
          blog.id === returnedBlog.id ? returnedBlog : blog,
        ),
      );
    } catch (error) {
      return Promise.reject();
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      dispatch(showNotification('error', error, 2))
      return Promise.reject();
    }
  };

  const notifBox = () => <Notification/>;

  return (
    <div className="blog-display">
      {user === null ? (
        <div>
          <h3>Log in to application</h3>
          {notifBox()}
          <LoginForm />
        </div>
      ) : (
        <div>
          <h3>Blogs</h3>
          {notifBox()}
          <Blogs
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        </div>
      )}
    </div>
  );
};

export default App;
