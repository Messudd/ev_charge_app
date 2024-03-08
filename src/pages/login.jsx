import React from "react";
import { Link , useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../css/login.css";

const Login = () => {
  const mPage = useHistory();
  const divStyle = {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  function goMainPage() {
    mPage.push('/')
  } 

  return (
    <div className="login-page">
      <div className="login-con">
        <div style={divStyle}>
          <FontAwesomeIcon
            onClick={goMainPage}
            icon={faArrowLeft}
            color="red"
            fontSize="1rem"
            opacity={0.8}
            cursor="pointer"
          />
          <h1>Login</h1>
        </div>
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
