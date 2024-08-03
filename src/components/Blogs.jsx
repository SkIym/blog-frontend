import { useRef } from "react";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useSelector } from "react-redux";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import Blog from "./Blog";
import { selectSortedBlogs } from "../hooks";

const Blogs = () => {
  const blogs = useSelector(selectSortedBlogs); // memo via createSelector (sorter)
  const blogFormRef = useRef();

  const toggleForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  return (
    <div className="content-display">
      <h1 className="page-title">Blogs</h1>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Togglable
                buttonLabel="Add New Blog"
                className="blog-form-container"
                ref={blogFormRef}
              >
                <BlogForm toggleForm={toggleForm} />
              </Togglable>
              <div className="content-list">
                <div>
                  {blogs.length === 0 ? (
                    <div>No blogs yet</div>
                  ) : (
                    blogs.map((blog) => {
                      return (
                        <div key={blog.id} className="blog-card">
                          <Link to={`/blogs/${blog.id}`}>
                            <p>{blog.title}</p>
                          </Link>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          }
        ></Route>
        <Route path="/:id" element={<Blog blog={blog} />}></Route>
      </Routes>
    </div>
  );
};

export default Blogs;
