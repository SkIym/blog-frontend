import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, updateBlog, deleteBlog, user }) => {

    return (
        <div>

            {blogs.length === 0
                ? <div>No blogs yet</div> :
                blogs.map((blog) => {
                    let showRemoveBtn = false
                    if (blog.user.username === user) {
                        showRemoveBtn = true
                    }
                    return <Blog blog={blog} key={blog.id} updateBlog ={updateBlog} deleteBlog={deleteBlog} showRemoveBtn={showRemoveBtn}/>
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