const BlogForm = ({ newBlog, addBlog, handleNewBlogChange}) => {
    return (
        <div>
            <h4>Create new blog</h4>
            <form onSubmit={addBlog} className="blog-form">
                <div>
                    <span>Title:</span>
                    <input type="text" name="text" value={newBlog.title} onChange={(e) => handleNewBlogChange({...newBlog, title: e.target.value})}/>
                </div>
                <div>
                    <span>Author:</span>
                    <input type="text" name="author" value={newBlog.author} onChange={(e) => handleNewBlogChange({...newBlog, author: e.target.value})}/>
                </div>
                <div>
                    <span>Link:</span>
                    <input type="text" name="url" value={newBlog.url} onChange={(e) => handleNewBlogChange({...newBlog, url: e.target.value})}/>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm