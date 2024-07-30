
const User = ({ user }) => {

  if(!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map((blog) => {
          return <div className="blog-card" key={blog.id}>{blog.title}</div>
        })}
      </ul>
    </div>
  )
}


export default User