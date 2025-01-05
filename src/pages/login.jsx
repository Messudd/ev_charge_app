import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/loading";
import API_BASE_URL from "../data/apiBaseUrl";
import { globalContext } from "../context/globalContextProvider";
import Info from "../components/info";
import { moveForm } from "../data/animationData";
import "../css/login.css";

const Login = () => {
  const { unique, setUnique } = useContext(globalContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const mPage = useHistory();
  const divStyle = {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  };
  function goMainPage() {
    mPage.push("/");
  }
  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setUnique({ ...unique, [name]: value });
  };
  const checkUserLogin = async () => {
    await axios
      .post(`${API_BASE_URL}/auth/login`, unique)
      .then((res) => {
        console.log("responce : ", res.data);
        if (res.status === 200) {
          setErrorMessage("");
          let session = btoa(unique.email + ":" + unique.password);
          localStorage.setItem("session", session);
          setTimeout(() => {
            setLoading(false);
            mPage.push("/user/home");
          },200);
        }
      })
      .catch((err) => {
        console.log("error : ", err.response?.data.message);
        setLoading(false);
        setErrorMessage(err.response?.data.message);
      });
  };
  const userLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    checkUserLogin();
  };
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
      //errorMessage.includes("No users found") && mPage.push("/sign_up");
    }, 2200);
  }, [errorMessage]);
  return (
    <>
      <div className="login-page">
        <motion.div
          className="login-con"
          initial="hidden"
          animate="visible"
          variants={moveForm}
          transition={{ duration: 1 }}
        >
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
          <form className="log-form" onSubmit={userLogin}>
            <input
              type="email"
              placeholder="Email..."
              name="email"
              onChange={inputChangeHandler}
            />
            <input
              type="password"
              placeholder="Password..."
              name="password"
              onChange={inputChangeHandler}
            />
            <p>
              <span>Don't you have an account ?</span>
              <Link to="/sign_up">Sign Up</Link>
            </p>
            <button type="submit">Login</button>
          </form>
        </motion.div>
      </div>
      {loading && <Loading loading={loading} />}
      {errorMessage && <Info message={errorMessage} />}
    </>
  );
};

export default Login;
