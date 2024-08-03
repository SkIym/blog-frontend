import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notifications";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { getLoggedInUser, logoutUser } from "./reducers/userReducer";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { initializeUsers } from "./reducers/usersReducer";
import Users from "./components/Users";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeUsers());
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <div id="nav">
        <Link to="/">
          <span>Blogs</span>
        </Link>
        <Link to="/users">
          <span>Users</span>
        </Link>
        {user ? (
          <div className="log-details">
            <p>{user.name} is logged in</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">
            <span>Login</span>
          </Link>
        )}
      </div>
      <Notification />
      <Routes>
        <Route
          path="/users/*"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        ></Route>
        <Route path="/*" element={<Blogs />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/blogs/*" element={<Blogs />}></Route>
      </Routes>
    </div>
  );
};

export default App;
