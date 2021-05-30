import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notifications/Notifications";
import { dispatchLogin } from "../../../redux/actions/loginAction";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseGoogle = async (response) => {
    try {
        const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

        setUser({...user, error:'', success: res.data.msg})
        localStorage.setItem('firstLogin', true)

        dispatch(dispatchLogin())
        history.push('/')
    } catch (err) {
        err.response.data.msg && 
        setUser({...user, err: err.response.data.msg, success: ''})
    }
}

  return (
    <div className="login__page">
      <h2>login</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Adress</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            name="email"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={password}
            name="password"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/forgot_password">Forgot your password?</Link>
        </div>
      </form>

      <div className="hr">Sau logativa cu</div>
      <div className="social">
        <GoogleLogin
          clientId="383604736057-iustm6rlmeopjo2cldcuocjsolpi6r0p.apps.googleusercontent.com"
          buttonText="Google"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <p>
        Nu sunteti inregistrat? <Link to="/register">Register</Link> 
      </p>
    </div>
  );
}
export default Login;
