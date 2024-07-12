import Blog from './Blog'

const BlogList = ({ blogs, updateBlog }) => {

    return (
        <div>

                {blogs.length === 0 
                    ? <div>No blogs yet</div> : 
                    blogs.map((blog) => {
                        return <Blog blog={blog} key={blog.id} updateBlog ={updateBlog}/>
                    })   
                }
        </div>
    )
}

export default BlogList