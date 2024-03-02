import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import userBoxData from "../../data/userboxData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const UserNavComp = ({ toggleSideNav }) => {
  return (
    <motion.div
      className="user-box"
      initial={{
        x: -100,
      }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <li
        style={{
          display: "flex",
          cursor: "pointer",
          justifyContent: "flex-end",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <FontAwesomeIcon
          onClick={toggleSideNav}
          icon={faXmark}
          color="whitesmoke"
        />
      </li>
      <ul>
        <li className="c-side-nav" style={{cursor: 'pointer'}}>
          <p>
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span>Help</span>
          </p>
        </li>
        {userBoxData.map((item, idx) => {
          return (
            <li className={item.class} key={idx}>
              <Link to={item.linkTo}>
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default UserNavComp;
