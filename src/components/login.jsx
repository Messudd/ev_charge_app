import React from "react";
import { Link } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-con">
        <h1>Login</h1>
        <form className="log-form">
          <input type="email" placeholder="Email..." />
          <input type="password" placeholder="Password..." />
          <p>
            <span>Don't you have an account ?</span>
            <Link to="/sign_up">Sign Up</Link>
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
