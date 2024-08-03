import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import CommentForm from "./CommentForm";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleBlogUpdate = async () => {
    dispatch(likeBlog(blog));
  };

  const handleBlogDelete = async () => {
    if (
      window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)
    ) {
      dispatch(deleteBlog(blog.id));
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog-card">
      <div className="blog-always-shown">
        <p>{blog.title}</p>
        <p>By {blog.author}</p>
      </div>
      <div className="blog-details">
        <p>{blog.url}</p>
        <p className="like-section">
          Likes: {blog.likes}{" "}
          <button className="heart-button" onClick={handleBlogUpdate}>
            Heart
          </button>{" "}
        </p>
        <p>Added by: {blog.user.name}</p>
        {user ? (
          user.name === blog.user.name ? (
            <button className="remove-button" onClick={handleBlogDelete}>
              Remove
            </button>
          ) : null
        ) : null}
      </div>
      <div className="comment-section">
        <p>Comments</p>
        {user ? <CommentForm blogId={blog.id} /> : null}
        <ul>
          {blog.comments.map((c) => {
            return <p key={c}>{c}</p>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
