import BlogList from "./BlogList"
import BlogForm from "./BlogForm"
import Notification from "./Notifications"

const Blogs = ({ blogs, name, handleLogout, newBlog, addBlog, handleNewBlogChange, error, errorMessage }) => {


    return (
        <div>
            
            <h3>Blogs</h3>
            <Notification flag={error} message={errorMessage}/>
            <div>
                <p>{name} logged in</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <BlogForm newBlog={newBlog} addBlog={addBlog} handleNewBlogChange={handleNewBlogChange}/>
            <BlogList blogs={blogs}/>
        </div>
    )
}

export default Blogs