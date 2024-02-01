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
import { ToastContainer } from 'react-toastify';
import "../../css/home.css";

const Home = () => {
  const { userNavInfo, formLocationData, setMapStyle } =
    useContext(globalContext);
  const [userHover, setUserHover] = useState(false);

  const satellite =
    "https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=kHLg8AiFGgnch1FMqKRv";
  const topo =
    "https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=kHLg8AiFGgnch1FMqKRv";
  const street =
    "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=kHLg8AiFGgnch1FMqKRv";

  const mapOptions = [
    { value: satellite, label: "Satellite" },
    { value: topo, label: "Topo" },
    { value: street, label: "Street" },
  ];

  const handleToggleUser = () => {
    setUserHover(!userHover);
  };

  const changeMapStyle = (e) => {
    setMapStyle(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className="home-header">
        <nav>
          <div className="first-head">
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
            <div className="map-style">
              <h3>Map : </h3>
              <select defaultValue="" onChange={changeMapStyle}>
                <option disabled value="">
                  Select Type
                </option>
                {mapOptions.map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="nav-head">
              <h2>
                Ev | Charge <span>Dashboard</span>
              </h2>
            </div>
          </div>
          <div className="sec-head">
            <Link to="#contact" className="home-nav">
              Contact
            </Link>
            <Link className="home-nav" to="/">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span style={{ background: "none", paddingLeft: "10px" }}>
                Logout
              </span>
            </Link>
          </div>
        </nav>
      </header>
      <ToastContainer
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="home-main">
        {userHover && <UserNavComp />}
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
