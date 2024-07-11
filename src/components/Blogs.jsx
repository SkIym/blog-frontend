import { useState, useRef } from 'react'
import BlogList from "./BlogList"
import BlogForm from "./BlogForm"
import Notification from "./Notifications"
import Togglable from "./Togglable"

const Blogs = ({ blogs, name, handleLogout, createBlog, error, errorMessage }) => {

    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    })

    const addBlog = async (e) => {
        e.preventDefault()
        try {
            await createBlog(newBlog)
            setNewBlog({
                title: '',
                author: '',
                url: '',
            })
        } catch(exception) {
            return
        }
        
    }

    const blogFormRef = useRef()

    return (
        <div>
            <h3>Blogs</h3>
            <Notification flag={error} message={errorMessage}/>
            <div>
                <p>{name} logged in</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <Togglable buttonLabel='Add New Blog' ref={blogFormRef}>
                <BlogForm newBlog={newBlog} addBlog={addBlog} handleNewBlogChange={setNewBlog}/>
            </Togglable>
            <BlogList blogs={blogs}/>
        </div>
    )
}

export default Blogs