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
  console.log(match)

  return (
    <div>
      <Routes>
        <Route path='/' element={
          <div>
            <h3>Users</h3>
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
          </div>}></Route>
        <Route path="/:id" element={<User user={userToShow} />}></Route>
      </Routes>
    </div>
  )
}


export default Users