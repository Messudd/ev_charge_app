import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Info = ({ message }) => {
  const messageStyle = {
    texAlign: "center",
    fontSize: "0.8rem",
    fontWeight: "700",
    color: "rgba(255,255,255,0.8)",
    letterSpacing: "0.03rem",
    padding: "10px 25px",
  };
  const infoStyle = {
    position: "fixed",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    top: 5,
  };
  const paragInfo = {
    display: "inline-block",
    backgroundColor: "#FF3333",
    borderRadius: "3px",
  };
  const cardVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        opacity: {
          duration: 1,
        },
      },
    },
    out: {
      opacity: 0,
      transition: {
        opacity: {
          duration: 1,
        },
      },
    },
  };
  return (
    <div className="info" style={infoStyle}>
      <AnimatePresence>
        <motion.div
          className="parag-info"
          style={{
            ...paragInfo,
            backgroundColor:
              message === "Registration Successful!" ? "#22BB33" : "#FF3333",
          }}
          initial="initial"
          animate="in"
          exit="out"
          variants={cardVariants}
        >
          <p style={messageStyle}>{message}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default Info;
