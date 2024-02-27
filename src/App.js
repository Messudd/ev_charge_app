import carImg from "./utility/images/evCharge.png";
import { Switch, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { variants } from "./data/animationData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignUp from "./components/signUp";
import Login from "./components/login";
import Home from "./components/home/home";
import Detail from "./components/detail";
import Favorites from "./components/favorites";
import stations from "./data/stations";
import social from "./data/social";
import "./App.css";

function App() {
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
    <>
      <Switch>
        <Route path="/" exact>
          <div className="charge-finder-app">
            <div className="top-link">
              <Link to="/login">Login</Link>
              <Link id="signUp" to="/sign_up">
                Sign Up
              </Link>
            </div>
            <div className="header py-12 w-full" style={{backgroundColor:' rgb(26, 26, 77) '}}>
              <h1 className="flex justify-center gap-2 flex-wrap my-8">
                <motion.span
                  className="text-gray-300 text-5xl p-3 font-dancing text-center"
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  EV ~ CHARGE |
                </motion.span>
                <motion.span
                  className="text-red-700 text-6xl p-3 my-6 font-dancing"
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
              {
                social.map((item,idx) => (
                  <Link className = 'fix-social' key={idx} to = {item.link}>
                     <FontAwesomeIcon icon={item.img} color="white"/>
                  </Link>
                ))
              }
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
                <h3 className="head-text text-red-700 text-3xl font-mono tracking-wide w-80 text-center">
                  Let's : {"  "}
                  <span className="text-gray-100 font-mono text-xl">
                    {text}
                  </span>
                  <span style={{ color: "whitesmoke" }}>
                    <Cursor cursorStyle="|" />
                  </span>
                </h3>
              </section>
              <section className="py-6 my-10 flex justify-center">
                <Link to="/user/home">
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
                        <img src= {item.img} alt="station-info" />
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
              <footer className="mainpage-footer">
              </footer>
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
        <Route path="/sign_up" exact>
          <SignUp />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </>
  );
}

export default App;
