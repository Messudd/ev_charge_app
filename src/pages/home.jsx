import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Map from "../components/map";
import ManuelLocation from "../components/manuelLocation";
import { globalContext } from "../context/globalContextProvider";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import maleIcon from "../utility/images/icons8-male.svg";
import femaleIcon from "../utility/images/icons8-female.svg";
import StationTable from "../components/stationTable";
import UserNavComp from "../components/usernav-comp";
import DataGraf from "../components/dataGraf";
import axios from "axios";
import API_BASE_URL from "../data/apiBaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import FeedbackPopup from "../components/feedback";
import Footer from "../components/footer";
import ev from "../utility/images/ev.png";
import FetchList from "../components/fetchList";
import "../css/home.css";

const Home = () => {
  const {
    userNavInfo,
    setUserNavInfo,
    formLocationData,
    filterTableData,
    prewPopup,
    setPrewPopup,
    fetchList,
    setProfile,
    profile,
  } = useContext(globalContext);
  const [userHover, setUserHover] = useState(false);
  const redicrect = useHistory();

  const handleToggleUser = () => {
    setUserHover(!userHover);
  };

  const onOpenContactPopup = () => {
    setPrewPopup(true);
  };
  function userLogout() {
    window.location.reload();
    localStorage.removeItem('session');
    localStorage.removeItem('id');
    localStorage.removeItem('userId');
    localStorage.removeItem('info');
    setTimeout(() => {
      redicrect.push("/");
    }, 300);
  }

  // let header = new Headers(); fetch !
  // header.append('Authorization','Basic' + btoa(unique.email +':'+ unique.password)); fetch method !

  useEffect(() => {
    window.scrollTo(0, 0);
    let userValues = atob(localStorage.getItem("session")).split(":");
    console.log("val : ", userValues);
    (userValues.length === 2 ) ? (
       axios
          .get(`${API_BASE_URL}/user/byEmail/${userValues[0]}`, {
            auth: {
              username: userValues[0],
              password: userValues[1],
            },
          })
          .then((res) => {
            setUserNavInfo(res.data);
            localStorage.setItem(
              "info",
              JSON.stringify({
                gender: res.data.gender,
                username: res.data.username,
              })
            );
            localStorage.setItem("userId", res.data.id);
            setProfile(res.data.profileResponce);
            if (res.data.profileResponce.id !== 0) {
              localStorage.setItem("id", res.data.profileResponce.id);
            }
            console.log("resUserInfo : ", res.data);
          })
          .catch((err) => {
            console.log("error : ", err.message);
          })): redicrect.push('/');
  }, []);

  useEffect(() => {
    console.log("profileRes : ", profile);
  }, [profile]);

  return (
    <>
      <header className="home-header">
        <nav>
          <div className="zero-head">
            <div className="head-link">
              <div className="nav-btn">
                <FontAwesomeIcon
                  icon={faBars}
                  width={20}
                  color="whitesmoke"
                  onClick={handleToggleUser}
                  cursor="pointer"
                />
              </div>
              <div className="info-group-user">
                {profile && (
                  <img
                    style={{ width: "30", height: "30", borderRadius: "100%" }}
                    src={
                      profile.image !== null
                        ? profile.image
                        : userNavInfo.gender === "MALE"
                        ? maleIcon
                        : femaleIcon
                    }
                    alt="user-icon"
                  />
                )}
                <span style={{ fontSize: "1rem" }} className="username-info">
                  {userNavInfo.username}
                </span>
              </div>
            </div>
          </div>
          <div className="first-head">
            <div className="nav-head">
              <img src={ev} alt="ev-icn" width={40} />
              <h2>
                Charge |<span>Service</span>
              </h2>
            </div>
          </div>
          <div className="sec-head">
            <span
              onClick={onOpenContactPopup}
              className="home-nav"
              style={{ cursor: "pointer" }}
            >
              Contact
            </span>
            <span className="home-nav" onClick={userLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span
                style={{
                  background: "none",
                  paddingLeft: "10px",
                  cursor: "pointer",
                }}
              >
                Logout
              </span>
            </span>
          </div>
        </nav>
      </header>
      <ToastContainer />
      <div className="home-main">
        {userHover && <UserNavComp toggleSideNav={handleToggleUser} />}
        <div className="class-map">
          <Map></Map>
        </div>
        <ManuelLocation />
      </div>
      {filterTableData.locDatas?.length > 0 && <DataGraf />}
      {formLocationData.locDatas && <StationTable />}
      {fetchList.length > 0 && <FetchList />}
      {prewPopup && <FeedbackPopup />}
      <Footer />
    </>
  );
};

export default Home;
