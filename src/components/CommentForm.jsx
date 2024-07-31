import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { commentBlog } from "../reducers/blogReducer"

const CommentForm = ({ blogId }) => {
  const { reset, ...comment } = useField('text')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!comment.value) return null
    dispatch(commentBlog(blogId, comment.value))
    reset()
  }
  return (
    <form onSubmit={handleSubmit}>
      <input {...comment}></input>
      <button type="Submit">Add comment</button>
    </form>
  )
}

export default CommentForm