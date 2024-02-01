import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Map from "./map";
import ManuelLocation from "./manuelLocation";
import { globalContext } from "../../context/globalContextProvider";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import maleIcon from "../../utility/images/icons8-male.svg";
import femaleIcon from "../../utility/images/icons8-female.svg";
import StationTable from "./stationTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/home.css";

const Home = () => {
  const { userNavInfo, formLocationData } = useContext(globalContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className="home-header">
        <nav>
          <div className="first-head">
            <div className="nav-btn"></div>
            <div className="nav-head">
              <h2>
                Ev |<span>Dashboard</span>
              </h2>
            </div>
          </div>
          <div className="sec-head">
            <div className="info-group-user">
              <img
                src={userNavInfo.gender === "MALE" ? maleIcon : femaleIcon}
                alt="user-icon"
                width={26}
              />
              <span className="username-info">{userNavInfo.userName}</span>
            </div>
            <Link className="home-nav" to="/">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span style={{ background: "none", paddingLeft: "10px" }}>
                Logout
              </span>
            </Link>
          </div>
        </nav>
      </header>
      <div className="home-try">
        <div className="class-map">
          <Map></Map>
        </div>
        <ManuelLocation />
      </div>
      {formLocationData.locDatas.length > 0 && !formLocationData.loading && (
        <StationTable />
      )}
    </>
  );
};

export default Home;
