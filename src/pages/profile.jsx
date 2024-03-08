import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import profileMale from "../utility/images/icons8-male.svg";
import profileFemale from "../utility/images/icons8-female.svg";
import { globalContext } from "../context/globalContextProvider";
import { faChevronLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/profile.css";

const Profile = () => {
  const [profileImage, setProfileImage] = useState("");
  const { userNavInfo } = useContext(globalContext);
  const [show, setShow] = useState(false);
  const fileRef = useRef();

  const uploadProfileImage = () => {
    fileRef.current.click();
  };
  useEffect(() => {
    fileRef.current.style.display = "none";
  }, []);

  return (
    <div className="profile">
      <div className="back">
        <Link to="/user/home">
          <FontAwesomeIcon
            icon={faChevronLeft}
            color="whitesmoke"
            fontSize="1.1rem"
          />
        </Link>
      </div>
      <form action="">
        <div className="banner-profile">
          <div className="profile-img" onClick={uploadProfileImage}>
            {profileImage ? (
              <img src={URL.createObjectURL(profileImage)} alt="profile" />
            ) : userNavInfo.gender === "MALE" ? (
              <img src={profileMale} alt="Male"></img>
            ) : (
              <img src={profileFemale} alt="Female"></img>
            )}
            <input
              type="file"
              ref={fileRef}
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>
          <div className="name-info">
            <h2>Mesud AYDIN</h2>
            <div className="profile-username">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>
          </div>
        </div>
        <div className="profile-email">
          <label>Email</label>
          <input type="email" value="eem.mesud.28@gmail.com" disabled />
        </div>
        <div className="profile-password">
          <label htmlFor="pass">Password</label>
          <div className="pass">
            <input type={show ? "text" : "password"} id="pass" />
            <FontAwesomeIcon
              onClick={() => setShow(!show)}
              className="fa-eye"
              icon={show ? faEye : faEyeSlash}
              fontSize="0.8rem"
              color="#fff"
            />
          </div>
          <div className="user-note">
            <label htmlFor="note-user">Note</label>
            <textarea
              name=""
              id="note-user"
              cols="20"
              rows="10"
              placeholder="You can take your notes and remember them from the profile tab."
            ></textarea>
          </div>
          <div className="profile-btns">
            <button type="reset">Clear</button>
            <button type="submit" className="">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
