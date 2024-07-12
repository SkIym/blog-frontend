import { useState } from 'react'
const Blog = ({ blog, updateBlog }) => {

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
                </div>
                
                : null}
        </div>
    )
}

export default Blog