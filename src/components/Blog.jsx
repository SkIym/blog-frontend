import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteBlog, updateBlog } from "../reducers/blogReducer";

const Blog = ({ blog, showRemoveBtn }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const handleBlogUpdate = async () => {
    dispatch(updateBlog(blog));
  };

  const handleBlogDelete = async () => {
    if (
      window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)
    ) {
      dispatch(deleteBlog(blog.id));
    }
  };

  return (
    <div className="blog-card">
      <div className="blog-always-shown">
        <p>{blog.title}</p>
        <p>By {blog.author}</p>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide" : "View"}
        </button>
      </div>
      {showDetails ? (
        <div className="blog-details">
          <p>{blog.url}</p>
          <p className="like-section">
            Likes: {blog.likes}{" "}
            <button className="heart-button" onClick={handleBlogUpdate}>
              Heart
            </button>{" "}
          </p>
          <p>Added by: {blog.user.name}</p>
          {showRemoveBtn ? (
            <button className="remove-button" onClick={handleBlogDelete}>
              Remove
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  showRemoveBtn: PropTypes.bool.isRequired,
};

export default Blog;
