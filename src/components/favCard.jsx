import React from "react";
import { faLocationDot, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import stationIcon from "../utility/images/map.png";

const FavCard = ({ favData, setDelItem, setDelPopComp, setPopMap }) => {
  const showFavStationOnMap = (lat, lng) => {
    setPopMap([lat, lng]);
  };
  const delteLocFromFavlist = (val) => {
    setDelPopComp(true);
    setDelItem(val);
  };
  return (
    <div className="card-fav">
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${favData.imageUrl})`,
        }}
      ></div>
      <span
        style={{
          width: '100%',
          padding: '1px 4px',
          textAlign: 'center',
          backgroundColor: "darkred",
          borderRadius: "2px",
          color: "#fff",
          opacity: '0.8',
          fontSize: "0.82rem",
        }}
      >
        {favData.stationName}
      </span>
      <div className="card-adress">
        <FontAwesomeIcon icon={faLocationDot} color="red" fontSize="1rem" />
        <span>{favData.address}</span>
      </div>
      <div className="type-pow">
        <span>{favData.type}</span>
        <span>{favData.power}</span>
      </div>
      <div className="card-btns">
        <button
          onClick={() =>
            showFavStationOnMap(favData.latitude, favData.longitude)
          }
        >
          <img
            style={{ margin: "0 auto" }}
            src={stationIcon}
            alt="station-icon"
            width={12}
          />
        </button>
        <button onClick={() => delteLocFromFavlist(favData)}>
          <FontAwesomeIcon icon={faTrash} color="#fff" fontSize="0.6rem" />
        </button>
      </div>
    </div>
  );
};

export default FavCard;
