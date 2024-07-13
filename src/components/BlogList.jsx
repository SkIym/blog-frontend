import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, updateBlog, deleteBlog }) => {

    return (
        <div>

            {blogs.length === 0
                ? <div>No blogs yet</div> :
                blogs.map((blog) => {
                    return <Blog blog={blog} key={blog.id} updateBlog ={updateBlog} deleteBlog={deleteBlog}/>
                })
            }
        </div>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default BlogList