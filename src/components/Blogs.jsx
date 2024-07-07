const Blogs = ({ blogs, name, handleLogout }) => {


    return (
        <div>
            <h3>Blogs</h3>
            <div>
                <p>{name} logged in</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div>
                {blogs.length === 0 
                    ? <div>No blogs yet</div> : 
                    <ul>
                    {blogs.map((blog) => {
                        return <li key={blog.id}>{blog.title} by {blog.author}</li>
                    })}
                    </ul>
                }
            </div>
            
        </div>
    )
}

export default Blogs