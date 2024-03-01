import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import mark from "../utility/images/mark.png";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import L from "leaflet";
import "../css/popupMap.css";

const favMarker = new L.Icon({
  iconUrl: mark,
  iconSize: [34, 38],
  iconAnchor: [11, 28],
  popupAnchor: [0, -40],
});

const MapPopup = ({ value, setPopMap }) => {
  const closePopupMap = () => {
    setPopMap([]);
  };

  return (
    <>
      <div className="block-map">
        <div className="popup-map">
          <div className="close-map">
            <FontAwesomeIcon
              icon={faXmark}
              color="#fff"
              onClick={closePopupMap}
              fontSize="18px"
            />
          </div>
          <MapContainer
            style={{ width: "100%", height: "100%" }}
            center={[value[0], value[1]]}
            zoom={12}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            zoomControl={false}
            dragging={true}
          >
            <TileLayer
              url="https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}@2x.png?key=kHLg8AiFGgnch1FMqKRv"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[value[0], value[1]]} icon={favMarker}>
              <Popup>
                <p className="pop-p">
                  <li>Lat : <span>{value[0]}</span></li>
                  <li>Lng : <span>{value[1]}</span></li>
                </p>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default MapPopup;
