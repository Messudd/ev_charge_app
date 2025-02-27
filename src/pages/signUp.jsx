import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { moveForm, moveBtn } from "../data/animationData";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import API_BASE_URL from "../data/apiBaseUrl";
import "../css/signup.css";
import axios from "axios";
import Info from "../components/info";

const SignUp = () => {
  const userSignInitial = {
    fullName: "",
    usrName: "",
    email: "",
    password: "",
    gender: "MALE",
  };
  const [userSignData, setUserSignData] = useState(userSignInitial);
  const [isUserSignValid, setUserSignValid] = useState(false);
  const[errorMsg ,setErrorMsg] = useState('');
  const[succes ,setSucces] = useState(false);
  const [userSignError, setuserSignError] = useState({
    fullName: "",
    usrName: "",
    email: "",
    password: "",
    gender: "",
  });

  const history = useHistory();
  // Sıgn Up  - Validation
  const userSignFormSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("you must enter your name and surname.")
      .min(3, "must be at least 3 characters."),
    usrName: Yup.string()
      .required("you must enter an username.")
      .min(3, "must be at least 3 characters.")
      .max(10, "up to 10 characters."),
    email: Yup.string()
      .email("you must enter a valid email")
      .required("you must enter an email adress."),
    password: Yup.string()
      .required("you must enter a password !")
      .min(6, "must be at least 6 characters.")
      .max(12, "up to 12 characters."),
    gender: Yup.string().oneOf(
      ["MALE", "FEMALE"],
      "you must select one of options"
    ),
  });

  const validationContol = (param, val) => {
    Yup.reach(userSignFormSchema, param)
      .validate(val)
      .then((val) => {
        setuserSignError({ ...userSignError, [param]: "" });
      })
      .catch((err) => {
        setuserSignError({ ...userSignError, [param]: err.errors[0] });
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserSignData({ ...userSignData, [name]: value });
    validationContol(name, value);
  };

  const userDataReset = () => {
    setUserSignData(userSignInitial);
  };

  const userRegister = async(signData) => {

    const data = await axios
    .post(`${API_BASE_URL}/auth/register`,signData)
    .then((responce) => {
      setSucces(true);
      return responce.data;
    })
    .catch((err) => {
       return err.response.data;
      });
      return data;
  }

  const handleSignSubmit = async(e) => {
    e.preventDefault();
    //console.log('user : ',userSignData);
    const data = await userRegister(userSignData);
    setUserSignData(userSignInitial);
    if(!(data.message)){
      setTimeout(() => {
        setSucces(false);
        history.push("/login");
      },1200);
    }
    else setErrorMsg(data.message);
  };

  useEffect(() => {
    userSignFormSchema.isValid(userSignData).then((valid) => {
      setUserSignValid(valid);
    });
  }, [userSignData]);

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
    },2200);
  },[errorMsg])

  return (
    <>
      <h2 className="sign-head">
        <Link to="/">
          <FontAwesomeIcon className="arrow" icon={faArrowLeft} />
        </Link>
        Sign Up for free
      </h2>
      <div className="sign-page">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={moveForm}
          transition={{ duration: 1 }}
          className="sign-form"
        >
          <form onSubmit={handleSignSubmit}>
            <div className="full-name">
              <label htmlFor="full-name">Fullname</label>
              <input
                type="text"
                name="fullName"
                value={userSignData.fullName}
                id="full-name"
                placeholder="Robert De"
                onChange={handleInputChange}
              />
              {userSignError?.fullName && <li>{userSignError.fullName}</li>}
            </div>
            <div className="sign-username">
              <label htmlFor="sign-username">Username</label>
              <input
                type="text"
                name="usrName"
                value={userSignData.usrName}
                id="sign-username"
                placeholder="Robert1453"
                onChange={handleInputChange}
              />
              {userSignError?.usrName && <li>{userSignError.usrName}</li>}
            </div>
            <div className="sign-email">
              <label htmlFor="sign-email">Email</label>
              <input
                type="email"
                name="email"
                value={userSignData.email}
                id="sign-email"
                placeholder="robert_de@gmail.com"
                onChange={handleInputChange}
              />
              {userSignError?.email && <li>{userSignError.email}</li>}
            </div>
            <div className="sign-pass">
              <label htmlFor="sign-password">Password</label>
              <input
                type="password"
                name="password"
                value={userSignData.password}
                id="sign-password"
                placeholder="create a password"
                onChange={handleInputChange}
              />
              {userSignError?.password && <li>{userSignError.password}</li>}
            </div>
            <span className="gender-spn">Gender</span>
            <p className="sign-gender">
              <label htmlFor="male">
                <input
                  type="radio"
                  name="gender"
                  value="MALE"
                  id="male"
                  defaultChecked
                  onChange={handleInputChange}
                />
                {"  "}Male
              </label>
              <label htmlFor="female">
                <input
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  id="female"
                  onChange={handleInputChange}
                />
                {"  "}Female
              </label>
            </p>
            <motion.article
              initial="hidden"
              animate="visible"
              variants={moveBtn}
              transition={{ duration: 4 }}
              id="sign-buttons"
            >
              <button type="submit" disabled={!isUserSignValid}>
                Sign Up
              </button>
              <button type="reset" onClick={userDataReset}>
                Reset
              </button>
            </motion.article>
          </form>
        </motion.div>
      </div>
      {errorMsg && <Info message={errorMsg}/>}
      {succes && <Info message={'Registration Successful!'}/>}
    </>
  );
};

export default SignUp;
