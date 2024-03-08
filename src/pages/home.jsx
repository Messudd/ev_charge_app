import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map from "../components/map";
import ManuelLocation from "../components/manuelLocation";
import { globalContext } from "../context/globalContextProvider";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import maleIcon from "../utility/images/icons8-male.svg";
import femaleIcon from "../utility/images/icons8-female.svg";
import StationTable from "../components/stationTable";
import UserNavComp from "../components/usernav-comp";
import DataGraf from "../components/dataGraf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import PreviewPopup from "../components/previewPopup";
import Footer from "../components/footer";
import ev from "../utility/images/ev.png";
import FetchList from "../components/fetchList";
import "../css/home.css";

const Home = () => {
  const {
    userNavInfo,
    formLocationData,
    filterTableData,
    prewPopup,
    setPrewPopup,
    fetchList,
  } = useContext(globalContext);
  const [userHover, setUserHover] = useState(false);

  const handleToggleUser = () => {
    setUserHover(!userHover);
  };

  const onOpenContactPopup = () => {
    setPrewPopup(true);
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
              <img src={ev} alt="ev-icn" width={40} />
              <h2>
                Charge |<span>Service</span>
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
              <span
                style={{
                  background: "none",
                  paddingLeft: "10px",
                  cursor: "pointer",
                }}
              >
                Logout
              </span>
            </Link>
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
      {(fetchList.length > 0) && <FetchList />}
      {prewPopup && <PreviewPopup />}
      <Footer />
    </>
  );
};

export default Home;
