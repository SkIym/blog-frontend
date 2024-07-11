import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notifications'

import './App.css'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])

    const [errorMessage, setErrorMessage] = useState(null)
    const [error, setErrorKind] = useState(null)

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

        } catch(error) { // no error message component yet
            setErrorKind('error')
            setErrorMessage(error)

            setTimeout(() => {
                setErrorKind(null)
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUser')
        setUser(null)
        setBlogs([])
    }

    const blogsToShow = blogs.filter((blog) => {
        // the problem is here, the returnedblog (added to the state by line 81) only consists of the user id property, unlike when you get all the blogs from the start which populates that property with the username

        // either change how the backend responds, or change how you check which blogs are whom in the frontend

        //update: temporary fix on backend side (populate model before sending to frontend)
        return blog.user.username === user.username
    }
    )

    const addBlog = async (blogObject) => {
        try {
            const returnedBlog = await blogService.create(blogObject)
            console.log(returnedBlog)
            
            setBlogs([...blogs, returnedBlog])
            setErrorKind('success')
            setErrorMessage(`A new blog: ${returnedBlog.title} by ${returnedBlog.author} was added`)

            setTimeout(() => {
                setErrorKind(null)
                setErrorMessage(null)
            }, 5000)
        } catch(error) {
            setErrorKind('error')
            setErrorMessage(error)

            setTimeout(() => {
                setErrorKind(null)
                setErrorMessage(null)
            }, 5000)
            return Promise.reject()
        }
    }

    const notifBox = () => (
        <Notification flag={error} message={errorMessage}/>
    )

    return (
        
        <div>
            {user === null
            ? 
            <div>
                <h3>Log in to application</h3>
                {notifBox()}
                <LoginForm username={username} password={password} handleUsernameChange={setUsername} handlePasswordChange={setPassword} handleLogin={handleLogin}/>
            </div>
            : 
            <div>
                <h3>Blogs</h3>
                {notifBox()}
                <Blogs blogs={blogsToShow} name={user.name} handleLogout={handleLogout} createBlog={addBlog}/>
            </div>
            }
            
        </div>
        
    )
}

export default App
