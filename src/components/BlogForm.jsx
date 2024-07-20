import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    })

    const uploadBlog = async (e) => {
        e.preventDefault()
        try {
            await addBlog(newBlog)
            setNewBlog({
                title: '',
                author: '',
                url: '',
            })
        } catch (error) {
            return
        }
    }

    return (
        <div>
            <h4>Create new blog</h4>
            <form onSubmit={uploadBlog} className="blog-form">
                <div>
                    <span>Title:</span>
                    <input type="text" name="text" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} placeholder='Title' data-testid='title'/>
                </div>
                <div>
                    <span>Author:</span>
                    <input type="text" name="author" value={newBlog.author} onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })} placeholder='Author' data-testid='author'/>
                </div>
                <div>
                    <span>Link:</span>
                    <input type="text" name="url" value={newBlog.url} onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })} placeholder='URL' data-testid='link'/>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
}

export default BlogForm