import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { reset: usernameReset, ...username } = useField("text");
  const { reset: passwordReset, ...password } = useField("password");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(username.value, password.value));
      navigate("/")
    } catch (err) {
      return
    }
  };

  return (
    <div>
      <h3>Log in to application</h3>
      <form onSubmit={handleLogin}>
        <div>
          <span>username</span>
          <input {...username} data-testid="username" />
        </div>
        <div>
          <span>password</span>
          <input {...password} data-testid="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
