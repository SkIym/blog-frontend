import { useField } from '../hooks'
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = ({ toggleForm }) => {
  const { reset: titleReset, ...title } = useField('text')
  const { reset: authorReset, ...author } = useField('text')
  const { reset: linkReset, ...link } = useField('text')

  const dispatch = useDispatch()
  const addBlog = async (e) => {
    e.preventDefault();
    try {
      dispatch(createBlog(title.value, author.value, link.value))
      toggleForm()
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <h4>Create new blog</h4>
      <form onSubmit={addBlog} className="blog-form">
        <div>
          <span>Title:</span>
          <input
            {...title}
            placeholder="Title"
            data-testid="title"
          />
        </div>
        <div>
          <span>Author:</span>
          <input
            {...author}
            placeholder="Author"
            data-testid="author"
          />
        </div>
        <div>
          <span>Link:</span>
          <input
            {...link}
            placeholder="URL"
            data-testid="link"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  toggleForm: PropTypes.func.isRequired
}
export default BlogForm;
