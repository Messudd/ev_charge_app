import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import profileMale from "../utility/images/icons8-male.svg";
import profileFemale from "../utility/images/icons8-female.svg";
import { globalContext } from "../context/globalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEye,
  faEyeSlash,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import API_BASE_URL from "../data/apiBaseUrl";
import Loading from "../components/loading";
import "../css/profile.css";

const Profile = () => {
  const { setRoute, route, setProfile, profile } = useContext(globalContext);
  const [sesion, setSesion] = useState(null);
  const [profileReq, setProfileReq] = useState({
    image: "",
    note: "",
  });
  const [load, setLoad] = useState(true);
  const [impo, setImpo] = useState(null);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(null);
  const fileRef = useRef();
  const redicrect = useHistory();

  const uploadProfileImage = () => {
    fileRef.current.click();
  };

  const getProfile = async (val, userVal) => {
    if (val !== 0) {
      axios
        .get(`${API_BASE_URL}/profile/${val}`, {
          auth: {
            username: userVal[0],
            password: userVal[1],
          },
        })
        .then((res) => {
          setProfile(res.data);
          console.log("get_profile: ", res.data);
        })
        .catch((err) => {
          console.log("error : ", err.message);
        });
    }
  };
  const saveProfileWithAxios = async (userId, value) => {
    axios
      .post(`${API_BASE_URL}/profile/${userId}`, profileReq, {
        auth: {
          username: value[0],
          password: value[1],
        },
      })
      .then((res) => {
        setProfile(res.data);
        console.log("post_profile: ", res.data);
      })
      .catch((err) => {
        console.log("error : ", err.message);
      });
  };
  function profileClear() {
    setProfile({ ...profile, note: "", image: "" });
  }
  function saveProfile(e) {
    e.preventDefault();
    let userId = localStorage.getItem("userId");
    saveProfileWithAxios(userId, impo);
  }
  function profileHandleChange(e) {
    const { name, value } = e.target;
    setProfileReq({
      ...profileReq,
      [name]: value,
      //type === "file" ? URL.createObjectURL(e.target.files[0])
    });
  }
  useEffect(() => {
    setRoute({ ...route, route: false });
    setInfo(JSON.parse(localStorage.getItem("info")));
    let userValues = atob(localStorage.getItem("session")).split(":");
    let userId = localStorage.getItem('userId');
    userId === null && redicrect.push('/login'); 
    let id = localStorage.getItem("id");
    setSesion({ email: userValues[0], pass: userValues[1] });
    getProfile(Number(id), userValues);
    setImpo(userValues);
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);

  useEffect(() => {
    console.log("info:", info);
  }, [info]);

  useEffect(() => {
    console.log("image: ", profile?.image);
  }, [profile?.image]);

  return (
    <>
      {load ? (
        <Loading loading={load} />
      ) : (
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
          <form onSubmit={saveProfile}>
            <div className="banner-profile">
              <div className="profile-img" onClick={uploadProfileImage}>
                {profileReq.image ? (
                  <img src={profileReq.image} alt="profile" />
                ) : profile?.image ? (
                  <img src={profile.image} alt="profile" />
                ) : info?.gender === "MALE" ? (
                  <img src={profileMale} alt="Male"></img>
                ) : (
                  <img src={profileFemale} alt="Female"></img>
                )}
              </div>
              <div className="name-info">
                <h2>{info?.username}</h2>
                <div className="profile-username">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={info?.username}
                    disabled
                  />
                </div>
              </div>
            </div>
            {profile?.image === "" && (
              <div className="profile-email">
                <label htmlFor="profile-link">Profile Link</label>
                <input
                  id="profile-link"
                  type="text"
                  name="image"
                  ref={fileRef}
                  onChange={profileHandleChange}
                />
              </div>
            )}
            <div className="profile-email">
              <label>Email</label>
              <input type="email" value={sesion?.email} disabled />
            </div>
            <div className="profile-password">
              <label htmlFor="pass">Password</label>
              <div className="pass">
                <input
                  style={{ opacity: "0.7" }}
                  type={show ? "text" : "password"}
                  id="pass"
                  value={sesion?.pass}
                  disabled
                />
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
                {profile?.note === null || profile?.note === "" ? (
                  <textarea
                    style={{ opacity: "0.8" }}
                    id="note-user"
                    cols="20"
                    rows="10"
                    name="note"
                    placeholder="You can take your notes and remember them from the profile tab."
                    onChange={profileHandleChange}
                  ></textarea>
                ) : (
                  <div className="note">
                    <span className="note-icon">
                      <FontAwesomeIcon icon={faNoteSticky} fontSize={15} color="white" />
                    </span>
                    <span className="pro-note">{profile?.note}</span>
                  </div>
                )}
              </div>
              <div className="profile-btns">
                <button type="reset" onClick={profileClear}>
                  Clear
                </button>
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Profile;
