import { useRef } from 'react'
import PropTypes from 'prop-types'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ blogs, name, handleLogout, createBlog, updateBlog, deleteBlog, user }) => {


    const blogFormRef = useRef()

    const addBlog = async (blogObject) => {
        try {
            await createBlog(blogObject)
            blogFormRef.current.toggleVisibility()
        } catch(exception) {
            return
        }
    }

    return (
        <div>
            <div className='log-details'>
                <p>{name} logged in</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <Togglable buttonLabel='Add New Blog' className='blog-form-container' ref={blogFormRef}>
                <BlogForm addBlog={addBlog} />
            </Togglable>
            <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
        </div>
    )
}

Blogs.propTypes = {
    blogs: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    createBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default Blogs