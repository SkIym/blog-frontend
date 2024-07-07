import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import loginService from './services/login'
import blogService from './services/blogs'

import './App.css'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        // const fetchData = async () => {
        //     const allBlogs = await blogService.getAll()
        //     setBlogs(allBlogs)
        // }
        // fetchData()
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService
                .login({
                    username,
                    password
                })
            blogService.setToken(user.token)    
            setUser(user)
            setPassword('')
            setUsername('')
            const allBlogs = await blogService.getAll()
            setBlogs(allBlogs)
        } catch(exception) { // no error message component yet
            console.log(exception)
        }
    }

    const blogsToShow = blogs.filter((blog) => blog.user.username === user.username)

    console.log(!blogsToShow, typeof(blogsToShow))

    return (
        <div>
            {user === null
            ? <LoginForm username={username} password={password} handleUsernameChange={setUsername} handlePasswordChange={setPassword} handleLogin={handleLogin}/>
            : <Blogs blogs={blogsToShow} name={user.name}/>}
            
        </div>
        
    )
}

export default App
