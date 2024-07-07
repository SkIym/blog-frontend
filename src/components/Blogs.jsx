import BlogList from "./BlogList"
import BlogForm from "./BlogForm"

const Blogs = ({ blogs, name, handleLogout, newBlog, addBlog, handleNewBlogChange }) => {


    return (
        <div>
            {console.log('From Blog.jsx', blogs)}
            <h3>Blogs</h3>
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