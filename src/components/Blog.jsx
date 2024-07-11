import { useState } from 'react'
const Blog = ({ blog }) => {

    const [showDetails, setShowDetails] = useState(false)
    
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
                    <p>Likes: {blog.likes}</p>
                    <p>Added by: {blog.user.name}</p>
                </div>
                
                : null}
        </div>
    )
}

export default Blog