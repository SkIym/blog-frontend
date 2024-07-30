import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notifications";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { getLoggedInUser } from "./reducers/userReducer";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  if (user) dispatch(initializeBlogs());

  const notifBox = () => <Notification />;

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
          <Blogs />
        </div>
      )}
    </div>
  );
};

export default App;
