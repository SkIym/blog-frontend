import { useSelector } from "react-redux";
import Blog from "./Blog";
import { selectSortedBlogs } from "../hooks";

const BlogList = () => {
  const blogs = useSelector(selectSortedBlogs); // memo via createSelector
  const user = useSelector((state) => state.user.username);
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
            <Blog blog={blog} key={blog.id} showRemoveBtn={showRemoveBtn} />
          );
        })
      )}
    </div>
  );
};

export default BlogList;
