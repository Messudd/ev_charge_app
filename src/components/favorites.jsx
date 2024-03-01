import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { globalContext } from "../context/globalContextProvider";
import stationIcon from "../utility/images/map.png";
import MapPopup from '../components/mapPopup';
import Footer from "./footer";
import "../css/favorite.css";

const Favorites = () => {
  const [favBtn, setFavBtn] = useState(false);
  const { userFavorites, route, setRoute } =
    useContext(globalContext);
  
  const [ popMap , setPopMap ] = useState([]);

  const openAddFavorite = () => {
    setFavBtn(false);
  };
  const openFavContainer = () => {
    setFavBtn(true);
  };
  const showFavStationOnMap = (lat,lng) => {
    setPopMap([lat,lng]);
  }
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
              Favorite List
            </button>
          </div>
        </section>
        <section className="container-fav">
          {!favBtn ? (
            <article className="add-fav" style={{ color: "white" }}>
              add Favorite Container
            </article>
          ) : (
            <article className="show-favList" style={{ color: "white" }}>
              {userFavorites && (
                <table className="fav-table">
                  <thead>
                    <tr>
                      <th>image</th>
                      <th>Adress</th>
                      <th>Type</th>
                      <th>Power</th>
                      <th>Map</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userFavorites?.map((item, key) => (
                      <tr key={key}>
                        <td>
                          <img src={item.image} alt="station" width={60} />
                        </td>
                        <td>{item.description}</td>
                        <td>{item.type}</td>
                        <td>{item.power}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => showFavStationOnMap(item.latitude, item.longitude)}
                        >
                          <img
                            style={{ margin: "0 auto" }}
                            src={stationIcon}
                            alt="station-icon"
                            width={18}
                          />
                        </td>
                        <td>del</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </article>
          )}
        </section>
      </main>
      <Footer />
      {popMap.length > 0  && <MapPopup value = {popMap} setPopMap = {setPopMap}/>}
    </>
  );
};

export default Favorites;
