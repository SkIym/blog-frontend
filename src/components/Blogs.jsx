const Blogs = ({ blogs, name }) => {


    return (
        <div>
            <h3>Blogs</h3>
            <p>{name} logged in</p>
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