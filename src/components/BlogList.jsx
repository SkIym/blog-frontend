import { useSelector } from "react-redux";
import Blog from "./Blog";
import PropTypes from "prop-types";

const BlogList = ({ updateBlog, deleteBlog, user }) => {
  const blogs = useSelector(state => state.blogs)
  return (
    <div>
      {blogs.length === 0 ? (
        <div>No blogs yet</div>
      ) : (
        blogs.map((blog) => {
          let showRemoveBtn = false;
          if (blog.user.username === user) {
            showRemoveBtn = true;
          }
          return (
            <Blog
              blog={blog}
              key={blog.id}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              showRemoveBtn={showRemoveBtn}
            />
          );
        })
      )}
    </div>
  );
};

BlogList.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default BlogList;
