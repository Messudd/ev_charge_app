import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { globalContext } from "../context/globalContextProvider";
import "../css/popup.css";

const PreviewPopup = () => {
  const { prewPopup, setPrewPopup } = useContext(globalContext);

  const setContactClose = () => {
    setPrewPopup(false);
  };

  return (
    <>
      {prewPopup && (
        <div className="popup-container">
          <div className="popup-preview">
            <div
              className="close-btn"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "30px",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon
                className="close-icon"
                onClick={setContactClose}
                icon={faXmark}
                color="#ccc"
                width={30}
              />
            </div>
            <h1>Feedback</h1>
            <div className="feedback-form">
              <form>
                <input
                  style={{
                    background: "none",
                  }}
                  name="topic"
                  type="text"
                  placeholder="Topic..."
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Message..."
                ></textarea>
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewPopup;
