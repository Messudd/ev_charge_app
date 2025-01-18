import React, { useContext, useEffect, useState } from "react";
import { Link ,useHistory } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../data/apiBaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { globalContext } from "../context/globalContextProvider";
import { ToastContainer } from "react-toastify";
import MapPopup from "../components/mapPopup";
import Footer from "../components/footer";
import DelPopup from "../components/delPopup";
import FavCard from "../components/favCard";
import AddFavoriteComp from "../components/addFavoriteComp";
import "../css/favorite.css";

const Favorites = () => {
  const [favBtn, setFavBtn] = useState(false);
  const { userFavorites, setUserFavorites, route, setRoute } = useContext(globalContext);
  const [inValue, setInValue] = useState("");

  const [popMap, setPopMap] = useState([]);
  const [delItem, setDelItem] = useState(null);
  const [delPopComp, setDelPopComp] = useState(false);

  const redicrect = useHistory();

  const openAddFavorite = () => {
    setFavBtn(false);
  };
  const openFavContainer = () => {
    setFavBtn(true);
  };
  useEffect(() => {
    setRoute({ ...route, route: false });
    let userValues = atob(localStorage.getItem("session")).split(":");
    let userId = localStorage.getItem("userId");
    axios
      .get(`${API_BASE_URL}/user/station/all/${userId}`,{
        auth: {
          username: userValues[0],
          password: userValues[1],
        },
      })
      .then((res) => {
        setUserFavorites(res.data);
        console.log("user-stations:", res.data);
      })
      .catch((err) => {
        console.log('error:' ,err.response?.data.message)
      });
  }, [favBtn]);

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    userId === null && redicrect.push('/login');
  },[])

  useEffect(() => {
    setInValue('');
  },[favBtn])

  return (
    <>
      <header className="fav-header">
        <h2>Favorites</h2>
      </header>
      <main className="fav-main">
        <section className="links-fav">
          <div className="back-link">
            <Link to="/user/home">
              <FontAwesomeIcon
                icon={faChevronLeft}
                color="whitesmoke"
                fontSize="1.1rem"
              />
            </Link>
          </div>
          <div className="grb-btn">
            <button
              onClick={openAddFavorite}
              style={{
                borderColor: !favBtn && "red",
              }}
            >
              Add Favorite
            </button>
            <button
              onClick={openFavContainer}
              style={{
                borderColor: favBtn && "red",
              }}
            >
              My Favorite
            </button>
          </div>
        </section>
        {favBtn && userFavorites.length > 0 && (
          <div className="fav-search">
            <div className="custom-search">
              <label htmlFor="fav-search">
                <FontAwesomeIcon icon={faSearch} color="#fff" fontSize="1rem" />
              </label>
              <input
                type="text"
                placeholder="Adress , type , power"
                value={inValue}
                id="fav-search"
                onChange={(e) => setInValue(e.target.value)}
              />
            </div>
            <p>Total : <span>{userFavorites.length}</span></p>
          </div>
        )}
        <section className="container-fav">
          {!favBtn ? (
            <AddFavoriteComp />
          ) : userFavorites.length > 0 ? (
            <div className="cards-container">
              {userFavorites
                .filter(
                  (item) =>
                    item.address
                      .toLowerCase()
                      .includes(inValue.toLowerCase()) ||
                    item.type.toLowerCase().includes(inValue.toLowerCase()) ||
                    item.power.toLowerCase().includes(inValue.toLowerCase())
                )
                .map((item, idx) => (
                  <FavCard
                    key={idx}
                    favData={item}
                    setDelItem={setDelItem}
                    setDelPopComp={setDelPopComp}
                    setPopMap={setPopMap}
                  />
                ))}
            </div>
          ) : (
            <p className="empty-fav">Your favorites are empty !</p>
          )}
        </section>
      </main>
      {popMap.length > 0 && <MapPopup value={popMap} setPopMap={setPopMap} />}
      {delPopComp && (
        <DelPopup
          setDelPopComp={setDelPopComp}
          delItem={delItem}
          txt="Are you sure you want to delete the station ?"
        />
      )}
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Favorites;
