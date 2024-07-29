import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Notification from "./components/Notifications";

import "./App.css";
import { useDispatch } from "react-redux";
import { showNotification } from "./reducers/notificationReducer";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    const loadData = async () => {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    };
    if (loggedUserJSON) loadData();
  }, []);

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    } catch (error) {
      // no error message component yet
      dispatch(showNotification('error', error, 4))
      return Promise.reject();
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
    setBlogs([]);
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs([...blogs, returnedBlog]);
      dispatch(showNotification('success', `A new blog: ${returnedBlog.title} by ${returnedBlog.author} was added`, 2))
    } catch (error) {
      dispatch(showNotification('error', error, 2))
      return Promise.reject();
    }
  };

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
  let blogsToShow = blogs.sort((b, a) => a.likes - b.likes);
  // blogsToShow = blogsToShow.filter((blog) => {

  //     // the problem is here, the returnedblog (added to the state by line 81) only consists of the user id property, unlike when you get all the blogs from the start which populates that property with the username

  //     // either change how the backend responds, or change how you check which blogs are whom in the frontend

  //     //update: temporary fix on backend side (populate model before sending to frontend)
  //     return blog.user.username === user.username
  // }
  // )

  return (
    <div className="blog-display">
      {user === null ? (
        <div>
          <h3>Log in to application</h3>
          {notifBox()}
          <LoginForm loginUser={handleLogin} />
        </div>
      ) : (
        <div>
          <h3>Blogs</h3>
          {notifBox()}
          <Blogs
            blogs={blogsToShow}
            name={user.name}
            handleLogout={handleLogout}
            createBlog={addBlog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user.username}
          />
        </div>
      )}
    </div>
  );
};

export default App;
