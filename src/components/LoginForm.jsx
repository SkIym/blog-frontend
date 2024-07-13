import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await loginUser({
                username,
                password
            })
            setPassword('')
            setUsername('')
        } catch(error) {
            return
        }

    }

    return (
        <div>

            <form onSubmit={handleLogin}>
                <div>
                    <span>username</span>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <span>password</span>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired
}

export default LoginForm