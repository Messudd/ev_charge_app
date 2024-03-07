import React from "react";
import { faLocationDot, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import stationIcon from "../../utility/images/map.png";

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
          backgroundImage: `url(${favData.image})`,
        }}
      ></div>
      <div className="card-adress">
        <FontAwesomeIcon icon={faLocationDot} color="red" fontSize="1rem" />
        <span>{favData.description}</span>
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
