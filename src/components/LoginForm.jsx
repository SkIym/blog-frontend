
import Notification from "./Notifications"

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin, error, errorMessage}) => {
    return (
        <div>
            
            <Notification flag={error} message={errorMessage}/>
            <form onSubmit={handleLogin}>
                <div>
                    <span>username</span>
                    <input type="text" name="username" value={username} onChange={(e) => handleUsernameChange(e.target.value)} />
                </div>
                <div>
                    <span>password</span>
                    <input type="password" name="password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm