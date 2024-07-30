import { useRef } from "react";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { logoutUser } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const Blogs = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);
  const blogFormRef = useRef();

  const toggleForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <div className="log-details">
        <p>{name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable
        buttonLabel="Add New Blog"
        className="blog-form-container"
        ref={blogFormRef}
      >
        <BlogForm toggleForm={toggleForm} />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default Blogs;
