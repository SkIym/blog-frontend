const BlogList = ({ blogs }) => {

    return (
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
    )
}

export default BlogList