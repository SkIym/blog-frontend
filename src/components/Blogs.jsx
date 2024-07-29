import { useRef } from "react";
import PropTypes from "prop-types";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blogs = ({
  name,
  handleLogout,
  updateBlog,
  deleteBlog,
  user,
}) => {
  const blogFormRef = useRef();

  const toggleForm = () => {
    blogFormRef.current.toggleVisibility()
  }

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
        <BlogForm toggleForm={toggleForm}/>
      </Togglable>
      <BlogList
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        user={user}
      />
    </div>
  );
};

Blogs.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default Blogs;
