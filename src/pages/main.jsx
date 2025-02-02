import React from "react";
import carImg from "../utility/images/evCharge.png";
import { Switch, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { variants } from "../data/animationData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignUp from "./signUp";
import Login from "./login";
import Home from "./home";
import Detail from "./detail";
import Favorites from "./favorites";
import stations from "../data/stations";
import social from "../data/social";
import Profile from "./profile";
import Footer from "../components/footer";

const Main = () => {
  const [text] = useTypewriter({
    words: [
      "Sign up, search charging stations based on location information, edit, save or favorite their locations.",
      "or just try and test the app now with location data",
    ],
    loop: {},
    typeSpeed: 80,
    deleteSpeed: 30,
  });

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <div className="charge-finder-app">
            <div className="top-link">
              <Link to="/login">Login</Link>
              <Link id="signUp" to="/sign_up">
                Sign Up
              </Link>
            </div>
            <div
              style={{
                backgroundColor: "#222222",
                padding: "3rem 0",
                width: "100%",
              }}
            >
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "4px",
                  margin: "4px 0",
                }}
              >
                <motion.span
                  style={{
                    color: "rgb(209 213 219 )",
                    fontSize: "3rem",
                    textAlign: "center",
                    fontFamily: "danss",
                  }}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  EV ~ CHARGE |
                </motion.span>
                <motion.span
                  style={{
                    color: "rgb(185 28 28)",
                    fontSize: "3.75rem",
                    padding: "0.75rem",
                    margin: "1.5rem 0",
                    fontFamily: "danss",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: 40,
                  }}
                  transition={{ duration: 3 }}
                >
                  FINDER
                </motion.span>
              </h1>
            </div>
            <div className="fixed-social">
              {social.map((item, idx) => (
                <a className="fix-social" key={idx} href={item.link} target="_blank">
                  <FontAwesomeIcon icon={item.img} color="white" />
                </a>
              ))}
            </div>
            <main>
              <section className="bg-section">
                <motion.div
                  className="banner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 12 }}
                >
                  <img src={carImg} alt="ev-charge" width={600} />
                </motion.div>
                <h3
                  className="head-text"
                  style={{
                    color: "rgb(185 28 28)",
                    fontSize: "1.4rem",
                    letterSpacing: "0.025rem",
                    width: "20rem",
                    textAlign: "center",
                  }}
                >
                  Let's : {"  "}
                  <span
                    style={{
                      color: "rgb(243 244 246)",
                      paddingLeft: "1rem",
                      fontSize: "1rem",
                      opacity: "0.8",
                      lineHeight: "1.75rem",
                    }}
                  >
                    {text}
                  </span>
                  <span style={{ color: "whitesmoke" }}>
                    <Cursor cursorStyle="|" />
                  </span>
                </h3>
              </section>
              <section
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "1.5rem 0",
                  margin: "2.5rem 0",
                }}
              >
                <Link to="/">
                  <motion.button
                    className="btn-try my-3 text-gray-50 px-12 py-3 rounded text-center tracking-widest"
                    initial={{ y: -1200 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </section>
              <section className="stations">
                <h2>Stations</h2>
                <div className="cards-block">
                  {stations.map((item, idx) => (
                    <div className="station-card" key={idx}>
                      <div className="img-card">
                        <img src={item.img} alt="station-info" />
                      </div>
                      <h3>{item.name}</h3>
                      <p>{item.label}</p>
                      <a
                        href={item.adress}
                        target="_blank"
                        style={{
                          color: "red",
                          fontSize: "0.8rem",
                          padding: "10px",
                          textDecoration: "underline",
                        }}
                      >
                        Visit
                      </a>
                    </div>
                  ))}
                </div>
              </section>
              <Footer />
            </main>
          </div>
        </Route>
        <Route path="/user/home" exact>
          <Home />
        </Route>
        <Route path="/user/favorites" exact>
          <Favorites />
        </Route>
        <Route path="/user/detail/:id" exact>
          <Detail />
        </Route>
        <Route path="/user/profile" exact>
          <Profile />
        </Route>
        <Route path="/sign_up" exact>
          <SignUp />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
