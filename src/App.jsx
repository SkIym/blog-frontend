import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Notification from './components/Notifications'

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { getLoggedInUser, logoutUser } from "./reducers/userReducer";
import {
  Routes, Route
} from "react-router-dom"
import { initializeUsers } from "./reducers/usersReducer";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [user, dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div className="blog-display">
      {user === null ? (
        <div>
          <h3>Log in to application</h3>
          <Notification/>
          <LoginForm />
        </div>
      ) : (
        <div>
          <Notification/>
          <div className="log-details">
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <Routes>
            <Route path="/users/*" element={<Users/>}></Route>
            <Route path="/" element={<Blogs/>}></Route>
          </Routes>
        </div>

      )}

    </div>
  );

};

export default App;
