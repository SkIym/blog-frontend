import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

const LoginForm = () => {
  const { reset: usernameReset, ...username } = useField('text')
  const { reset: passwordReset, ...password } = useField('password')
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(username.value, password.value))
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <span>username</span>
          <input
            {...username}
            data-testid="username"
          />
        </div>
        <div>
          <span>password</span>
          <input
            {...password}
            data-testid="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


export default LoginForm;
