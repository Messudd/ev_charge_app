import React from "react";
import "../../css/popup.css";

const PreviewPopup = () => {
  return (
    <div className="popup-container">
      <div className="popup-preview">
        <h1>Feedback</h1>
        <div className="feedback-form">
          <form>
            <input name="topic" type="text" placeholder="Topic..." />
            <textarea name="message" rows={4} placeholder="Message..."></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PreviewPopup;
