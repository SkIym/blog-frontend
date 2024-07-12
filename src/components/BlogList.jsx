import Blog from './Blog'

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

export default BlogList