import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {

    const [showDetails, setShowDetails] = useState(false)

    const handleBlogUpdate = async () => {
        try {
            await updateBlog({
                ...blog,
                likes: blog.likes + 1
            })
        } catch (error) {
            return
        }
    }

    const handleBlogDelete = async () => {
        if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) {
            try {
                await deleteBlog(blog.id)
            } catch (error) {
                return
            }
        }
    }

    return (
        <div className='blog-card'>
            <div className='blog-always-shown'>
                <p>{blog.title}</p>
                <p>By {blog.author}</p>
                <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'View'}</button>
            </div>
            {showDetails ?
                <div className='blog-details'>
                    <p>{blog.url}</p>
                    <p className='like-section'>Likes: {blog.likes} <button className='heart-button' onClick={handleBlogUpdate}>Heart</button> </p>
                    <p>Added by: {blog.user.name}</p>
                    <button className='remove-button' onClick={handleBlogDelete}>Remove</button>
                </div>

                : null}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default Blog