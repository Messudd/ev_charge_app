import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map from "./map";
import ManuelLocation from "./manuelLocation";
import { globalContext } from "../../context/globalContextProvider";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import maleIcon from "../../utility/images/icons8-male.svg";
import femaleIcon from "../../utility/images/icons8-female.svg";
import StationTable from "./stationTable";
import UserNavComp from "./usernav-comp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import PreviewPopup from "./previewPopup";
import "../../css/home.css";

const Home = () => {
  const { userNavInfo, formLocationData, prewPopup, setPrewPopup } =
    useContext(globalContext);
  const [userHover, setUserHover] = useState(false);

  const handleToggleUser = () => {
    setUserHover(!userHover);
  };

  const onOpenContactPopup = () => {
    setPrewPopup(!prewPopup);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                <img
                  src={userNavInfo.gender === "MALE" ? maleIcon : femaleIcon}
                  alt="user-icon"
                  width={26}
                />
                <span className="username-info">{userNavInfo.userName}</span>
              </div>
            </div>
          </div>
          <div className="first-head">
            <div className="nav-head">
              <h2>
                Ev | Station<span>Dashboard</span>
              </h2>
            </div>
          </div>
          <div className="sec-head">
            <a
              onClick={onOpenContactPopup}
              className="home-nav"
              style={{ cursor: "pointer" }}
            >
              Contact
            </a>
            <Link className="home-nav" to="/">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span style={{ background: "none", paddingLeft: "10px" }}>
                Logout
              </span>
            </Link>
          </div>
        </nav>
      </header>
      <ToastContainer/>
      <div className="home-main">
        {userHover && <UserNavComp toggleSideNav={handleToggleUser} />}
        <div className="class-map">
          <Map></Map>
        </div>
        <ManuelLocation />
      </div>
      {formLocationData.locDatas.length > 0 && !formLocationData.loading && (
        <StationTable />
      )}
      {prewPopup && <PreviewPopup />}
      <div className="footer"></div>
    </>
  );
};

export default Home;
