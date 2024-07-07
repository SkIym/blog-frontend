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
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        const loadData = async () => {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
            const allBlogs = await blogService.getAll()
            setBlogs(allBlogs)
        }
        if (loggedUserJSON) loadData()
        
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService
                .login({
                    username,
                    password
                })
            window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
            )
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

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUser')
        setUser(null)
        setBlogs([])
    }

    const blogsToShow = blogs.filter((blog) => blog.user.username === user.username)

    return (
        <div>
            {user === null
            ? <LoginForm username={username} password={password} handleUsernameChange={setUsername} handlePasswordChange={setPassword} handleLogin={handleLogin}/>
            : <Blogs blogs={blogsToShow} name={user.name} handleLogout={handleLogout}/>}
            
        </div>
        
    )
}

export default App
