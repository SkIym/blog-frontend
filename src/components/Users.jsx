import { useSelector } from "react-redux"
import {
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'
import User from "./User"

const Users = () => {

  const users = useSelector(state => state.users)
  const match = useMatch('/users/:id')
  const userToShow = match ? users.find((u) => u.id === match.params.id) : null

  return (
    <div>
      <Routes>
        <Route path='/' element={
          <div className="content-display">
            <h1 className="page-title">Users</h1>
            <div className="content-list">
              <div className="user-card">
                <p>User</p>
                <p>No. of blogs</p>
              </div>
              {users.map((user) => {
                return (
                  <div key={user.id} className="user-card">
                    <Link to={`/users/${user.id}`}><p>{user.name}</p></Link>
                    <p>{user.blogs.length}</p>
                  </div>
                )
              })}
            </div>
          </div>}></Route>
        <Route path="/:id" element={<User user={userToShow} />}></Route>
      </Routes>
    </div>
  )
}


export default Users