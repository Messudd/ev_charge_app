import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { globalContext } from "../context/globalContextProvider";
import { ToastContainer } from "react-toastify";
import MapPopup from "../components/mapPopup";
import Footer from "./footer";
import DelPopup from "./delPopup";
import FavCard from "./home/favCard";
import AddFavoriteComp from "./addFavoriteComp";
import "../css/favorite.css";

const Favorites = () => {
  const [favBtn, setFavBtn] = useState(false);
  const { userFavorites, route, setRoute } = useContext(globalContext);
  const [inValue, setInValue] = useState("");

  const [popMap, setPopMap] = useState([]);
  const [delItem, setDelItem] = useState(null);
  const [delPopComp, setDelPopComp] = useState(false);

  const openAddFavorite = () => {
    setFavBtn(false);
  };
  const openFavContainer = () => {
    setFavBtn(true);
  };
  useEffect(() => {
    setRoute({ ...route, route: false });
  }, []);

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
            <label htmlFor="fav-search">
              <FontAwesomeIcon icon={faSearch} color="red" fontSize="1rem" />
            </label>
            <input
              type="text"
              placeholder="Adress , type , power"
              id="fav-search"
              onChange={(e) => setInValue(e.target.value)}
            />
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
                    item.description
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
