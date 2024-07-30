import { useRef } from "react";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useSelector } from "react-redux";


const Blogs = () => {
  const name = useSelector((state) => state.user.name);
  const blogFormRef = useRef();

  const toggleForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <h2>Blogs</h2>
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
