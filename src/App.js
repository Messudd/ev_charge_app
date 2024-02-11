import carImg from "./utility/images/e-car.png";
import { Switch, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { variants } from "./data/animationData";
import SignUp from "./components/signUp";
import Login from "./components/login";
import Home from "./components/home/home";
import Detail from "./components/detail";
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
              <Link
                id="signUp"
                to="/sign_up"
              >
                Sign Up
              </Link>
            </div>
            <div className="header m-8">
              <div className="navbar-top"></div>
              <h1 className="flex justify-center gap-3 flex-wrap">
                <motion.span
                  className="text-gray-300 text-6xl p-3 font-dancing text-center"
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  EV ~ CHARGE |
                </motion.span>
                <motion.span
                  className="text-red-700 text-6xl p-3 font-dancing"
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
            <main>
              <section className="flex items-center justify-center gap-x-40 gap-y-24 flex-wrap">
                <motion.div
                  className="banner px-10 mx-2"
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
                    className="btn-try my-3 px-12 py-3 rounded text-center tracking-widest"
                    initial={{ y: -1200 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    Let's Try
                  </motion.button>
                </Link>
              </section>
            </main>
          </div>
        </Route>
        <Route path="/user/home" exact>
          <Home />
        </Route>
        <Route path="/user/detail/:id" exact>
          <Detail/>
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
