import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { globalContext } from "../context/globalContextProvider";
import "../css/favorite.css";

const Favorites = () => {
  const [favBtn, setFavBtn] = useState(false);
  const { userFavorites } = useContext(globalContext);

  const openAddFavorite = () => {
    setFavBtn(false);
  };
  const openFavContainer = () => {
    setFavBtn(true);
  };

  return (
    <>
      <header className="fav-header">
        <h2>Favorites</h2>
      </header>
      <main className="fav-main">
        <section className="links-fav">
          <div className="back-link">
            <Link to="/user/home">
              <FontAwesomeIcon icon={faChevronLeft} color="whitesmoke" fontSize= '1.1rem'/>
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
                      <th>City</th>
                      <th>Town</th>
                      <th>Neighbourhood</th>
                      <th>Street</th>
                      <th>Type</th>
                      <th>Detail</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userFavorites?.map((item, key) => (
                      <tr key={key}>
                        <td>
                            <img src= {item.image} alt="station" width={80}/></td>
                        <td>{item.city}</td>
                        <td>{item.town}</td>
                        <td>{item.neighbourhood}</td>
                        <td>{item.street}</td>
                        <td>{item.type}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </article>
          )}
        </section>
      </main>
    </>
  );
};

export default Favorites;
